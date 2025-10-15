import { db, ObjectId } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req) {
  const form = await req.formData()
  const id = String(form.get("id") || "")
  const status = String(form.get("status") || "pending")
  if (!id) return NextResponse.redirect(new URL("/admin", req.url))
  const database = await db()
  try {
    await database.collection("contacts").updateOne({ _id: new ObjectId(id) }, { $set: { status } })
  } catch {}
  return NextResponse.redirect(new URL("/admin", req.url))
}
