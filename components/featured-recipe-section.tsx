"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Users, Flame, Star, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"
import { useVoice } from "@/hooks/use-voice"

export function FeaturedRecipeSection() {
  const [featuredRecipe, setFeaturedRecipe] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()
  const { language } = useVoice()

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/recipes")
        const data = await res.json()
        const featured = data.find((r: any) => r.isFeatured === true)
        setFeaturedRecipe(featured)
      } catch (error) {
        console.error("Failed to fetch featured recipe:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  if (loading || !featuredRecipe) return null

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative group bg-card border border-primary/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-[16/10] lg:aspect-auto h-full min-h-[300px] md:min-h-[450px] overflow-hidden">
              <motion.img
                src={featuredRecipe.image || "/placeholder.jpg"}
                alt={featuredRecipe.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              
              {/* Floating Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground shadow-lg backdrop-blur-md animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">{t("home.featured_badge")}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-card via-card/95 to-primary/5">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-primary/40" />
                <span className="text-sm font-semibold text-primary uppercase tracking-widest leading-none">
                  {t("home.featured_title")}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance leading-tight">
                {language === "hi-IN" ? (featuredRecipe.nameHindi || featuredRecipe.name) : featuredRecipe.name}
              </h2>

              <p className="text-lg text-muted-foreground mb-8 line-clamp-3 md:line-clamp-none max-w-xl">
                {language === "hi-IN" ? (featuredRecipe.descriptionHindi || featuredRecipe.description) : featuredRecipe.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-10">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium">{featuredRecipe.time}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-medium">{featuredRecipe.servings} {t("recipe.servings")}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border">
                  <FavoriteStar rating={featuredRecipe.rating} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full px-8 py-7 text-lg gap-2 shadow-xl hover:scale-105 transition-transform" asChild>
                  <Link href={`/recipes/${featuredRecipe.id}`}>
                    {t("home.featured_view_btn")}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                
                <div className="flex items-center gap-4 px-6 py-2 rounded-full border border-primary/20 bg-primary/5">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-card bg-orange-200 flex items-center justify-center overflow-hidden">
                        <img 
                          src={`https://i.pravatar.cc/100?u=${featuredRecipe.id + i}`} 
                          alt="user"
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    250+ {language === "hi-IN" ? "लोगों ने बनाया" : "people cooked this"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}

function FavoriteStar({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      <span className="font-bold text-lg">{rating}</span>
    </div>
  )
}
