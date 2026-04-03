export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Recipe from "@/lib/models/Recipe"

export async function POST(req: Request) {
  try {
    await connectDB()
    const { id, isFeatured } = await req.json()

    if (id === undefined) {
      return NextResponse.json({ error: "Recipe ID is required" }, { status: 400 })
    }

    const recipeId = Number(id)

    if (isFeatured) {
      // If we are setting a new featured recipe, unset all others first
      await Recipe.updateMany({ isFeatured: true }, { isFeatured: false })
    }

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { id: recipeId },
      { isFeatured },
      { new: true }
    )

    if (!updatedRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    return NextResponse.json(updatedRecipe)
  } catch (error: any) {
    console.error("Failed to toggle featured status:", error)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
}
