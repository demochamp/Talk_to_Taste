export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
import { recipes as staticRecipes } from "@/lib/recipes-data"
import Recipe from "@/lib/models/Recipe"
import connectDB from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { query } = await req.json()
    if (!query) return NextResponse.json([])

    const q = query.trim().toLowerCase()

    // 1. Search in static recipes (fast & comprehensive)
    const staticMatches = staticRecipes.filter((r) => {
      return (
        r.name?.toLowerCase().includes(q) ||
        r.nameHindi?.toLowerCase().includes(q) ||
        r.nameHinglish?.toLowerCase().includes(q) ||
        (r.synonyms || []).some(s => s.toLowerCase().includes(q)) ||
        (r.tags || []).some(t => t.toLowerCase().includes(q)) ||
        r.cuisine?.toLowerCase().includes(q) ||
        r.category?.toLowerCase().includes(q) ||
        (r.ingredients || []).some(ing => 
          ing.item?.toLowerCase().includes(q) || 
          ing.itemHindi?.toLowerCase().includes(q)
        )
      )
    })

    // 2. Also try database if available
    let dbMatches: any[] = []
    try {
      await connectDB()
      dbMatches = await Recipe.find({
        $or: [
          { name: { $regex: q, $options: "i" } },
          { nameHindi: { $regex: q, $options: "i" } },
          { cuisine: { $regex: q, $options: "i" } },
          { tags: { $regex: q, $options: "i" } },
        ]
      }).limit(5).lean()
    } catch (dbErr) {
      // Ignore DB errors in voice search
    }

    // Merge and deduplicate by ID
    const map = new Map()
    for (const r of [...staticMatches, ...dbMatches]) {
      if (!map.has(r.id)) {
        map.set(r.id, r)
      }
    }

    return NextResponse.json(Array.from(map.values()).slice(0, 10))
  } catch (error) {
    console.error("Voice search error:", error)
    return NextResponse.json([])
  }
}

