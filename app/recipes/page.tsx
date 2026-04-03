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
import { useVoice } from "@/hooks/use-voice"
import { VoiceWaveAnimation } from "@/components/voice-wave-animation"
import { useUserState } from "@/hooks/use-user-state"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n"
import { processVoiceCommand } from "@/lib/voice/command-processor"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export default function RecipesPage() {
  const { t } = useTranslation()
  const { toggleFavorite, isFavorite } = useUserState()
  const searchParams = useSearchParams()
  const router = useRouter()
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
  const [showAllCuisines, setShowAllCuisines] = useState(false)

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
    mode,
    language,
  } = useVoice()

  // Toggle voice listening
  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening({ mode: "SEARCH" })
    }
  }

  // Handle voice transcript - NOW ONLY IN SEARCH MODE

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const q = searchQuery.toLowerCase()

      const matchesSearch =
        (recipe.name || "").toLowerCase().includes(q) ||
        (recipe.nameHindi || "").toLowerCase().includes(q) ||
        (recipe.nameHinglish || "").toLowerCase().includes(q) ||
        (recipe.synonyms || []).some((s: string) => s.toLowerCase().includes(q)) ||
        (recipe.tags || []).some((tag: string) => tag.toLowerCase().includes(q)) ||
        (recipe.ingredients || []).some((ing: any) =>
          (ing.item || "").toLowerCase().includes(q) ||
          (ing.itemHindi || "").toLowerCase().includes(q)
        ) ||
        (recipe.steps || []).some((step: any) =>
          (step.instruction || "").toLowerCase().includes(q) ||
          (step.instructionHindi || "").toLowerCase().includes(q)
        )

      const matchesCuisine = selectedCuisine === "All" || recipe.cuisine === selectedCuisine
      const matchesDifficulty = selectedDifficulty === "All" || recipe.difficulty === selectedDifficulty
      const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory
      return matchesSearch && matchesCuisine && matchesDifficulty && matchesCategory
    })
  }, [recipes, searchQuery, selectedCuisine, selectedDifficulty, selectedCategory])

  // Handle voice transcript
  useEffect(() => {
    if (isListening && transcript && mode === "SEARCH") {
      // Process the command
      const { intent, params } = processVoiceCommand(transcript)

      console.log("Recipes Voice Command:", intent, params, transcript)

      // Handle standard search if not a specific command
      if (intent === "UNKNOWN" || intent === "NAV_RECIPES" || intent === "SEARCH_RECIPE") {
        setSearchQuery(transcript)
        return
      }

      // Handle specific commands
      switch (intent) {
        case "FILTER_CATEGORY":
          if (params?.category) {
            setSelectedCategory(String(params.category))
            setSearchQuery("") // Clear text search to show category
          }
          break

        case "FILTER_DIFFICULTY":
          if (params?.difficulty) {
            setSelectedDifficulty(String(params.difficulty))
            setSearchQuery("")
          }
          break

        case "FILTER_CUISINE":
          if (params?.cuisine) {
            setSelectedCuisine(String(params.cuisine))
            setSearchQuery("")
          }
          break

        case "FILTER_INGREDIENTS":
          if (params?.ingredient) {
            setSearchQuery(String(params.ingredient))
            // Reset other filters to ensure we find matches across all
            setSelectedCategory("All")
            setSelectedCuisine("All")
            setSelectedDifficulty("All")
          }
          break

        case "OPEN_RECIPE":
          // If we have a specific ID from the command processor, use it
          if (params?.value) {
            router.push(`/cook?recipe=${params.value}`)
            return
          }

          // Fallback: Open the first result if available
          if (filteredRecipes.length > 0) {
            const recipeToOpen = filteredRecipes[0]
            router.push(`/cook?recipe=${recipeToOpen.id}`)
          }
          break

        default:
          // For other intents (like NAV_HOME), we might want to let a global handler deal with it?
          // Or here we just treat as search query if it's not a filter
          setSearchQuery(transcript)
      }
    }
  }, [isListening, transcript, mode, filteredRecipes, router])



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
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              {t("recipes.explore_title")}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
              {t("recipes.explore_subtitle")}
            </p>

            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("recipes.search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-14 sm:pr-12 h-14 rounded-full text-base sm:text-lg border-2 focus:border-primary w-full"
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
      <section className="py-4 sm:py-8 border-b border-border sticky top-[72px] bg-background/80 backdrop-blur-lg z-30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Cuisine filters - horizontal scroll on mobile */}
            <div className={`flex items-center gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory ${showAllCuisines ? "flex-wrap" : ""}`}>
              {cuisines.slice(0, showAllCuisines ? undefined : 8).map((cuisine) => (
                <Button
                  key={cuisine}
                  variant={selectedCuisine === cuisine ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCuisine(cuisine)}
                  className="rounded-full whitespace-nowrap snap-start"
                >
                  {cuisine === "All" ? t("recipes.filter_all") : t(`cuisine.${cuisine}` as any)}
                </Button>
              ))}
              {cuisines.length > 8 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full whitespace-nowrap bg-transparent"
                  onClick={() => setShowAllCuisines(!showAllCuisines)}
                >
                  {showAllCuisines ? t("recipes.show_less") : t("recipes.show_more").replace("{count}", (cuisines.length - 8).toString())}
                </Button>
              )}
            </div>

            {/* Desktop Filters (Visible on md+) */}
            <div className="hidden md:flex items-center gap-4">
              {/* Category filter dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="rounded-full gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {t("recipes.filter_category")}: {selectedCategory === "All" ? t("recipes.filter_all") : t(`category.${selectedCategory}` as any)}
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
                          {cat === "All" ? t("recipes.filter_all") : t(`category.${cat}` as any)}
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
                  {t("recipes.filter_difficulty")}: {selectedDifficulty === "All" ? t("recipes.filter_all") : t(`difficulty.${selectedDifficulty}` as any)}
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
                          {diff === "All" ? t("recipes.filter_all") : t(`difficulty.${diff}` as any)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Filter Sheet (Visible on <md) */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full gap-2 w-full justify-between px-4">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <span>{t("recipes.filter_title")}</span>
                    </div>
                    {(selectedCategory !== "All" || selectedDifficulty !== "All") && (
                      <span className="bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                        {[selectedCategory !== "All", selectedDifficulty !== "All"].filter(Boolean).length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-[2.5rem] h-[60dvh] pt-10">
                  <SheetHeader className="mb-6">
                    <SheetTitle>{t("recipes.filter_title")}</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6">
                    {/* Category Selection */}
                    <div>
                      <p className="text-sm font-semibold mb-3">{t("recipes.filter_category")}</p>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            size="sm"
                            className="rounded-full"
                            onClick={() => setSelectedCategory(cat)}
                          >
                            {cat === "All" ? t("recipes.filter_all") : t(`category.${cat}` as any)}
                          </Button>
                        ))}
                      </div>
                    </div>
                    {/* Difficulty Selection */}
                    <div>
                      <p className="text-sm font-semibold mb-3">{t("recipes.filter_difficulty")}</p>
                      <div className="flex flex-wrap gap-2">
                        {difficulties.map((diff) => (
                          <Button
                            key={diff}
                            variant={selectedDifficulty === diff ? "default" : "outline"}
                            size="sm"
                            className="rounded-full"
                            onClick={() => setSelectedDifficulty(diff)}
                          >
                            {diff === "All" ? t("recipes.filter_all") : t(`difficulty.${diff}` as any)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
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
                  className="rounded-full gap-1 ml-auto"
                >
                  <X className="w-4 h-4" />
                  {t("recipes.clear_filters")}
                </Button>
              )}

            {/* Results count (hidden on mobile to save space) */}
            <span className="text-sm text-muted-foreground ml-auto hidden sm:inline">{filteredRecipes.length} {t("recipes.found")}</span>
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
              { }
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
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {recipe.rating}
                        </div>

                        {/* Cuisine badge */}
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium shadow-sm">
                          {t(`cuisine.${recipe.cuisine}` as any)}
                        </div>

                        {/* Whistle indicator for pressure cooker recipes */}
                        {recipe.whistleCount && (
                          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium flex items-center gap-1 text-foreground">
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
                          className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors z-20"
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
                          {language === "hi-IN" ? (recipe.nameHindi || recipe.name) : recipe.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {language === "hi-IN" ? recipe.name : recipe.nameHindi}
                        </p>
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
                            {t(`difficulty.${recipe.difficulty}` as any)}
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
              <h3 className="text-xl font-semibold mb-2">{t("recipes.no_results")}</h3>
              <p className="text-muted-foreground mb-6">{t("recipes.try_adjusting")}</p>
              <Button
                onClick={() => {
                  setSelectedCuisine("All")
                  setSelectedDifficulty("All")
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
                className="rounded-full"
              >
                {t("recipes.clear_filters")}
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
