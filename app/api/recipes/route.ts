import { connectDB } from "@/lib/mongodb"
import Recipe from "@/lib/models/Recipe"

export async function GET() {
  try {
    await connectDB()

    const recipes = await Recipe.find()

    return Response.json(recipes)
  } catch (error) {
    return Response.json({ error: "DB Error" }, { status: 500 })
  }
}
