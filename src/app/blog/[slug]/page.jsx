import { BLOG_POSTS } from "@/data/blog/posts"
import Script from "next/script"
import { notFound } from "next/navigation"
import Link from "next/link"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata({ params }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://.com"
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) return { title: "Not found" }
  const title = post.title
  const description = post.excerpt || ""
  const images = post.heroImage ? [post.heroImage] : undefined
  return {
    title,
    description,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: { type: "article", url: `${base}/blog/${params.slug}`, title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  }
}

export default async function BlogPost({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://laieslybird.com"
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${base}/blog/${params.slug}` },
    ],
  }

  const articleBody = (post.content || [])
    .map((b) => {
      if (b.type === "paragraph") return b.text || ""
      if (b.type === "bullets") return (b.items || []).join(". ")
      return ""
    })
    .filter(Boolean)
    .join("\n\n")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || "",
    datePublished: post.date ? new Date(post.date).toISOString() : undefined,
    author: [{ "@type": "Person", name: post.author || "LaieslyBird" }],
    publisher: { "@type": "Organization", name: "LaieslyBird" },
    mainEntityOfPage: `${base}/blog/${params.slug}`,
    image: post.heroImage ? [post.heroImage] : undefined,
    keywords: Array.isArray(post.tags) ? post.tags.join(", ") : undefined,
    articleBody,
  }

  const renderBlock = (block, idx) => {
    if (block.type === "paragraph") {
      return (
        <p key={idx} className="my-4 text-gray-800">
          {block.text}
          {Array.isArray(block.links) && block.links.length > 0 && (
            <>
              {" "}
              {block.links.map((l, i) => (
                <a key={i} className="text-purple-700 underline hover:text-purple-800" href={l.href}>
                  {l.label}
                </a>
              ))}
            </>
          )}
        </p>
      )
    }
    if (block.type === "bullets") {
      return (
        <ul key={idx} className="my-4 list-disc pl-6 text-gray-800">
          {(block.items || []).map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )
    }
    if (block.type === "image") {
      return (
        <figure key={idx} className="my-6">
          <img
            className="w-full rounded-lg border border-purple-200"
            src={block.src || "/placeholder.svg"}
            alt={block.alt || ""}
          />
          {block.alt && <figcaption className="mt-2 text-center text-xs text-gray-500">{block.alt}</figcaption>}
        </figure>
      )
    }
    return null
  }

  const idx = BLOG_POSTS.findIndex((p) => p.slug === params.slug)
  const prev = idx > 0 ? BLOG_POSTS[idx - 1] : null
  const next = idx < BLOG_POSTS.length - 1 ? BLOG_POSTS[idx + 1] : null

  return (
    <article className="max-w-none">
      <h1 className="text-3xl font-bold text-purple-900 text-balance">{post.title}</h1>
      {post.date && <p className="mt-1 text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</p>}

      <div className="prose max-w-none prose-headings:text-purple-800 prose-a:text-purple-700 mt-6">
        {(post.content || []).map((b, i) => renderBlock(b, i))}
      </div>

      <p className="mt-8 text-sm">
        <Link className="text-purple-700 hover:underline" href="/blog">
          ← Back to Blog
        </Link>
      </p>

      <nav className="mt-10 flex items-center justify-between border-t border-purple-200 pt-6 text-sm">
        <span>
          {prev && (
            <Link className="text-purple-700 hover:underline" href={`/blog/${prev.slug}`}>
              ← {prev.title}
            </Link>
          )}
        </span>
        <span>
          {next && (
            <Link className="text-purple-700 hover:underline" href={`/blog/${next.slug}`}>
              {next.title} →
            </Link>
          )}
        </span>
      </nav>

      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script
        id="ld-breadcrumb-post"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </article>
  )
}
