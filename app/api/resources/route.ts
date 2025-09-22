import { type NextRequest, NextResponse } from "next/server"
import { mockResources } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")

    let filteredResources = mockResources

    if (category) {
      filteredResources = filteredResources.filter((resource) => resource.category === category)
    }

    if (tag) {
      filteredResources = filteredResources.filter((resource) => resource.tags.includes(tag))
    }

    return NextResponse.json({
      success: true,
      data: filteredResources,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch resources",
      },
      { status: 500 },
    )
  }
}
