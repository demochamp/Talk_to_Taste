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
            setUser(prev => ({
                ...prev,
                name: session.user.name || prev.name,
                email: session.user.email || prev.email,
                // @ts-ignore - Role is added in custom type but TS might complain without restart
                role: (session.user as any).role || "user",
                isLoggedIn: true
            }))
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
        setUser((prev: UserState) => ({ ...prev, name }))
    }, [])

    const login = useCallback((provider?: string) => {
        if (provider) {
            signIn(provider)
        } else {
            setIsLoginModalOpen(true)
        }
    }, [])

    const logout = useCallback(() => {
        signOut()
    }, [])

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
