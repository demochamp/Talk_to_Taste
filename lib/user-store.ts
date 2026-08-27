import clientPromise from "@/lib/db"
import { ObjectId } from "mongodb"

export interface StoredUser {
    _id: string
    name: string
    email: string
    role: "admin" | "user"
    image?: string | null
    provider?: string
    createdAt: string
    lastLogin?: string
}

// In-memory fallback cache across serverless warm instances
let cachedUsers: Map<string, StoredUser> = new Map()

// Pre-populate Master Admin
const masterAdmin: StoredUser = {
    _id: "admin-master",
    name: "Khushi Choudhary (Admin)",
    email: "choudharykhushi499@gmail.com",
    role: "admin",
    image: null,
    provider: "google",
    createdAt: new Date().toISOString()
}
cachedUsers.set(masterAdmin.email.toLowerCase(), masterAdmin)

export async function recordUser(user: {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: string
    provider?: string
}): Promise<StoredUser> {
    const email = user.email.toLowerCase().trim()
    const isAdmin = email === "choudharykhushi499@gmail.com" || user.role === "admin"
    const role: "admin" | "user" = isAdmin ? "admin" : "user"
    const name = user.name || email.split("@")[0]
    const image = user.image || null
    const provider = user.provider || "oauth"

    const record: StoredUser = {
        _id: user.id || `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name,
        email,
        role,
        image,
        provider,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    }

    // Always update local cache
    cachedUsers.set(email, record)

    // Sync to MongoDB if available
    try {
        const client = await Promise.race([
            clientPromise,
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error("DB Timeout")), 3000))
        ])
        const db = client.db()
        await db.collection("users").updateOne(
            { email },
            {
                $set: {
                    name,
                    email,
                    role,
                    image,
                    provider,
                    lastLogin: new Date()
                },
                $setOnInsert: {
                    createdAt: new Date()
                }
            },
            { upsert: true }
        )
    } catch (err) {
        console.warn("[UserStore] DB sync skipped/failed:", err)
    }

    return record
}

export async function getAllUsers(): Promise<StoredUser[]> {
    const userMap = new Map<string, StoredUser>()

    // 1. Add master admin & local memory users
    cachedUsers.forEach((u, k) => userMap.set(k, u))

    // 2. Fetch from MongoDB if available
    try {
        const client = await Promise.race([
            clientPromise,
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error("DB Timeout")), 3000))
        ])
        const db = client.db()
        const dbUsers = await db.collection("users").find({}).toArray()

        for (const doc of dbUsers) {
            if (doc.email) {
                const email = doc.email.toLowerCase().trim()
                const isAdmin = email === "choudharykhushi499@gmail.com" || doc.role === "admin"
                const record: StoredUser = {
                    _id: doc._id ? doc._id.toString() : `db-${email}`,
                    name: doc.name || email.split("@")[0],
                    email,
                    role: isAdmin ? "admin" : "user",
                    image: doc.image || null,
                    provider: doc.provider || "credentials",
                    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
                    lastLogin: doc.lastLogin ? new Date(doc.lastLogin).toISOString() : undefined
                }
                userMap.set(email, record)
                cachedUsers.set(email, record)
            }
        }
    } catch (err) {
        console.warn("[UserStore] DB fetch skipped/failed:", err)
    }

    return Array.from(userMap.values())
}

export async function removeUser(idOrEmail: string): Promise<boolean> {
    const key = idOrEmail.toLowerCase().trim()

    // Prevent deleting master admin
    if (key === "choudharykhushi499@gmail.com" || key === "admin-master") {
        return false
    }

    // Remove from local cache
    for (const [email, user] of cachedUsers.entries()) {
        if (email === key || user._id === idOrEmail) {
            cachedUsers.delete(email)
        }
    }

    // Remove from MongoDB
    try {
        const client = await Promise.race([
            clientPromise,
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error("DB Timeout")), 3000))
        ])
        const db = client.db()
        let query: any = { email: key }
        if (ObjectId.isValid(idOrEmail)) {
            query = { $or: [{ _id: new ObjectId(idOrEmail) }, { email: key }] }
        }
        await db.collection("users").deleteOne(query)
    } catch (err) {
        console.warn("[UserStore] DB deletion skipped/failed:", err)
    }

    return true
}
