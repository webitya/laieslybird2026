import "./globals.css"
import Link from "next/link"
import Script from "next/script"
import Navbar from "../components/navigation/navbar"
import Logo from "@/components/navigation/logo"
import Footer from "@/components/navigation/footer"

export const dynamic = "force-dynamic"

const siteName = "LaieslyBird"
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
const brandEmail = "laieslybird@gmail.com"

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | LaieslyBird",
    default: "LaieslyBird — CEO & Co‑Founder Roadmaps, Tutorials, PDFs, Case Studies",
  },
  description:
    "LaieslyBird provides CEO and Co‑Founder roadmaps, video tutorials, PDF books, case studies, whitepapers, and SEO‑friendly insights to accelerate your leadership journey.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "LaieslyBird — CEO & Co‑Founder Roadmaps",
    description: "Roadmaps, tutorials, PDFs, case studies, whitepapers, and blogs for CEOs & Co‑Founders.",
    url: siteUrl,
    siteName: siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaieslyBird — CEO & Co‑Founder Roadmaps",
    description: "Roadmaps, tutorials, PDFs, case studies, whitepapers, and blogs for CEOs & Co‑Founders.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    email: brandEmail,
    logo: `${siteUrl}/placeholder-logo.png`,
    sameAs: [
      // add your social links here for better E-E-A-T
    ],
  }
  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: siteName,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-purple-50 text-gray-900 antialiased">

              <Navbar />

    

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        {/* Footer */}
    <Footer/>

        {/* JSON-LD for Organization & WebSite */}
        <Script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </body>
    </html>
  )
}
