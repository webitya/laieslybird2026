import Script from "next/script"
import AboutHero from "@/components/about/hero"
import AboutValues from "@/components/about/values"
import Timeline from "@/components/about/timeline"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "About — LaieslyBird",
  description:
    "LaieslyBird is a resource hub for CEOs and Co‑Founders—roadmaps, tutorials, PDFs, case studies, and whitepapers.",
}

export default async function AboutPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "About", item: `${base}/about` },
    ],
  }
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About LaieslyBird",
    url: `${base}/about`,
    description: "A resource hub for CEOs and Co‑Founders—roadmaps, tutorials, PDFs, case studies, and whitepapers.",
  }
  return (
    <>
      <AboutHero />
      <AboutValues />
      <Timeline />
   
      <Script
        id="ld-breadcrumb-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Script
        id="ld-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
    </>
  )
}
