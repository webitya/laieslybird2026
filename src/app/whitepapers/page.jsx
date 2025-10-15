export const dynamic = "force-dynamic"
export const revalidate = 0
export const metadata = {
  title: "Whitepapers — Strategy & Execution",
  description: "Download strategic whitepapers for CEOs & Co‑Founders.",
  alternates: { canonical: "/whitepapers" },
}

import Script from "next/script"
import { WHITEPAPERS } from "@/data/resources/whitepapers"

export default function Whitepapers() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Whitepapers",
    url: `${base}/whitepapers`,
    hasPart: WHITEPAPERS.map((p) => ({
      "@type": "TechArticle",
      headline: p.title,
      url: `${base}/whitepapers#${p.slug}`,
      datePublished: p.date ? new Date(p.date).toISOString() : undefined,
    })),
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold text-purple-800">Whitepapers</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {WHITEPAPERS.map((p) => (
          <article key={p.slug} className="rounded-lg border border-purple-200 bg-white p-4">
            <h2 className="font-semibold text-purple-800">{p.title}</h2>
            <p className="text-sm text-gray-700">{p.summary}</p>
            <div className="mt-3">
              <a
                className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700"
                href={p.link}
                download
              >
                Download
              </a>
            </div>
          </article>
        ))}
      </div>
      <Script
        id="ld-whitepapers"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
