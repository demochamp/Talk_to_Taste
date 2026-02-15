import { NextResponse } from "next/server"
import { recipes } from "@/lib/recipes-data"

export async function GET() {
  return NextResponse.json(recipes)
}
