import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { name } = await req.json()

  return NextResponse.json({
    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(name + " recipe")}`,
  })
}
