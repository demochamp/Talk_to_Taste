"use client"

import { useContext } from "react"
import { UserContext } from "@/components/user-provider"
import { UserState } from "@/lib/types"

export type { UserState } from "@/lib/types"

export function useUserState() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUserState must be used within a UserProvider")
    }
    return context
}
