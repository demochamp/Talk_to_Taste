import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Recipe from "@/lib/models/Recipe"

import { recipes as staticRecipes } from "@/lib/recipes-data"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const numericId = parseInt(id)

    // 1. Check static recipes first (faster)
    const staticRecipe = staticRecipes.find(r => r.id === numericId)
    if (staticRecipe) {
      return NextResponse.json(staticRecipe)
    }

    // 2. Check database
    const dbRecipe = await Recipe.findOne({ id: numericId })
    if (dbRecipe) {
      return NextResponse.json(dbRecipe)
    }

    return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
  } catch (error: any) {
    console.error("Failed to fetch recipe:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch recipe" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    // Confirm that the id exists and belongs to a DB recipe
    const deletedRecipe = await Recipe.findOneAndDelete({ id: parseInt(id) })

    if (!deletedRecipe) {
      return NextResponse.json({ error: "Recipe not found or cannot be deleted (static recipes are protected)" }, { status: 404 })
    }

    return NextResponse.json({ message: "Recipe deleted successfully" })
  } catch (error: any) {
    console.error("Failed to delete recipe:", error)
    return NextResponse.json({ error: error.message || "Failed to delete recipe" }, { status: 500 })
  }
}
