export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
import Recipe from "@/lib/models/Recipe"
import connectDB from "@/lib/mongodb"

export async function POST(req: Request) {
  await connectDB()
  const { query } = await req.json()

  const recipes = await Recipe.find({
    name: { $regex: query, $options: "i" },
  }).limit(5)

  return NextResponse.json(recipes)
}
