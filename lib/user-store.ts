import clientPromise from "@/lib/db"
import { ObjectId } from "mongodb"
import fs from "fs"
import path from "path"

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

const TMP_FILE = path.join("/tmp", "talktotaste_users.json")

// Helper to read disk cache
function readDiskCache(): Map<string, StoredUser> {
    const map = new Map<string, StoredUser>()
    
    // Always include Master Admin
    const masterAdmin: StoredUser = {
        _id: "admin-master",
        name: "Khushi Choudhary (Admin)",
        email: "choudharykhushi499@gmail.com",
        role: "admin",
        image: null,
        provider: "google",
        createdAt: new Date().toISOString()
    }
    map.set(masterAdmin.email.toLowerCase(), masterAdmin)

    try {
        if (fs.existsSync(TMP_FILE)) {
            const data = fs.readFileSync(TMP_FILE, "utf-8")
            const list: StoredUser[] = JSON.parse(data)
            if (Array.isArray(list)) {
                for (const u of list) {
                    if (u.email) {
                        map.set(u.email.toLowerCase().trim(), u)
                    }
                }
            }
        }
    } catch (e) {
        // ignore disk read errors in restricted envs
    }

    return map
}

// Helper to write disk cache
function writeDiskCache(map: Map<string, StoredUser>) {
    try {
        const list = Array.from(map.values())
        fs.writeFileSync(TMP_FILE, JSON.stringify(list, null, 2), "utf-8")
    } catch (e) {
        // ignore disk write errors
    }
}

// In-memory cache across serverless warm instances
let cachedUsers: Map<string, StoredUser> = readDiskCache()

export async function recordUser(user: {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: string
    provider?: string
}): Promise<StoredUser> {
    if (!user.email) {
        throw new Error("User email is required")
    }

    const email = user.email.toLowerCase().trim()
    const isAdmin = email === "choudharykhushi499@gmail.com" || user.role === "admin"
    const role: "admin" | "user" = isAdmin ? "admin" : "user"
    const name = user.name || email.split("@")[0]
    const image = user.image || null
    const provider = user.provider || "oauth"

    cachedUsers = readDiskCache()
    const existing = cachedUsers.get(email)

    const record: StoredUser = {
        _id: user.id || existing?._id || `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name,
        email,
        role,
        image,
        provider,
        createdAt: existing?.createdAt || new Date().toISOString(),
        lastLogin: new Date().toISOString()
    }

    // Update local cache & disk
    cachedUsers.set(email, record)
    writeDiskCache(cachedUsers)

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
        // MongoDB timeout handled safely
    }

    return record
}

export async function getAllUsers(): Promise<StoredUser[]> {
    cachedUsers = readDiskCache()
    const userMap = new Map<string, StoredUser>(cachedUsers)

    // Fetch from MongoDB if available
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
            }
        }
    } catch (err) {
        // DB fallback used
    }

    writeDiskCache(userMap)
    return Array.from(userMap.values())
}

export async function removeUser(idOrEmail: string): Promise<boolean> {
    const key = idOrEmail.toLowerCase().trim()

    // Prevent deleting master admin
    if (key === "choudharykhushi499@gmail.com" || key === "admin-master") {
        return false
    }

    cachedUsers = readDiskCache()
    for (const [email, user] of cachedUsers.entries()) {
        if (email === key || user._id === idOrEmail) {
            cachedUsers.delete(email)
        }
    }
    writeDiskCache(cachedUsers)

    // Remove from MongoDB if available
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
        // DB skip handled
    }

    return true
}
