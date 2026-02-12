import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Recipe from "@/lib/models/Recipe"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await context.params   // ✅ REQUIRED in Next 16

    const recipe = await Recipe.findById(id).lean()

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
