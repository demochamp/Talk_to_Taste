"use client"

import { Languages } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/use-user"

export function LanguageToggle() {
  const { user, setLanguage, mounted } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full">
        <Languages className="w-5 h-5" />
      </Button>
    )
  }

  const languages = [
    { code: "en-IN" as const, label: "English", flag: "🇬🇧" },
    { code: "hi-IN" as const, label: "हिन्दी", flag: "🇮🇳" },
  ]

  const currentLang = languages.find((l) => l.code === user.preferredLanguage) || languages[0]

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="rounded-full gap-2">
        <span className="text-lg">{currentLang.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLang.label}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 bg-card border border-border rounded-xl shadow-xl p-2 z-50 min-w-[140px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                    user.preferredLanguage === lang.code ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
