export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query required" }, { status: 400 })
  }

  try {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + " recipe step by step")}`
    const response = await fetch(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9"
      }
    })

    const html = await response.text()
    
    // Extract ytInitialData JSON from script tag
    const regex = /var ytInitialData = ({.*?});/
    const match = html.match(regex)
    if (!match) {
        // Fallback or retry?
        return NextResponse.json({ videos: [] })
    }

    const data = JSON.parse(match[1])
    const contents = data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || []

    const videos = contents
      .filter((item: any) => item.videoRenderer)
      .map((item: any) => {
        const v = item.videoRenderer
        return {
          id: v.videoId,
          title: v.title.runs[0].text,
          thumbnail: v.thumbnail.thumbnails[0].url,
          duration: v.lengthText?.simpleText || "0:00",
          channel: v.ownerText.runs[0].text,
          publishedTime: v.publishedTimeText?.simpleText || ""
        }
      })
      .slice(0, 10)

    return NextResponse.json({ videos })
  } catch (error) {
    console.error("YouTube Search Error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
