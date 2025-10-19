import Script from "next/script"
import { books } from "@/data/books/books"
import BooksClient from "./BooksClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

// ✅ Server-side metadata (visible to crawlers)
export async function generateMetadata() {
  const title = "Books (PDF) | LaieslyBird"
  const description =
    "Curated books for CEOs, Co-Founders, and English learners to master leadership, growth, and language skills. Browse and read free PDF books online."

  const url = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/books`
    : "https://example.com/books"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "LaieslyBird",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default function BooksPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Books (PDF)",
    description:
      "Curated PDF books for CEOs, founders, and learners to improve leadership, business, and English skills.",
    itemListElement: books.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${base}/books/${b.slug}`,
      name: b.title,
    })),
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* SEO-friendly heading & description */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-purple-800 flex items-center gap-2 mb-2">
        Books
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Curated books for CEOs, Co-Founders, and English learners to master leadership,
          growth, and communication skills.
        </p>
      </header>

      {/* Client-side interactivity (search, filters, pagination) */}
      <BooksClient books={books} />

      {/* JSON-LD schema injected server-side */}
      <Script
        id="ld-books"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
