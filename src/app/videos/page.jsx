import Script from "next/script"
import VideosClient from "./VideosClient"
import { VIDEOS } from "@/data/videos/videos"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata() {
  const title = "Video Tutorials | LaieslyBird"
  const description =
    "Curated video tutorials for CEOs, Co‑Founders, and English learners to master leadership, growth, and language skills."

  const url = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/videos`
    : "https://example.com/videos"

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

export default function VideosPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Video Tutorials — CEO & Co‑Founder",
    url: `${base}/videos`,
    hasPart: VIDEOS.map((v) => ({
      "@type": "VideoObject",
      name: v.title,
      description: v.description,
      thumbnailUrl: [v.thumbnail],
      uploadDate: new Date().toISOString(),
      embedUrl: v.url,
      duration: v.duration,
    })),
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-purple-800 flex items-center gap-2">
          📹 Video Tutorials
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Curated video tutorials for CEOs, Co‑Founders, and English learners to master leadership, growth, and language skills.
        </p>
      </header>

      {/* Client-side interactive component */}
      <VideosClient videos={VIDEOS} />

      {/* JSON-LD structured data */}
      <Script
        id="ld-videos"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
    </div>
  )
}
