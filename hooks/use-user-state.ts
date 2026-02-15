"use client"

import { useState, useEffect, useCallback } from "react"

export interface UserState {
    name: string
    favorites: number[]
    history: number[]
    settings: {
        voiceEnabled: boolean
        notifications: boolean
        darkMode: boolean
        language: "en-IN" | "hi-IN"
    }
}

const DEFAULT_STATE: UserState = {
    name: "Guest Chef",
    favorites: [],
    history: [],
    settings: {
        voiceEnabled: true,
        notifications: true,
        darkMode: false,
        language: "en-IN",
    },
}

export function useUserState() {
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
        setUser((prev) => {
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
        setUser((prev) => {
            // Remove if exists to move to top, limit to 20 items
            const newHistory = [recipeId, ...prev.history.filter(id => id !== recipeId)].slice(0, 20)
            return { ...prev, history: newHistory }
        })
    }, [])

    const updateSettings = useCallback((newSettings: Partial<UserState["settings"]>) => {
        setUser((prev) => ({
            ...prev,
            settings: { ...prev.settings, ...newSettings },
        }))
    }, [])

    const updateName = useCallback((name: string) => {
        setUser((prev) => ({ ...prev, name }))
    }, [])

    const isFavorite = useCallback((id: number) => user.favorites.includes(id), [user.favorites])

    return {
        user,
        isLoaded,
        toggleFavorite,
        addToHistory,
        updateSettings,
        updateName,
        isFavorite
    }
}
