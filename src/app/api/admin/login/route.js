import { NextResponse } from "next/server"

export async function POST(req) {
  const form = await req.formData()
  const username = String(form.get("username") || "")
  const password = String(form.get("password") || "")
  const ok =
    username === (process.env.ADMIN_USERNAME || "admin") && password === (process.env.ADMIN_PASSWORD || "admin123")
  if (!ok) return NextResponse.redirect(new URL("/admin/login?error=1", req.url))

  const res = NextResponse.redirect(new URL("/admin", req.url))
  res.cookies.set("laieslybird_admin", "1", { httpOnly: true, path: "/", maxAge: 60 * 60 * 8 })
  return res
}
