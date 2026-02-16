"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Clock, Users, Flame, Star, Mic, X, ChevronDown, ChefHat, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useVoice, parseVoiceCommand } from "@/hooks/use-voice"
import { VoiceWaveAnimation } from "@/components/voice-wave-animation"
import { useUserState } from "@/hooks/use-user-state"


export default function RecipesPage() {
  const { toggleFavorite, isFavorite } = useUserState()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const query = searchParams.get("search") || searchParams.get("ingredients")
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])
  const [recipes, setRecipes] = useState<any[]>([])
  const [selectedCuisine, setSelectedCuisine] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const cuisines = useMemo(
    () => ["All", ...Array.from(new Set(recipes.map(r => r.cuisine)))],
    [recipes]
  )

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(recipes.map(r => r.category)))],
    [recipes]
  )

  const difficulties = ["All", "Easy", "Medium", "Hard"]


  useEffect(() => {
    fetch("/api/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data))
  }, [])

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported: voiceSupported,
  } = useVoice()

  // Toggle voice listening
  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // Handle voice commands/search
  useEffect(() => {
    if (transcript) {
      // Check for specific commands first
      const command = parseVoiceCommand(transcript)
      if (command) {
        if (command.action === "SEARCH_RECIPE") {
          setSearchQuery(command.params.query as string)
          return
        }
        if (command.action === "SEARCH_BY_INGREDIENTS") {
          setSearchQuery(command.params.ingredients as string)
          return
        }
      }

      // Default: If listening and speaking, update search query directly
      // This makes it feel like "dictation" for the search box
      if (isListening) {
        // Optional: debounce or just set it
        setSearchQuery(transcript.replace(/\.$/, "")) // remove trailing dot
      }
    }
  }, [transcript, isListening])

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const q = searchQuery.toLowerCase()

      const matchesSearch =
        (recipe.name || "").toLowerCase().includes(q) ||
        (recipe.nameHindi || "").toLowerCase().includes(q) ||
        (recipe.tags || []).some((tag: string) => tag.toLowerCase().includes(q)) ||
        (recipe.ingredients || []).some((ing: any) =>
          (ing.item || "").toLowerCase().includes(q) ||
          (ing.itemHindi || "").toLowerCase().includes(q)
        )

      const matchesCuisine = selectedCuisine === "All" || recipe.cuisine === selectedCuisine
      const matchesDifficulty = selectedDifficulty === "All" || recipe.difficulty === selectedDifficulty
      const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory
      return matchesSearch && matchesCuisine && matchesDifficulty && matchesCategory
    })
  }, [recipes, searchQuery, selectedCuisine, selectedDifficulty, selectedCategory])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
            >
              <ChefHat className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="text-3xl md:text-6xl font-bold mb-6">
              Explore <span className="gradient-text">{recipes.length}+ Recipes</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover authentic Indian recipes with voice-guided cooking instructions in Hindi and English
            </p>

            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search recipes, ingredients, or cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-14 rounded-full text-lg border-2 focus:border-primary"
              />
              <Button
                size="icon"
                className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full ${isListening ? "bg-red-500 animate-pulse" : "bg-primary"}`}
                onClick={toggleListening}
                disabled={!voiceSupported}
              >
                {isListening ? <VoiceWaveAnimation isActive={true} /> : <Mic className="w-5 h-5" />}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-[72px] bg-background/80 backdrop-blur-lg z-30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Cuisine filters - horizontal scroll on mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {cuisines.slice(0, 8).map((cuisine) => (
                <Button
                  key={cuisine}
                  variant={selectedCuisine === cuisine ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCuisine(cuisine)}
                  className="rounded-full whitespace-nowrap"
                >
                  {cuisine}
                </Button>
              ))}
              {cuisines.length > 8 && (
                <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap bg-transparent">
                  +{cuisines.length - 8} more
                </Button>
              )}
            </div>

            {/* Category filter dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="rounded-full gap-2"
              >
                <Filter className="w-4 h-4" />
                Category: {selectedCategory}
                <ChevronDown className="w-4 h-4" />
              </Button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 left-0 bg-card border border-border rounded-xl shadow-xl p-2 z-50 min-w-[150px]"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat)
                          setIsCategoryOpen(false)
                        }}
                        className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Difficulty filter */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="rounded-full gap-2"
              >
                <Flame className="w-4 h-4" />
                Difficulty: {selectedDifficulty}
                <ChevronDown className="w-4 h-4" />
              </Button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 left-0 bg-card border border-border rounded-xl shadow-xl p-2 z-50"
                  >
                    {difficulties.map((diff) => (
                      <button
                        key={diff}
                        onClick={() => {
                          setSelectedDifficulty(diff)
                          setIsFilterOpen(false)
                        }}
                        className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedDifficulty === diff ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                          }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clear filters */}
            {(selectedCuisine !== "All" ||
              selectedDifficulty !== "All" ||
              selectedCategory !== "All" ||
              searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCuisine("All")
                    setSelectedDifficulty("All")
                    setSelectedCategory("All")
                    setSearchQuery("")
                  }}
                  className="rounded-full gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear
                </Button>
              )}

            {/* Results count */}
            <span className="text-sm text-muted-foreground ml-auto">{filteredRecipes.length} recipes found</span>
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCuisine}-${selectedDifficulty}-${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.5) }}
                >
                  <Link href={`/cook?recipe=${recipe.id}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <motion.img
                          src={recipe.image || "/placeholder.jpg"}
                          alt={recipe.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Rating */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 text-xs font-medium">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {recipe.rating}
                        </div>

                        {/* Cuisine badge */}
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                          {recipe.cuisine}
                        </div>

                        {/* Whistle indicator for pressure cooker recipes */}
                        {recipe.whistleCount && (
                          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-white/90 text-xs font-medium flex items-center gap-1">
                            <span>🎺</span>
                            {recipe.whistleCount}
                          </div>
                        )}

                        {/* Favorite Toggle */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleFavorite(recipe.id)
                          }}
                          className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors z-20"
                        >
                          <Heart
                            className={`w-4 h-4 ${isFavorite(recipe.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                              }`}
                          />
                        </button>

                        {/* Cook with voice overlay */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-primary/80 flex items-center justify-center"
                        >
                          <div className="text-center text-white">
                            <Mic className="w-10 h-10 mx-auto mb-2" />
                            <span className="font-medium">Cook with Voice</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                          {recipe.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">{recipe.nameHindi}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {recipe.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {recipe.servings}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            {recipe.difficulty}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No results */}
          {filteredRecipes.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button
                onClick={() => {
                  setSelectedCuisine("All")
                  setSelectedDifficulty("All")
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
                className="rounded-full"
              >
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
