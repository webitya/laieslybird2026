import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const database = await db()

    await database.collection("visitors").insertOne({
      createdAt: new Date(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[v0] Track visit error:", error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
