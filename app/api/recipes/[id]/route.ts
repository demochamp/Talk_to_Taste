import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Recipe from "@/lib/models/Recipe"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const params = await context.params
    const id = params.id
    const recipeId = parseInt(id)

    const recipe = await Recipe.findOne({ id: recipeId })

    if (!recipe) {
      return NextResponse.json(
        { error: "Recipe not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(recipe)

  } catch (error) {
    console.error("Recipe fetch error:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
