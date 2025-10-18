import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const database = await db()
    const data = await database
      .collection("subscribers")
      .find({}, { projection: { name: 1, email: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ data })
  } catch (error) {
    console.error("[v0] Get subscribers error:", error)
    return NextResponse.json({ data: [] })
  }
}
