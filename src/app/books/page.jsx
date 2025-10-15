import { MenuBook } from "@mui/icons-material"
import Link from "next/link"
import Script from "next/script"
import { books } from "@/data/books/books"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const metadata = {
  title: "Books (PDF) — CEO & Co‑Founder",
  description: "Read PDFs in‑browser or download.",
}

export default function Books() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: books.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${base}/books/${b.slug}`,
      name: b.title,
    })),
  }
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
        <MenuBook /> Books (PDF)
      </h1>
      <ul className="grid gap-4 md:grid-cols-2">
        {books.map((p) => (
          <li key={p.slug} className="rounded-lg border border-purple-200 bg-white p-4">
            <h2 className="font-semibold text-purple-800">{p.title}</h2>
            <p className="mt-1 text-sm text-purple-700/80">{p.description}</p>
            <div className="mt-3 flex items-center gap-2">
              <Link
                className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700"
                href={`/books/${p.slug}`}
              >
                Open
              </Link>
              <a
                className="rounded-md border border-purple-300 px-3 py-2 text-sm text-purple-700 hover:bg-purple-100"
                href={p.pdfUrl}
                download
              >
                Download
              </a>
            </div>
          </li>
        ))}
      </ul>
      <Script id="ld-books" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <p className="text-sm text-gray-600">Place your PDFs under public/pdfs/ to enable viewing/downloading.</p>
    </div>
  )
}
