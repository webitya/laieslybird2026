export const dynamic = "force-dynamic"
export const revalidate = 0
export const metadata = {
  title: "Case Studies — Leadership & Growth",
  description: "Real-world leadership, GTM, ops, and product case studies.",
  alternates: { canonical: "/case-studies" },
}

import Script from "next/script"
import { CASE_STUDIES } from "@/data/resources/case-studies"

export default function CaseStudies() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://laieslybird.com"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Case Studies",
    url: `${base}/case-studies`,
    hasPart: CASE_STUDIES.map((c) => ({
      "@type": "CreativeWork",
      name: c.title,
      url: `${base}/case-studies#${c.slug}`,
      datePublished: c.date ? new Date(c.date).toISOString() : undefined,
    })),
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold text-purple-800">Case Studies</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {CASE_STUDIES.map((c) => (
          <article key={c.slug} className="rounded-lg border border-purple-200 bg-white p-4">
            <h2 className="font-semibold text-purple-800">{c.title}</h2>
            <p className="text-sm text-gray-700">{c.summary}</p>
            <div className="mt-3">
              <a className="text-sm text-purple-700 underline hover:text-purple-800" href={c.link}>
                Download PDF
              </a>
            </div>
          </article>
        ))}
      </div>
      <Script
        id="ld-case-studies"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
