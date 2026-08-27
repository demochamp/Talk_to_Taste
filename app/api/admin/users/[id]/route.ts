export const dynamic = "force-dynamic";
import { auth } from "@/auth"
import { removeUser } from "@/lib/user-store"
import { NextResponse } from "next/server"

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth()
    const { id } = await params

    const isAdmin = session?.user?.role === "admin" || session?.user?.email === "choudharykhushi499@gmail.com";
    if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const success = await removeUser(id)
        if (!success) {
            return NextResponse.json({ error: "Cannot delete master admin or user not found" }, { status: 400 })
        }

        return NextResponse.json({ message: "User deleted successfully" })
    } catch (error: any) {
        console.error("Failed to delete user:", error)
        return NextResponse.json({ error: error.message || "Failed to delete user" }, { status: 500 })
    }
}

