"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Heart,
  Clock,
  ChefHat,
  Settings,
  Moon,
  Sun,
  Globe,
  Volume2,
  Bell,
  LogOut,
  Edit3,
  Camera,
  Star,
  TrendingUp,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useTheme } from "next-themes"
import { recipes } from "@/lib/recipes-data"
import Link from "next/link"
import { useUserState } from "@/hooks/use-user-state"
import { useTranslation, type TranslationKey } from "@/lib/i18n"
import { useVoice } from "@/hooks/use-voice"

export default function ProfilePage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<"overview" | "favorites" | "history" | "settings">("overview")
  const [isEditing, setIsEditing] = useState(false)

  const { user, updateName, updateSettings } = useUserState()
  const { language, setLanguage } = useVoice()
  const { t } = useTranslation()
  const [userName, setUserName] = useState(user.name)
  const isHindi = language === "hi-IN"

  // Sync local name state when user data loads
  useEffect(() => {
    setUserName(user.name)
  }, [user.name])

  const handleSaveName = () => {
    updateName(userName)
    setIsEditing(false)
  }

  // Get favorite recipes
  const favoriteRecipes = recipes.filter((r) => user.favorites.includes(r.id))
  // Get history recipes (allow duplicates in history but filter here for display unique or show timestamp logic if needed)
  // For now, let's just show unique recent
  const historyIds = Array.from(new Set(user.history))
  const recentRecipes = recipes.filter((r) => historyIds.includes(r.id))

  // Calculated stats
  const recipesCooked = user.history.length
  // Mock logic for total time - assume 30 mins per recipe average
  const totalCookingTime = `${Math.floor(recipesCooked * 0.5)} hours`
  const streak = 0 // Streak requires daily tracking, setting to 0 for now

  const tabs = [
    { id: "overview", label: t("profile.tab.overview"), icon: User },
    { id: "favorites", label: t("profile.tab.favorites"), icon: Heart },
    { id: "history", label: t("profile.tab.history"), icon: Clock },
    { id: "settings", label: t("profile.tab.settings"), icon: Settings },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Profile Header */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            {/* Avatar */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl bg-secondary flex items-center justify-center"
              >
                <User className="w-16 h-16 text-muted-foreground" />
              </motion.div>
            </div>

            {/* User Info */}
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="text-2xl font-bold max-w-[250px]"
                    />
                    <Button size="sm" onClick={handleSaveName}>{t("profile.save")}</Button>
                  </div>
                ) : (
                  <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                )}
                {!isEditing && (
                  <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground mb-4 flex items-center gap-2 justify-center md:justify-start">
                {t("profile.masterChef")}
                {user.role === 'admin' && (
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold border border-red-200">
                    ADMIN
                  </span>
                )}
              </p>
              <div className="flex items-center gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ChefHat className="w-4 h-4 text-primary" />
                  {recipesCooked} {t("profile.recipesCooked")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" />
                  {totalCookingTime}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-2xl bg-card border border-border text-center"
              >
                <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{user.favorites.length}</p>
                <p className="text-xs text-muted-foreground">{t("profile.favorites")}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-2xl bg-card border border-border text-center"
              >
                <ChefHat className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">
                  {recipesCooked}
                </p>
                <p className="text-xs text-muted-foreground">{t("profile.cooked")}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border sticky top-[72px] bg-background/80 backdrop-blur-lg z-30">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className="rounded-full gap-2"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Cooking Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div whileHover={{ y: -5 }} className="bg-card rounded-3xl border border-border p-6">
                    <ChefHat className="w-8 h-8 text-primary mb-4" />
                    <p className="text-3xl font-bold text-foreground mb-1">{recipesCooked}</p>
                    <p className="text-muted-foreground">{t("profile.recipesCooked")}</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="bg-card rounded-3xl border border-border p-6">
                    <Heart className="w-8 h-8 text-primary mb-4" />
                    <p className="text-3xl font-bold text-foreground mb-1">{user.favorites.length}</p>
                    <p className="text-muted-foreground">{t("profile.favorites")}</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="bg-card rounded-3xl border border-border p-6">
                    <TrendingUp className="w-8 h-8 text-primary mb-4" />
                    <p className="text-3xl font-bold text-foreground mb-1">{streak} {t("profile.days")}</p>
                    <p className="text-muted-foreground">{t("profile.streak")}</p>
                  </motion.div>
                </div>

                {/* Recently Cooked */}
                <div>
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    {t("profile.recentlyCooked")}
                  </h2>
                  {recentRecipes.length > 0 ? (
                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {recentRecipes.slice(0, 5).map((recipe) => (
                        <Link key={recipe.id} href={`/cook?recipe=${recipe.id}`}>
                          <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-card rounded-2xl border border-border overflow-hidden group"
                          >
                            <div className="aspect-square overflow-hidden">
                              <img
                                src={recipe.image || "/placeholder.svg?height=200&width=200&query=Indian food"}
                                alt={recipe.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-3">
                              <p className="font-medium text-sm truncate">{isHindi ? recipe.nameHindi : recipe.name}</p>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">{t("profile.noHistory")}</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "favorites" && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {favoriteRecipes.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={`/cook?recipe=${recipe.id}`}>
                        <motion.div
                          whileHover={{ y: -8 }}
                          className="bg-card rounded-2xl border border-border overflow-hidden group"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                              src={recipe.image || "/placeholder.svg?height=300&width=400&query=Indian food"}
                              alt={recipe.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                              <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                            </button>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold mb-1">{isHindi ? recipe.nameHindi : recipe.name}</h3>
                            <p className="text-xs text-muted-foreground">{isHindi ? recipe.name : recipe.nameHindi}</p>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                {favoriteRecipes.length === 0 && (
                  <div className="text-center py-20">
                    <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{t("profile.noFavorites")}</h3>
                    <p className="text-muted-foreground mb-6">{t("profile.startSaving")}</p>
                    <Link href="/recipes">
                      <Button className="rounded-full">{t("profile.browseRecipes")}</Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="space-y-4">
                  {recentRecipes.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={`/cook?recipe=${recipe.id}`}>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
                          <img
                            src={recipe.image || "/placeholder.svg?height=80&width=80&query=Indian food"}
                            alt={recipe.name}
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{isHindi ? recipe.nameHindi : recipe.name}</h3>
                            <p className="text-sm text-muted-foreground">{t(`cuisine.${recipe.cuisine}` as TranslationKey)}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {recipe.time} {t("recipe.time")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {recipe.rating}
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                            {t("profile.cookAgain")}
                          </Button>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  {recentRecipes.length === 0 && (
                    <p className="text-center text-muted-foreground py-10">{t("profile.noHistory")}</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                {/* Appearance */}
                <div className="bg-card rounded-3xl border border-border p-6">
                  <h3 className="font-semibold mb-6 flex items-center gap-2">
                    <Sun className="w-5 h-5 text-primary" />
                    {t("profile.section.appearance")}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("profile.darkMode")}</p>
                      <p className="text-sm text-muted-foreground">{t("profile.desc.darkMode")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-muted-foreground" />
                      <Switch
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      />
                      <Moon className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Language */}
                <div className="bg-card rounded-3xl border border-border p-6">
                  <h3 className="font-semibold mb-6 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    {t("profile.section.language")}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("profile.language")}</p>
                      <p className="text-sm text-muted-foreground">{t("profile.desc.language")}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={language === "en-IN" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLanguage("en-IN")}
                        className="rounded-full"
                      >
                        English
                      </Button>
                      <Button
                        variant={language === "hi-IN" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLanguage("hi-IN")}
                        className="rounded-full"
                      >
                        हिंदी
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Voice */}
                <div className="bg-card rounded-3xl border border-border p-6">
                  <h3 className="font-semibold mb-6 flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-primary" />
                    {t("profile.section.voice")}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{t("profile.voiceNarration")}</p>
                        <p className="text-sm text-muted-foreground">{t("profile.desc.voice")}</p>
                      </div>
                      <Switch checked={user.settings.voiceEnabled} onCheckedChange={(c) => updateSettings({ voiceEnabled: c })} />
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-card rounded-3xl border border-border p-6">
                  <h3 className="font-semibold mb-6 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    {t("profile.section.notifications")}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("profile.timerAlerts")}</p>
                      <p className="text-sm text-muted-foreground">{t("profile.desc.notifications")}</p>
                    </div>
                    <Switch checked={user.settings.notifications} onCheckedChange={(c) => updateSettings({ notifications: c })} />
                  </div>
                </div>

                {/* Logout */}
                <Button
                  variant="outline"
                  className="w-full rounded-full gap-2 text-destructive hover:bg-destructive/10 bg-transparent"
                  onClick={() => {
                    // In a real app this would clear session, here we can just clear local storage
                    localStorage.removeItem("talktotaste-user")
                    window.location.reload()
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  {t("profile.reset")}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  )
}
