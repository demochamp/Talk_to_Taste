export const dynamic = "force-dynamic";
import { auth } from "@/auth"
import clientPromise from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await auth()

    if (!session || session.user?.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const client = await clientPromise
    const db = client.db() // Use default DB from URI

    // Fetch users (limit fields for security)
    const users = await db.collection("users").find({}).toArray()

    return NextResponse.json(users)
}
