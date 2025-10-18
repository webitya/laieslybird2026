import { db, ObjectId } from "../../../../lib/db"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { id, status } = await req.json()

    if (!id) {
      return NextResponse.json({ error: "Contact ID is required" }, { status: 400 })
    }

    const database = await db()

    const result = await database.collection("contacts").updateOne({ _id: new ObjectId(id) }, { $set: { status } })

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Contact not found or status unchanged" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Status updated successfully" })
  } catch (error) {
    console.error("[v0] Status update error:", error)
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 })
  }
}
