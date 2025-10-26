import ContactForm from "@/components/contact-form"
import ContactFAQ from "@/components/contact/faq"
import Script from "next/script"


export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "Contact — LaieslyBird",
  description: "Contact LaieslyBird for partnerships, collaborations, or expert guidance.",
}

export default function ContactPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://laieslybird.com"

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${base}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "LaieslyBird",
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "laieslybird@gmail.com",
          contactType: "Customer Support",
          availableLanguage: ["English"],
        },
      ],
    },
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${base}/contact` },
    ],
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-500 to-purple-400 p-[1px] shadow-xl">
        <div className="relative z-10  bg-white/20 backdrop-blur-xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold">Get in Touch with LaieslyBird</h1>
            <p className="text-white/90 text-sm md:text-base">
              Have questions about leadership programs, collaborations, or custom strategies?  
              Fill out the form — we’ll respond within 24 hours.
            </p>
          </div>

          {/* Client Components */}
          <ContactForm/>
          <div className="mt-12">
            <ContactFAQ/>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300/20 via-transparent to-purple-800/30 mix-blend-overlay pointer-events-none" />
      </section>

      {/* JSON-LD SEO */}
      <Script
        id="ld-breadcrumb-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Script
        id="ld-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
    </>
  )
}
