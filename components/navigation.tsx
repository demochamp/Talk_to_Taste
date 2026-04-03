"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, Moon, Sun, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Link from "next/link"
import { AnimatedLogo } from "./animated-logo"
import { useUserState } from "@/hooks/use-user-state"
import { useTranslation } from "@/lib/i18n"
import { useVoice } from "@/hooks/use-voice"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user, logout } = useUserState()
  const { language, setLanguage, speak } = useVoice()

  const { t } = useTranslation()

  const toggleLanguage = () => {
    const newLang = language === "en-IN" ? "hi-IN" : "en-IN"
    setLanguage(newLang)
  }

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle hash navigation
  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash) {
        // Small delay to ensure DOM is ready and animations have started
        setTimeout(() => {
          const id = window.location.hash.replace("#", "")
          const element = document.getElementById(id)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 500)
      }
    }

    handleHashScroll()
    window.addEventListener("hashchange", handleHashScroll)
    return () => window.removeEventListener("hashchange", handleHashScroll)
  }, [])

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.recipes"), href: "/recipes" },
    { label: t("nav.features"), href: "/#features" },
    { label: language === "hi-IN" ? "वॉइस कमांड गाइड" : "Voice Command Guide", href: "/#voice-demo" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? "glass-card py-2" : "bg-transparent py-4"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <AnimatedLogo />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight gradient-text">TalktoTaste</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">Voice Kitchen</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {/* Admin Link */}
            {user?.role === 'admin' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/admin"
                  className="text-red-500 hover:text-red-600 transition-colors font-bold text-sm flex items-center gap-1"
                >
                  {t("admin.dashboard")}
                </Link>
              </motion.div>
            )}
          </div>

          {/* Right side actions - Always visible on mobile except Sign In */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Language Toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center relative group"
                aria-label={language === "en-IN" ? "Switch to Hindi" : "English में बदलें"}
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-primary text-[6px] sm:text-[8px] font-bold text-primary-foreground">
                  {language === "en-IN" ? "EN" : "HI"}
                </span>
              </motion.button>
            )}

            {/* Theme toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                )}
              </motion.button>
            )}

            {/* Profile link - Visible on mobile */}
            <Link href="/profile">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
              </motion.div>
            </Link>

            {/* Desktop Only: Login/Logout Button */}
            {user?.isLoggedIn ? (
              <Button
                variant="ghost"
                onClick={() => logout()}
                className="hidden md:flex items-center gap-2 rounded-full text-[#F27438] hover:text-[#F27438]/80 hover:bg-orange-50/50 font-bold text-sm"
              >
                {language === "hi-IN" ? "साइन आउट" : "Sign Out"}
              </Button>
            ) : (
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" className="flex items-center gap-2 rounded-full">
                  {t("nav.sign_in")}
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center ml-1"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            <div className="relative pt-24 px-6">
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-4 border-b border-border"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Admin Link Mobile */}
                {user?.role === 'admin' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-lg font-medium text-red-500 hover:text-red-600 transition-colors py-4 border-b border-border"
                    >
                      {t("admin.dashboard")}
                    </Link>
                  </motion.div>
                )}

                {/* Mobile Voice Status (Informational) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="py-4 border-b border-border"
                >
                  <span className="text-sm text-muted-foreground">Voice Assistant: <span className="text-primary font-semibold">Active</span></span>
                </motion.div>

                {/* Sign Out / Sign In - Prominent at bottom of list */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-2"
                >
                  {user?.isLoggedIn ? (
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full text-left block text-lg font-bold text-red-500 hover:text-red-600 py-4"
                    >
                      {language === "hi-IN" ? "साइन आउट" : "Sign Out"}
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-lg font-medium text-primary hover:text-primary/80 py-4"
                    >
                      {t("nav.sign_in")}
                    </Link>
                  )}
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence >
    </>
  )
}
