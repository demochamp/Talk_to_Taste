"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useUserState } from "@/hooks/use-user-state"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoaded } = useUserState()
    const router = useRouter()
    const pathname = usePathname()
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        if (!isLoaded) return

        // Allow access to login page
        if (pathname === "/login") {
            setAuthorized(true)
            return
        }

        // Redirect to login if not logged in
        if (!user.isLoggedIn) {
            setAuthorized(false)
            router.push("/login")
        } else {
            setAuthorized(true)
        }
    }, [user.isLoggedIn, isLoaded, pathname, router])

    // Show nothing while checking auth state to prevent flash of content
    if (!isLoaded || (!authorized && pathname !== "/login")) {
        return null
    }

    return <>{children}</>
}
