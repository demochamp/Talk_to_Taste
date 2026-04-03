export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic'
import { recipes as staticRecipes } from "@/lib/recipes-data"
import connectDB from "@/lib/mongodb"
import Recipe from "@/lib/models/Recipe"

export async function GET() {
  try {
    await connectDB()
    const dbRecipes = await Recipe.find({}).sort({ createdAt: -1 }).lean()
    
    // Combine static recipes with database recipes
    const combined = [...staticRecipes, ...dbRecipes]
    
    // Deduplicate by ID to prevent key collisions in React
    const uniqueMap = new Map()
    combined.forEach(recipe => {
      // If clash occurs, database recipe (more recent) takes precedence
      uniqueMap.set(recipe.id, recipe)
    })
    
    return NextResponse.json(Array.from(uniqueMap.values()))
  } catch (error) {
    console.error("Database Error:", error)
    // Fallback to static recipes if DB fails, so the site doesn't break
    return NextResponse.json(staticRecipes)
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()

    if (!body.name) {
      return NextResponse.json({ error: "Recipe name is required" }, { status: 400 })
    }

    // Find the current maximum ID to ensure uniqueness
    const lastDbRecipe = await Recipe.findOne().sort({ id: -1 })
    const lastDbId = lastDbRecipe ? lastDbRecipe.id : 0
    const lastStaticId = staticRecipes.length > 0 ? Math.max(...staticRecipes.map(r => r.id)) : 0

    const newId = Math.max(lastStaticId, lastDbId) + 1

    const newRecipe = await Recipe.create({
      ...body,
      id: newId
    })

    return NextResponse.json(newRecipe, { status: 201 })
  } catch (error: any) {
    console.error("Failed to create recipe:", error)
    return NextResponse.json({ error: error.message || "Failed to create recipe" }, { status: 500 })
  }
}
