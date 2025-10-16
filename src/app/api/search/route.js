import { NextResponse } from "next/server"
import { BLOG_POSTS } from "../../../data/blog/posts"
import { VIDEOS } from "../../../data/videos/videos"
import { CASE_STUDIES } from "../../../data/resources/case-studies"
import { WHITEPAPERS } from "../../../data/resources/whitepapers"
import { books as BOOKS } from "../../../data/books/books"

export const dynamic = "force-dynamic"
export const revalidate = 0

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/[^\w\s:%/-]+/g, "") // keep common punctuation we use in titles
    .replace(/\s+/g, " ")
    .trim()
}

function scoreFor(query, hay) {
  const q = norm(query)
  const h = norm(hay)
  if (!q || !h) return 0

  let s = 0
  if (h.includes(q)) s += 10 // full phrase boost
  if (h.startsWith(q)) s += 5 // prefix boost

  const qTokens = Array.from(new Set(q.split(" ").filter(Boolean)))
  const hTokens = new Set(h.split(" ").filter(Boolean))

  let overlap = 0
  for (const t of qTokens) {
    if (hTokens.has(t)) overlap++
    // soft contains for each token
    if (h.includes(t)) s += 1
  }
  if (qTokens.length) {
    const jaccardLike = overlap / qTokens.length
    s += Math.round(jaccardLike * 5)
  }
  return s
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") || "").trim()
  if (q.length < 2) return NextResponse.json({ results: [] })

  const blog = BLOG_POSTS.map((p) => {
    const contentText = Array.isArray(p.content)
      ? p.content
          .map((b) => {
            if (b.type === "paragraph") return b.text
            if (b.type === "bullets") return (b.items || []).join(" ")
            if (b.type === "image") return b.alt || ""
            return ""
          })
          .join(" ")
      : ""
    const tagsText = (p.tags || []).join(" ")
    const hay = `${p.title} ${p.excerpt || ""} ${tagsText} ${contentText}`
    const s = scoreFor(q, hay)
    return {
      type: "Blog",
      id: p.slug,
      title: p.title,
      href: `/blog/${p.slug}`,
      snippet: p.excerpt,
      _score: s + ((p.tags || []).some((t) => norm(t) === norm(q)) ? 3 : 0),
    }
  })

  const videos = VIDEOS.map((v) => {
    const hay = `${v.title} ${v.category || ""} ${v.description || ""}`
    return {
      type: "Video",
      id: v.id,
      title: v.title,
      href: `/videos#${encodeURIComponent(v.id)}`,
      snippet: `${v.category || ""}${v.category && v.duration ? " • " : ""}${v.duration || ""}`,
      _score: scoreFor(q, hay),
    }
  })

  const books = BOOKS.map((b) => ({
    type: "Book",
    id: b.slug,
    title: b.title,
    href: `/books/${b.slug}`,
    snippet: b.description,
    _score: scoreFor(q, `${b.title} ${b.description || ""} ${(b.topics || []).join(" ")} ${(b.tags || []).join(" ")}`),
  }))

  const cases = CASE_STUDIES.map((c) => ({
    type: "Case Study",
    id: c.slug,
    title: c.title,
    href: `/case-studies#${encodeURIComponent(c.slug)}`,
    snippet: c.summary,
    _score: scoreFor(q, `${c.title} ${c.summary || ""} ${(c.tags || []).join(" ")}`),
  }))

  const white = WHITEPAPERS.map((w) => ({
    type: "Whitepaper",
    id: w.slug,
    title: w.title,
    href: `/whitepapers#${encodeURIComponent(w.slug)}`,
    snippet: w.summary,
    _score: scoreFor(q, `${w.title} ${w.summary || ""} ${(w.keywords || []).join(" ")}`),
  }))

  const all = [...blog, ...videos, ...books, ...cases, ...white]
    .filter((r) => r._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 30)
    .map(({ _score, ...rest }) => rest)

  return NextResponse.json({ results: all })
}
