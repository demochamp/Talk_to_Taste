"use client"

import { useRouter } from "next/navigation"

// This is a placeholder. In a real React component we'd use the hook directly.
// But for the processor which might not be a component, we return actions.
// The actual execution happens in the component that uses the processor.

export const ROUTES = {
    HOME: "/",
    RECIPES: "/recipes",
    PROFILE: "/profile",
    LOGIN: "/login",
}
