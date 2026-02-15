"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { UserState } from "@/lib/types"

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
    login: (name: string, email: string, role?: "user" | "admin") => void
    logout: () => void
    isFavorite: (id: number) => boolean
}

export const UserContext = createContext<UserContextType | null>(null)

export { type UserState } from "@/lib/types"

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserState>(DEFAULT_STATE)
    const [isLoaded, setIsLoaded] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("talktotaste-user")
        if (saved) {
            try {
                setUser({ ...DEFAULT_STATE, ...JSON.parse(saved) })
            } catch (e) {
                console.error("Failed to parse user state", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save to localStorage on change
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

    const login = useCallback((name: string, email: string, role: "user" | "admin" = "user") => {
        setUser((prev: UserState) => ({ ...prev, name, email, role, isLoggedIn: true }))
    }, [])

    const logout = useCallback(() => {
        setUser(DEFAULT_STATE)
    }, [])

    const isFavorite = useCallback((id: number) => user.favorites.includes(id), [user.favorites])

    const value = {
        user,
        isLoaded,
        toggleFavorite,
        addToHistory,
        updateSettings,
        updateName,
        login,
        logout,
        isFavorite
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
