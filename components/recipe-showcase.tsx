"use client"

import { motion } from "framer-motion"
import { Clock, Users, Flame, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"
import { useVoice } from "@/hooks/use-voice"

import { recipes } from "@/lib/recipes-data"

// Filter or slice to show only a subset if needed, e.g., first 6
const showcaseRecipes = recipes.slice(0, 6);

export function RecipeShowcase() {
  const { t } = useTranslation()
  const { language } = useVoice()

  return (
    <section className="py-32 relative overflow-hidden bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">{t("recipe_showcase.collection")}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
              {t("recipe_showcase.title_prefix")} <span className="gradient-text">{t("recipe_showcase.title_highlight")}</span>
              <br />
              {t("recipe_showcase.title_suffix")}
            </h2>
          </div>
          <motion.div whileHover={{ x: 5 }}>
            <Button variant="outline" className="rounded-full gap-2 bg-transparent" asChild>
              <Link href="/recipes">
                {t("recipe_showcase.view_all")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Recipes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/recipes/${recipe.id}`}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm shadow-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-foreground">{recipe.rating}</span>
                    </div>

                    {/* Cuisine badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                      {t(`cuisine.${recipe.cuisine}` as any)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-4">
                      {language === "hi-IN" ? (recipe.nameHindi || recipe.name) : recipe.name}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings} {t("recipe.servings")}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-4 h-4" />
                        <span>{t(`difficulty.${recipe.difficulty}` as any)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-primary/10 pointer-events-none"
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
