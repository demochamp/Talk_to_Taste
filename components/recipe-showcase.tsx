"use client"

import { motion } from "framer-motion"
import { Clock, Users, Flame, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const recipes = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    cuisine: "North Indian",
    time: "45 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.9,
    image: "/paneer-butter-masala-rich-creamy-curry.jpg",
  },
  {
    id: 2,
    name: "Biryani",
    cuisine: "Hyderabadi",
    time: "90 mins",
    servings: 6,
    difficulty: "Hard",
    rating: 4.8,
    image: "/hyderabadi-biryani-layered-rice.jpg",
  },
  {
    id: 3,
    name: "Masala Dosa",
    cuisine: "South Indian",
    time: "30 mins",
    servings: 2,
    difficulty: "Easy",
    rating: 4.7,
    image: "/crispy-masala-dosa-with-chutney.jpg",
  },
  {
    id: 4,
    name: "Dal Makhani",
    cuisine: "Punjabi",
    time: "60 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.9,
    image: "/dal-makhani-creamy-lentils.jpg",
  },
  {
    id: 5,
    name: "Chole Bhature",
    cuisine: "North Indian",
    time: "50 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    image: "/chole-bhature-chickpea-curry-fried-bread.jpg",
  },
  {
    id: 6,
    name: "Gulab Jamun",
    cuisine: "Dessert",
    time: "40 mins",
    servings: 8,
    difficulty: "Medium",
    rating: 4.9,
    image: "/gulab-jamun-sweet-dessert.jpg",
  },
]

export function RecipeShowcase() {
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
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Recipe Collection</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
              Discover <span className="gradient-text">100+ Authentic</span>
              <br />
              Indian Recipes
            </h2>
          </div>
          <motion.div whileHover={{ x: 5 }}>
            <Button variant="outline" className="rounded-full gap-2 bg-transparent" asChild>
              <Link href="/recipes">
                View All Recipes
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Recipes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
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
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-foreground">{recipe.rating}</span>
                    </div>

                    {/* Cuisine badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                      {recipe.cuisine}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-4">
                      {recipe.name}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings} servings</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-4 h-4" />
                        <span>{recipe.difficulty}</span>
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
