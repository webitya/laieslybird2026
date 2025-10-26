import "./globals.css"
import Link from "next/link"
import Script from "next/script"
import Navbar from "../components/navigation/navbar"
import VisitorTracker from "../components/visitor-tracker"
import Footer from "@/components/navigation/footer"

export const dynamic = "force-dynamic"

const siteName = "LaieslyBird"
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://laieslybird.com"
const brandEmail = "laieslybird@gmail.com"

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | LaieslyBird",
    default:
      "LaieslyBird — CEO & Co-Founder Roadmaps, Tutorials, PDFs, Case Studies",
  },
  description:
    "LaieslyBird provides CEO and Co-Founder roadmaps, video tutorials, PDF books, case studies, whitepapers, and SEO-friendly insights to accelerate your leadership journey.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "LaieslyBird — CEO & Co-Founder Roadmaps",
    description:
      "Roadmaps, tutorials, PDFs, case studies, whitepapers, and blogs for CEOs & Co-Founders.",
    url: siteUrl,
    siteName: siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaieslyBird — CEO & Co-Founder Roadmaps",
    description:
      "Roadmaps, tutorials, PDFs, case studies, whitepapers, and blogs for CEOs & Co-Founders.",
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
    sameAs: [],
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
      <head>
        {/* ✅ Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4GMZ9DEBFC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4GMZ9DEBFC');
          `}
        </Script>

        {/* ✅ Microsoft Clarity Tracking */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "twcuvhzmln");
          `}
        </Script>
      </head>

      <body className="min-h-screen bg-purple-50 text-gray-900 antialiased">
        <VisitorTracker />
        <Navbar />
        <main>{children}</main>
        <Footer />

        {/* ✅ Structured Data (SEO JSON-LD) */}
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
