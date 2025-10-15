import { VideoLibrary } from "@mui/icons-material"
import Script from "next/script"
import { VIDEOS } from "@/data/videos/videos"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const metadata = {
  title: "Video Tutorials — CEO & Co‑Founder",
  description: "Curated tutorials for CEOs and Co‑Founders with filters.",
  alternates: { canonical: "/videos" },
  openGraph: {
    type: "website",
    title: "Video Tutorials — CEO & Co‑Founder",
    description: "Curated tutorials for CEOs and Co‑Founders with filters.",
    url: (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com") + "/videos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Tutorials — CEO & Co‑Founder",
    description: "Curated tutorials for CEOs and Co‑Founders with filters.",
  },
}

export default async function Videos({ searchParams }) {
  const cat = (searchParams?.category || "All").toString()
  const items = cat === "All" ? VIDEOS : VIDEOS.filter((v) => v.category === cat)
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Video Tutorials — CEO & Co‑Founder",
    url: `${base}/videos`,
    hasPart: items.map((v) => ({
      "@type": "VideoObject",
      name: v.title,
      description: `${v.title} tutorial`,
      thumbnailUrl: [`${base}/placeholder.svg?height=360&width=640&query=video-thumbnail`],
      uploadDate: new Date().toISOString(),
      embedUrl: v.url,
    })),
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
          <VideoLibrary /> Videos
        </h1>
        <form className="flex items-center gap-2" method="GET">
          <label htmlFor="category" className="text-sm text-gray-700">
            Filter
          </label>
          <select
            id="category"
            name="category"
            defaultValue={cat}
            className="rounded-md border border-purple-300 px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>CEO</option>
            <option>Co‑Founder</option>
          </select>
          <button className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700">Apply</button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((v) => (
          <article key={v.id} className="overflow-hidden rounded-lg border border-purple-200 bg-white">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={v.url}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-purple-800">{v.title}</h2>
              <p className="text-sm text-gray-600">{v.category}</p>
            </div>
          </article>
        ))}
      </div>
      <Script
        id="ld-videos"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
    </div>
  )
}
