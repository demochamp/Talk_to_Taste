export const dynamic = "force-dynamic";
import { auth } from "@/auth"
import { getAllUsers } from "@/lib/user-store"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await auth()

    const isAdmin = session?.user?.role === "admin" || session?.user?.email === "choudharykhushi499@gmail.com";
    if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const users = await getAllUsers()
        return NextResponse.json(users)
    } catch (error: any) {
        console.error("Failed to list users:", error)
        return NextResponse.json([{
            _id: "admin-master",
            name: session?.user?.name || "Khushi Choudhary (Admin)",
            email: session?.user?.email || "choudharykhushi499@gmail.com",
            role: "admin",
            image: session?.user?.image || null
        }])
    }
}


