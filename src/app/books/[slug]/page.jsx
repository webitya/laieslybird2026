import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import { books } from "@/data/books/books"
import PDFViewer from "./PDFViewer" // 👈 import client component

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata({ params }) {
  const item = books.find((b) => b.slug === params.slug)
  if (!item) return { title: "Not found" }
  return {
    title: `${item.title} (PDF) | LaieslyBird`,
    description: `Read ${item.title} PDF online or download.`,
  }
}

export default function BookViewer({ params }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const item = books.find((b) => b.slug === params.slug)
  if (!item) return notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: item.title,
    url: `${base}/books/${item.slug}`,
    description: item.description,
    encoding: {
      "@type": "MediaObject",
      contentUrl: `${base}${item.pdfUrl}`,
      encodingFormat: "application/pdf",
    },
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Books", item: `${base}/books` },
      { "@type": "ListItem", position: 3, name: item.title, item: `${base}/books/${item.slug}` },
    ],
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6">
      <h1 className="text-3xl font-bold text-purple-800">{item.title}</h1>

      {/* 👇 Client-side PDF Viewer */}
      <PDFViewer pdfUrl={item.pdfUrl} />

      <div>
        <Link
          href={item.pdfUrl}
          download
          className="inline-block mt-2 text-purple-700 underline hover:text-purple-900 transition-colors"
        >
          Download {item.title}
        </Link>
      </div>

      <Script id="ld-books-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="ld-book" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  )
}
