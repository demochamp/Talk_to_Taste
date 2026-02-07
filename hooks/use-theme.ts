"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage first, then system preference
    const stored = localStorage.getItem("talktotaste-theme") as Theme | null
    if (stored) {
      setTheme(stored)
      document.documentElement.classList.toggle("dark", stored === "dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
      document.documentElement.classList.toggle("dark", prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("talktotaste-theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const setThemeMode = (mode: Theme) => {
    setTheme(mode)
    localStorage.setItem("talktotaste-theme", mode)
    document.documentElement.classList.toggle("dark", mode === "dark")
  }

  return { theme, toggleTheme, setThemeMode, mounted }
}
