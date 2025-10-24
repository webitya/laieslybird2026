import { BLOG_POSTS } from "@/data/blog/posts"
import { CASE_STUDIES } from "@/data/resources/case-studies"
import { WHITEPAPERS } from "@/data/resources/whitepapers"
import { VIDEOS } from "@/data/videos/videos"
import { books } from "@/data/books/books"

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://laieslybird.com"
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "about", priority: 0.7, changeFrequency: "monthly" },
    { path: "contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "careers", priority: 0.6, changeFrequency: "monthly" },
    { path: "videos", priority: 0.6, changeFrequency: "weekly" },
    { path: "books", priority: 0.6, changeFrequency: "monthly" },
    { path: "case-studies", priority: 0.6, changeFrequency: "monthly" },
    { path: "whitepapers", priority: 0.6, changeFrequency: "monthly" },
    { path: "blog", priority: 0.8, changeFrequency: "daily" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${base}/${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))

  // Hardcoded dynamic entries
  const posts = BLOG_POSTS.map((d) => ({
    url: `${base}/blog/${d.slug}`,
    lastModified: d.date ? new Date(d.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  const cases = CASE_STUDIES.map((c) => ({
    url: `${base}/case-studies#${c.slug}`,
    lastModified: c.date ? new Date(c.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const papers = WHITEPAPERS.map((p) => ({
    url: `${base}/whitepapers#${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const videos = VIDEOS.map((v) => ({
    url: `${base}/videos#${v.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }))

  const booksEntries = books.map((b) => ({
    url: `${base}/books/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...posts, ...cases, ...papers, ...videos, ...booksEntries]
}
