import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { sendWelcomeSubscribe } from "@/lib/email"

export async function POST(req) {
  const form = await req.formData()
  const name = String(form.get("name") || "").trim()
  const email = String(form.get("email") || "")
    .trim()
    .toLowerCase()
  const wantsJson = (req.headers.get("accept") || "").includes("application/json")

  if (!email) {
    if (wantsJson) return NextResponse.json({ ok: false, error: "missing_email" }, { status: 400 })
    return NextResponse.redirect(new URL("/?subscribed=0", req.url))
  }

  // Guard DB insert so missing MONGODB_URI won't crash
  try {
    const database = await db()
    await database.collection("subscribers").insertOne({
      name,
      email,
      createdAt: new Date(),
    })
  } catch (e) {
    console.warn("[LaieslyBird] subscribe db insert failed", e?.message)
  }

  try {
    await sendWelcomeSubscribe({ to: email, name })
  } catch (e) {
    console.warn("[LaieslyBird] sendWelcomeSubscribe failed", e?.message)
  }

  if (wantsJson) return NextResponse.json({ ok: true })
  const res = NextResponse.redirect(new URL("/?subscribed=1", req.url))
  return res
}
