"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { UserState } from "@/lib/types"
import { useSession, signIn, signOut } from "next-auth/react"

const DEFAULT_STATE: UserState = {
    name: "Guest Chef",
    email: "",
    role: "user",
    isLoggedIn: false,
    favorites: [],
    history: [],
    settings: {
        voiceEnabled: true,
        notifications: true,
        darkMode: false,
        language: "en-IN",
    },
}

interface UserContextType {
    user: UserState
    isLoaded: boolean
    toggleFavorite: (recipeId: number) => void
    addToHistory: (recipeId: number) => void
    updateSettings: (newSettings: Partial<UserState["settings"]>) => void
    updateName: (name: string) => void
    login: (provider?: string) => void
    logout: () => void
    isFavorite: (id: number) => boolean
    isLoginModalOpen: boolean
    openLoginModal: () => void
    closeLoginModal: () => void
    promoteToAdmin: () => void
}

export const UserContext = createContext<UserContextType | null>(null)

export { type UserState } from "@/lib/types"

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()
    const [user, setUser] = useState<UserState>(DEFAULT_STATE)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    // Load from localStorage on mount (preserve settings/favorites)
    useEffect(() => {
        const saved = localStorage.getItem("talktotaste-user")
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                // Merge saved settings/favorites but do NOT overwrite auth state yet
                setUser(prev => ({
                    ...prev,
                    favorites: parsed.favorites || [],
                    history: parsed.history || [],
                    settings: parsed.settings || DEFAULT_STATE.settings
                }))
            } catch (e) {
                console.error("Failed to parse user state", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Sync with NextAuth session
    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const userName = session.user.name || "App User"
            const userEmail = session.user.email || ""
            const userRole = (session.user as any).role || (userEmail === "choudharykhushi499@gmail.com" ? "admin" : "user")

            setUser(prev => ({
                ...prev,
                name: userName || prev.name,
                email: userEmail || prev.email,
                role: userRole,
                isLoggedIn: true
            }))

            // Sync user to server user store for Admin visibility
            if (userEmail) {
                fetch("/api/user/sync", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: userEmail,
                        name: userName,
                        image: session.user.image || null,
                        role: userRole
                    })
                }).catch(err => console.warn("User sync trigger failed:", err))
            }
        } else if (status === "unauthenticated") {
            setUser(prev => ({
                ...prev,
                name: "Guest Chef",
                email: "",
                role: "user",
                isLoggedIn: false
            }))
        }
    }, [session, status])


    // Save to localStorage on change (only settings/favs, not sensitive auth if possible, but keeping consistent)
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("talktotaste-user", JSON.stringify(user))
        }
    }, [user, isLoaded])

    const toggleFavorite = useCallback((recipeId: number) => {
        setUser((prev: UserState) => {
            const isFav = prev.favorites.includes(recipeId)
            return {
                ...prev,
                favorites: isFav
                    ? prev.favorites.filter((id) => id !== recipeId)
                    : [...prev.favorites, recipeId],
            }
        })
    }, [])

    const addToHistory = useCallback((recipeId: number) => {
        setUser((prev: UserState) => {
            // Remove if exists to move to top, limit to 20 items
            const newHistory = [recipeId, ...prev.history.filter((id) => id !== recipeId)].slice(0, 20)
            return { ...prev, history: newHistory }
        })
    }, [])

    const updateSettings = useCallback((newSettings: Partial<UserState["settings"]>) => {
        setUser((prev: UserState) => ({
            ...prev,
            settings: { ...prev.settings, ...newSettings },
        }))
    }, [])

    const updateName = useCallback((name: string) => {
        setUser((prev: UserState) => {
            const updated = { ...prev, name }
            if (prev.email) {
                fetch("/api/user/sync", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: prev.email,
                        name,
                        role: prev.role
                    })
                }).catch(err => console.warn("Name sync failed:", err))
            }
            return updated
        })
    }, [])


    const login = useCallback((provider?: string) => {
        if (provider) {
            signIn(provider)
        } else {
            setIsLoginModalOpen(true)
        }
    }, [])

    const logout = useCallback(async () => {
        try {
            localStorage.removeItem("talktotaste-user")
        } catch (e) {}
        setUser({
            ...DEFAULT_STATE,
            favorites: user.favorites,
            history: user.history,
            settings: user.settings,
            isLoggedIn: false,
            role: "user"
        })
        await signOut({ callbackUrl: "/" })
    }, [user.favorites, user.history, user.settings])


    const openLoginModal = useCallback(() => setIsLoginModalOpen(true), [])
    const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), [])

    const promoteToAdmin = useCallback(() => {
        setUser(prev => ({ ...prev, role: "admin", isLoggedIn: true }))
        console.log("User promoted to Admin for testing")
    }, [])

    const isFavorite = useCallback((id: number) => user.favorites.includes(id), [user.favorites])

    const value = {
        user,
        // Combine internal loaded state with session loaded state
        isLoaded: isLoaded && status !== "loading",
        toggleFavorite,
        addToHistory,
        updateSettings,
        updateName,
        login,
        logout,
        isFavorite,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        promoteToAdmin
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
