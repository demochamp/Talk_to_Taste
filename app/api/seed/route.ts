import { connectDB } from "@/lib/mongodb"
import Recipe from "@/lib/models/Recipe"
export async function GET() {
  await connectDB()

  await Recipe.insertMany([
    {
      name: "Paneer Butter Masala",
      cuisine: "Indian",
      ingredients: ["Paneer", "Butter", "Tomato", "Cream"],
      steps: [
        "Heat butter",
        "Add tomato puree",
        "Add paneer",
        "Cook 10 minutes"
      ],
      time: 25
    },
    {
      name: "Masala Dosa",
      cuisine: "South Indian",
      ingredients: ["Rice batter", "Potato", "Spices"],
      steps: [
        "Heat tawa",
        "Spread batter",
        "Add masala",
        "Fold dosa"
      ],
      time: 20
    }
  ])

  return Response.json({ message: "Seeded successfully" })
}
