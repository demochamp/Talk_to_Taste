import { NextResponse } from "next/server"
import { recipes as staticRecipes } from "@/lib/recipes-data"
import connectDB from "@/lib/mongodb"
import Recipe from "@/lib/models/Recipe"

export async function GET() {
  try {
    await connectDB()
    const allRecipes = await Recipe.find({})
    return NextResponse.json(allRecipes)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()

    // Simple validation could go here

    // Generate an ID (Last static ID + DB count + 1, or just explicit)
    // For simplicity, let's find the max ID in DB or static.
    const lastStaticId = staticRecipes.length > 0 ? staticRecipes[staticRecipes.length - 1].id : 0
    // This is a naive ID generation, ideally use UUID strings, but app uses numbers.
    // Let's check DB max ID.
    const lastDbRecipe = await Recipe.findOne().sort({ id: -1 })
    const lastDbId = lastDbRecipe ? lastDbRecipe.id : 0

    const newId = Math.max(lastStaticId, lastDbId) + 1

    const newRecipe = await Recipe.create({
      ...body,
      id: newId
    })

    return NextResponse.json(newRecipe, { status: 201 })
  } catch (error) {
    console.error("Failed to create recipe:", error)
    return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 })
  }
}
