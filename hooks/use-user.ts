"use client"

import { useState, useEffect } from "react"

export interface UserProfile {
  id: string
  name: string
  preferredLanguage: "en-IN" | "hi-IN"
  favoriteRecipes: number[]
  cookingHistory: {
    recipeId: number
    completedAt: string
    rating?: number
  }[]
  createdAt: string
}

const DEFAULT_USER: UserProfile = {
  id: "guest",
  name: "Guest Chef",
  preferredLanguage: "en-IN",
  favoriteRecipes: [],
  cookingHistory: [],
  createdAt: new Date().toISOString(),
}

export function useUser() {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("talktotaste-user")
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        setUser(DEFAULT_USER)
      }
    }
  }, [])

  const updateUser = (updates: Partial<UserProfile>) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem("talktotaste-user", JSON.stringify(updated))
  }

  const setName = (name: string) => {
    updateUser({ name })
  }

  const setLanguage = (lang: "en-IN" | "hi-IN") => {
    updateUser({ preferredLanguage: lang })
  }

  const toggleFavorite = (recipeId: number) => {
    const favorites = user.favoriteRecipes.includes(recipeId)
      ? user.favoriteRecipes.filter((id) => id !== recipeId)
      : [...user.favoriteRecipes, recipeId]
    updateUser({ favoriteRecipes: favorites })
  }

  const isFavorite = (recipeId: number) => {
    return user.favoriteRecipes.includes(recipeId)
  }

  const addToCookingHistory = (recipeId: number, rating?: number) => {
    const entry = {
      recipeId,
      completedAt: new Date().toISOString(),
      rating,
    }
    updateUser({
      cookingHistory: [entry, ...user.cookingHistory].slice(0, 50), // Keep last 50
    })
  }

  const getCookingHistory = () => {
    return user.cookingHistory
  }

  const clearHistory = () => {
    updateUser({ cookingHistory: [] })
  }

  return {
    user,
    mounted,
    setName,
    setLanguage,
    toggleFavorite,
    isFavorite,
    addToCookingHistory,
    getCookingHistory,
    clearHistory,
    updateUser,
  }
}
