import Script from "next/script"
import HomeHero from "@/components/homepage/hero"
import HomeSubscribe from "@/components/homepage/home-subscribe"
import HomeContact from "@/components/homepage/home-contact"
import HomeFeatures from "@/components/homepage/home-features"
import HomeRoadmaps from "@/components/homepage/home-roadmaps"
import HomeTestimonials from "@/components/homepage/home-testimonials"
import HomeFeaturedResources from "@/components/homepage/home-featured-resources"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "CEO & Co‑Founder Roadmaps, Tutorials, PDFs",
  description:
    "Actionable CEO and Co‑Founder roadmaps with videos, PDFs, case studies, whitepapers, and SEO‑friendly blog content.",
}

export default async function Home({ searchParams }) {
  const subscribed = searchParams?.subscribed === "1"
  const contacted = searchParams?.contacted === "1"

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the CEO roadmap?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A structured plan covering strategy, org design, fundraising, hiring, GTM, and execution, tailored for CEOs.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Co‑Founder roadmap?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A tactical path for co‑founders across product, operations, growth, and culture building.",
        },
      },
    ],
  }

  const roadmapListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CEO & Co‑Founder Roadmaps",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "CEO Roadmap: Strategy & Execution",
        url: "/blog/ceo-roadmap-strategy",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Co‑Founder Roadmap: Product & GTM",
        url: "/blog/cofounder-roadmap-gtm",
      },
      { "@type": "ListItem", position: 3, name: "Hiring & Org Design for Founders", url: "/blog/hiring-org-design" },
    ],
  }

  return (
    <>
      <HomeHero />
      <div className="">
        {subscribed && (
          <p className="rounded-md bg-green-50 px-3 py-2 text-green-700">
            Thanks for subscribing! Check your email for a welcome message.
          </p>
        )}
        {contacted && (
          <p className="rounded-md bg-blue-50 px-3 py-2 text-blue-700">
            Thanks for reaching out! We’ll get back to you soon.
          </p>
        )}
      </div>
      <section className="">
        <HomeFeatures />
      </section>
      <section className="">
        <HomeRoadmaps />
      </section>
      <section className="">
        <HomeFeaturedResources />
      </section>
      <section className="grid gap-8 md:grid-cols-2">
        <HomeSubscribe />
        <HomeContact />
      </section>
      <section className="mt-12">
        <HomeTestimonials />
      </section>
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Script
        id="ld-roadmaps"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roadmapListJsonLd) }}
      />
    </>
  )
}
