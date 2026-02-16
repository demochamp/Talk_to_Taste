"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Link from "next/link"
import { GlobalVoiceControl } from "./global-voice-control"
import { HelpAssistant } from "./help-assistant"
import { AnimatedLogo } from "./animated-logo"
import { useUserState } from "@/hooks/use-user-state"

import { translations } from "@/lib/translations"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user, logout } = useUserState()

  const t = translations[user.settings.language || "en-IN"]

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: t["nav.home"], href: "/" },
    { label: t["nav.recipes"], href: "/recipes" },
    { label: t["nav.features"], href: "/#features" },
    { label: t["nav.howItWorks"], href: "/#how-it-works" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass-card py-3" : "bg-transparent py-6"
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <AnimatedLogo />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight gradient-text">TalktoTaste</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Voice Kitchen</span>
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
                  Admin Dashboard
                </Link>
              </motion.div>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Voice Control */}
            <GlobalVoiceControl />

            {/* Theme toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-foreground" />
                )}
              </motion.button>
            )}

            {/* Login/Logout Button */}
            {user?.isLoggedIn ? (
              <Button
                variant="ghost"
                onClick={() => logout()}
                className="hidden md:flex items-center gap-2 rounded-full text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              >
                {t["nav.logout"]}
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="hidden md:flex items-center gap-2 rounded-full">
                  {t["nav.login"]}
                </Button>
              </Link>
            )}

            {/* Profile link */}
            <Link href="/profile">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
              >
                <User className="w-5 h-5 text-foreground" />
              </motion.div>
            </Link>

            {/* CTA Button */}
            <Link href="/recipes" className="hidden md:block">
              <Button className="rounded-full px-6 shadow-lg shadow-primary/30">{t["nav.startCooking"]}</Button>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              <div className="flex flex-col gap-4">
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
                      className="block text-2xl font-semibold text-foreground hover:text-primary transition-colors py-3 border-b border-border"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Voice Control */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex justify-between items-center py-3 border-b border-border"
                >
                  <span className="text-2xl font-semibold text-foreground">Voice Assistant</span>
                  <GlobalVoiceControl />
                </motion.div>

                {/* Theme Toggle */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-between items-center py-3 border-b border-border"
                >
                  <span className="text-2xl font-semibold text-foreground">Theme</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="bg-secondary rounded-full w-10 h-10"
                  >
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </Button>
                </motion.div>

                {/* Login/Logout */}
                {/* Login/Logout */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  {user?.isLoggedIn ? (
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full text-left block text-2xl font-semibold text-red-500 hover:text-red-600 py-3 border-b border-border"
                    >
                      {t["nav.logout"]}
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-2xl font-semibold text-primary hover:text-primary/80 py-3 border-b border-border"
                    >
                      {t["nav.login"]}
                    </Link>
                  )}
                </motion.div>

                {/* Profile Link */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-2xl font-semibold text-foreground hover:text-primary transition-colors py-3 border-b border-border"
                  >
                    {t["nav.profile"]}
                  </Link>
                </motion.div>

                {/* Desktop CTA turned Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="pt-6"
                >
                  <Link href="/recipes" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full rounded-full py-6 text-lg">{t["nav.startCooking"]}</Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence >
      <HelpAssistant />
    </>
  )
}
