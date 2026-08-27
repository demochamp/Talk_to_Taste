export const dynamic = "force-dynamic";
import { auth } from "@/auth"
import { recordUser } from "@/lib/user-store"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const session = await auth()
        let body: any = {}
        try {
            body = await req.json()
        } catch {
            // body empty
        }

        const email = session?.user?.email || body?.email
        const name = session?.user?.name || body?.name
        const image = session?.user?.image || body?.image

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 })
        }

        const user = await recordUser({
            id: session?.user?.id,
            email,
            name,
            image,
            role: session?.user?.role,
            provider: body?.provider || "session"
        })

        return NextResponse.json({ success: true, user })
    } catch (error: any) {
        console.error("User sync failed:", error)
        return NextResponse.json({ error: error.message || "Failed to sync user" }, { status: 500 })
    }
}
