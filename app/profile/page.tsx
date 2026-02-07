"use client"

import { useState } from "react"
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

// Mock user data - in production this would come from auth/database
const mockUser = {
  name: "Priya Sharma",
  email: "priya@example.com",
  avatar: "/indian-woman-avatar.jpg",
  preferredLanguage: "hi-IN",
  joinedDate: "January 2024",
  stats: {
    recipesCooked: 47,
    totalCookingTime: "32 hours",
    favoriteCuisine: "Punjabi",
    streak: 12,
  },
  favorites: [1, 3, 5, 10, 15], // Recipe IDs
  recentlyCooked: [1, 2, 7, 4, 8],
  achievements: [
    { id: 1, name: "First Recipe", icon: "🎉", unlocked: true },
    { id: 2, name: "10 Recipes", icon: "👨‍🍳", unlocked: true },
    { id: 3, name: "50 Recipes", icon: "🏆", unlocked: false },
    { id: 4, name: "Master Chef", icon: "⭐", unlocked: false },
    { id: 5, name: "Week Streak", icon: "🔥", unlocked: true },
    { id: 6, name: "Month Streak", icon: "💪", unlocked: false },
  ],
}

export default function ProfilePage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<"overview" | "favorites" | "history" | "settings">("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(mockUser.name)
  const [language, setLanguage] = useState(mockUser.preferredLanguage)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [notifications, setNotifications] = useState(true)

  // Get favorite recipes
  const favoriteRecipes = recipes.filter((r) => mockUser.favorites.includes(r.id))
  const recentRecipes = recipes.filter((r) => mockUser.recentlyCooked.includes(r.id))

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "history", label: "History", icon: Clock },
    { id: "settings", label: "Settings", icon: Settings },
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
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl"
              >
                <img
                  src={mockUser.avatar || "/placeholder.svg"}
                  alt={mockUser.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Camera className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>

            {/* User Info */}
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                {isEditing ? (
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="text-2xl font-bold max-w-[250px]"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-foreground">{userName}</h1>
                )}
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-muted-foreground mb-4">{mockUser.email}</p>
              <div className="flex items-center gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ChefHat className="w-4 h-4 text-primary" />
                  {mockUser.stats.recipesCooked} recipes cooked
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" />
                  {mockUser.stats.totalCookingTime}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  {mockUser.stats.streak} day streak
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
                <p className="text-2xl font-bold text-foreground">{mockUser.favorites.length}</p>
                <p className="text-xs text-muted-foreground">Favorites</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-2xl bg-card border border-border text-center"
              >
                <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">
                  {mockUser.achievements.filter((a) => a.unlocked).length}
                </p>
                <p className="text-xs text-muted-foreground">Achievements</p>
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
                {/* Achievements */}
                <div className="bg-card rounded-3xl border border-border p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Achievements
                  </h2>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {mockUser.achievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        whileHover={{ scale: 1.1 }}
                        className={`p-4 rounded-2xl text-center ${
                          achievement.unlocked ? "bg-primary/10" : "bg-secondary opacity-50"
                        }`}
                      >
                        <span className="text-3xl mb-2 block">{achievement.icon}</span>
                        <p className="text-xs font-medium">{achievement.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Cooking Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div whileHover={{ y: -5 }} className="bg-card rounded-3xl border border-border p-6">
                    <ChefHat className="w-8 h-8 text-primary mb-4" />
                    <p className="text-3xl font-bold text-foreground mb-1">{mockUser.stats.recipesCooked}</p>
                    <p className="text-muted-foreground">Recipes Cooked</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="bg-card rounded-3xl border border-border p-6">
                    <Star className="w-8 h-8 text-primary mb-4" />
                    <p className="text-3xl font-bold text-foreground mb-1">{mockUser.stats.favoriteCuisine}</p>
                    <p className="text-muted-foreground">Favorite Cuisine</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="bg-card rounded-3xl border border-border p-6">
                    <TrendingUp className="w-8 h-8 text-primary mb-4" />
                    <p className="text-3xl font-bold text-foreground mb-1">{mockUser.stats.streak} Days</p>
                    <p className="text-muted-foreground">Current Streak</p>
                  </motion.div>
                </div>

                {/* Recently Cooked */}
                <div>
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Recently Cooked
                  </h2>
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
                            <p className="font-medium text-sm truncate">{recipe.name}</p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
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
                            <h3 className="font-semibold mb-1">{recipe.name}</h3>
                            <p className="text-xs text-muted-foreground">{recipe.nameHindi}</p>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                {favoriteRecipes.length === 0 && (
                  <div className="text-center py-20">
                    <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                    <p className="text-muted-foreground mb-6">Start cooking and save your favorite recipes!</p>
                    <Link href="/recipes">
                      <Button className="rounded-full">Browse Recipes</Button>
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
                            <h3 className="font-semibold">{recipe.name}</h3>
                            <p className="text-sm text-muted-foreground">{recipe.cuisine}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {recipe.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {recipe.rating}
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                            Cook Again
                          </Button>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
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
                    Appearance
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
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
                    Language
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Preferred Language</p>
                      <p className="text-sm text-muted-foreground">Choose your cooking language</p>
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
                    Voice Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Voice Narration</p>
                        <p className="text-sm text-muted-foreground">Enable voice reading of instructions</p>
                      </div>
                      <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-card rounded-3xl border border-border p-6">
                  <h3 className="font-semibold mb-6 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Notifications
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Timer Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified when timers complete</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                </div>

                {/* Logout */}
                <Button
                  variant="outline"
                  className="w-full rounded-full gap-2 text-destructive hover:bg-destructive/10 bg-transparent"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
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
