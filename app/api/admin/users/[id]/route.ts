import { auth } from "@/auth"
import clientPromise from "@/lib/db"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth()
    const { id } = await params

    if (!session || session.user?.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const client = await clientPromise
        const db = client.db()

        const result = await db.collection("users").deleteOne({
            _id: new ObjectId(id)
        })

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "User deleted successfully" })
    } catch (error: any) {
        console.error("Failed to delete user:", error)
        return NextResponse.json({ error: error.message || "Failed to delete user" }, { status: 500 })
    }
}
