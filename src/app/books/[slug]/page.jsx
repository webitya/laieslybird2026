import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import { books } from "@/data/books/books"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata({ params }) {
  const item = books.find((b) => b.slug === params.slug)
  if (!item) return { title: "Not found" }
  return {
    title: `${item.title} (PDF)`,
    description: `Read ${item.title} PDF online or download.`,
  }
}

export default function BookViewer({ params }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const item = books.find((b) => b.slug === params.slug)
  if (!item) return notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    url: `${base}/books/${item.slug}`,
    about: item.topics,
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
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold text-purple-800">{item.title}</h1>
      <div className="overflow-hidden rounded-lg border border-purple-200 bg-white">
        <object data={`${item.pdfUrl}#zoom=page-fit`} type="application/pdf" className="h-[80vh] w-full">
          <p className="p-4 text-sm text-gray-700">
            PDF viewer not supported.{" "}
            <a className="text-purple-700 underline" href={item.pdfUrl} download>
              Download the PDF
            </a>
            .
          </p>
        </object>
      </div>
      <div>
        <Link href={item.pdfUrl} download className="text-purple-700 underline">
          Download {item.title}
        </Link>
      </div>
      <Script
        id="ld-books-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Script id="ld-book" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  )
}
