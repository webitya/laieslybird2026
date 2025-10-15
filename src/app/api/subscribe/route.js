import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { sendWelcomeSubscribe } from "@/lib/email"

export async function POST(req) {
  const form = await req.formData()
  const name = String(form.get("name") || "").trim()
  const email = String(form.get("email") || "")
    .trim()
    .toLowerCase()
  if (!email) return NextResponse.redirect(new URL("/?subscribed=0", req.url))

  const database = await db()
  await database.collection("subscribers").insertOne({
    name,
    email,
    createdAt: new Date(),
  })

  try {
    await sendWelcomeSubscribe({ to: email, name })
  } catch (e) {
    console.warn("[LaieslyBird] sendWelcomeSubscribe failed", e?.message)
  }

  const res = NextResponse.redirect(new URL("/?subscribed=1", req.url))
  return res
}
