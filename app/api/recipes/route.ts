import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Recipe from "@/lib/models/Recipe"

export async function GET() {
  try {
    await connectDB()
    const recipes = await Recipe.find().lean()
    return NextResponse.json(recipes)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "DB Error" }, { status: 500 })
  }
}
