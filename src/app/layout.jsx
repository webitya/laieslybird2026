import "./globals.css"
import Link from "next/link"
import Script from "next/script"
import Navbar from "../components/navigation/navbar"

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
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-purple-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <img src="/laieslybird-logo-mark.jpg" alt="LaieslyBird logo" className="h-8 w-8 rounded-md" />
                <span className="text-lg font-semibold text-purple-700">LaieslyBird</span>
              </Link>
              <Navbar />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        {/* Footer */}
        <footer className="mt-16 border-t border-purple-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-pretty">© {new Date().getFullYear()} LaieslyBird. All rights reserved.</p>
              <p>
                Contact:{" "}
                <a className="text-purple-700 hover:underline" href="mailto:laieslybird@gmail.com">
                  laieslybird@gmail.com
                </a>
              </p>
            </div>
          </div>
        </footer>

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
