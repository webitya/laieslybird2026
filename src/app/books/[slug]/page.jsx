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
    <div className="">
  

      {/* 👇 Client-side PDF Viewer */}
      <PDFViewer pdfUrl={item.pdfUrl} />

   

      <Script id="ld-books-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="ld-book" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  )
}
