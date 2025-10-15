import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { sendWelcomeContact } from "@/lib/email"

export async function POST(req) {
  const form = await req.formData()
  const name = String(form.get("name") || "").trim()
  const email = String(form.get("email") || "")
    .trim()
    .toLowerCase()
  const message = String(form.get("message") || "").trim()
  if (!email || !message) return NextResponse.redirect(new URL("/?contacted=0", req.url))

  const database = await db()
  await database.collection("contacts").insertOne({
    name,
    email,
    message,
    status: "pending",
    createdAt: new Date(),
  })

  try {
    await sendWelcomeContact({ to: email, name })
  } catch (e) {
    console.warn("[LaieslyBird] sendWelcomeContact failed", e?.message)
  }

  return NextResponse.redirect(new URL("/?contacted=1", req.url))
}
