import Link from "next/link"
import { BLOG_POSTS } from "@/data/blog/posts"
import Script from "next/script"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const title = "Blog — SEO‑friendly Insights"
  const description = "Articles, templates, and playbooks for CEOs & Co‑Founders."
  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: { type: "blog", url: `${base}/blog`, title, description },
    twitter: { card: "summary_large_image", title, description },
  }
}

export default async function Blog({ searchParams }) {
  const q = (searchParams?.query || "").toString().trim()

  const posts = BLOG_POSTS.filter((p) => {
    if (!q) return true
    const hay = `${p.title} ${p.excerpt}`.toLowerCase()
    return hay.includes(q.toLowerCase())
  })
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 20)

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: `${base}/blog`,
    name: "LaieslyBird Blog",
    description: "SEO‑friendly insights for CEOs & Co‑Founders: roadmaps, templates, and playbooks.",
  }

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${base}/blog/${p.slug}`,
      name: p.title,
    })),
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold text-purple-800">Blog</h1>
      <form className="flex items-center gap-2" method="GET">
        <input
          name="query"
          placeholder="Search posts…"
          defaultValue={q}
          className="w-full max-w-sm rounded-md border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
        />
        <button className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700">Search</button>
      </form>

      <div className="grid gap-4">
        {posts.map((p) => (
          <article key={p.slug} className="rounded-lg border border-purple-200 bg-white p-4">
            <h2 className="font-semibold text-purple-800">
              <Link href={`/blog/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-700">{p.excerpt}</p>
            {p.date && <p className="mt-1 text-xs text-gray-500">{new Date(p.date).toLocaleDateString()}</p>}
            {Array.isArray(p.tags) && p.tags.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t}>
                    <Link
                      href={`/blog?query=${encodeURIComponent(t)}`}
                      className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700 hover:bg-purple-200"
                    >
                      #{t}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
        {posts.length === 0 && <p className="text-sm text-gray-700">No posts found.</p>}
      </div>

      <Script
        id="ld-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <Script
        id="ld-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
      />
    </div>
  )
}
