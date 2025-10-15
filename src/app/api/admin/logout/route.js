import { NextResponse } from "next/server"
export async function POST(req) {
  const res = NextResponse.redirect(new URL("/", req.url))
  res.cookies.set("laieslybird_admin", "", { httpOnly: true, path: "/", maxAge: 0 })
  return res
}
