import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Recipe from "@/lib/models/Recipe"
import { recipes } from "@/lib/recipes-data"

export async function GET() {
  await connectDB()

  // optional — clear first to avoid duplicates
  await Recipe.deleteMany({})

  await Recipe.insertMany(recipes)

  return NextResponse.json({
    message: "All recipes inserted",
    count: recipes.length
  })
}
