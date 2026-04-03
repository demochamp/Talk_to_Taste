"use client"

import { useParams, notFound } from "next/navigation"
import { useState } from "react"
import { recipes } from "@/lib/recipes-data"
import { motion } from "framer-motion"
import { Clock, Users, Flame, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTranslation, TranslationKey } from "@/lib/i18n"
import { useVoice } from "@/hooks/use-voice"

export default function RecipePage() {
    const params = useParams()
    const { t } = useTranslation()
    const { language } = useVoice()
    const [showTools, setShowTools] = useState(false)
    const [showVideo, setShowVideo] = useState(false)
    
    const id = Number(params.id)
    const recipe = recipes.find((r) => r.id === id)

    if (!recipe) {
        notFound()
    }

    const isHindi = language === "hi-IN"

    return (
        <main className="min-h-screen bg-background pt-24 pb-16">
            <div className="container mx-auto px-6">
                <Link href="/">
                    <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground">
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        {t("recipe.back")}
                    </Button>
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-3xl overflow-hidden shadow-2xl sticky top-24"
                    >
                        <div className="relative aspect-square md:aspect-video lg:aspect-square">
                            <Image
                                src={recipe.image || "/placeholder.jpg"}
                                alt={isHindi ? recipe.nameHindi : recipe.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                    {t(`cuisine.${recipe.cuisine}` as TranslationKey)}
                                </span>
                                <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                                    ★ {recipe.rating}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                {isHindi ? recipe.nameHindi : recipe.name}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {isHindi ? recipe.descriptionHindi : recipe.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
                            <div className="flex flex-col items-center justify-center text-center p-4 bg-secondary/30 rounded-2xl border border-border/50">
                                <Clock className="w-6 h-6 text-primary mb-2" />
                                <span className="text-sm text-muted-foreground">{t("recipe.cookTime")}</span>
                                <span className="font-semibold text-foreground">
                                    {recipe.time}
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center p-4 bg-secondary/30 rounded-2xl border border-border/50">
                                <Users className="w-6 h-6 text-primary mb-2" />
                                <span className="text-sm text-muted-foreground">{t("recipe.servings")}</span>
                                <span className="font-semibold text-foreground">
                                    {recipe.servings} {t("recipe.people")}
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center p-4 bg-secondary/30 rounded-2xl border border-border/50">
                                <Flame className="w-6 h-6 text-primary mb-2" />
                                <span className="text-sm text-muted-foreground">{t("recipe.difficulty")}</span>
                                <span className="font-semibold text-foreground">
                                    {t(`difficulty.${recipe.difficulty}` as TranslationKey)}
                                </span>
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">{t("recipe.ingredients")}</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                        <span className="font-medium text-foreground">
                                            {ingredient.quantity} {isHindi ? ingredient.itemHindi : ingredient.item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA */}
                        <div className="pt-6">
                            <Link href={`/cook?recipe=${recipe.id}`}>
                                <Button size="lg" className="w-full text-lg h-14 rounded-full shadow-lg shadow-primary/25">
                                    {t("recipe.startCooking")}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
