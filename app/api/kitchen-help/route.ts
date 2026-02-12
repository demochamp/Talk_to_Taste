import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { problem } = await req.json()

  return NextResponse.json({
    answer: `Quick fix for "${problem}": Add a little water, balance spices, and simmer slowly.`,
  })
}
