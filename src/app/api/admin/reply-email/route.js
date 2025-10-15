import { NextResponse } from "next/server"
import { sendAdminReply } from "@/lib/email"

export async function POST(req) {
  const form = await req.formData()
  const to = String(form.get("to") || "")
  const subject = String(form.get("subject") || "")
  const html = String(form.get("html") || "")
  if (!to || !subject || !html) return NextResponse.redirect(new URL("/admin", req.url))
  try {
    await sendAdminReply({ to, subject, messageHtml: html })
  } catch (e) {
    console.warn("[LaieslyBird] sendAdminReply failed", e?.message)
  }
  return NextResponse.redirect(new URL("/admin", req.url))
}
