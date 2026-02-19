import { NextResponse } from "next/server"
import { recipes } from "@/lib/recipes-data"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const id = parseInt(params.id)

    const recipe = recipes.find((r) => r.id === id)

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
