import Script from "next/script"
import ContactHero from "@/components/contact/hero"
import ContactDetails from "@/components/contact/details"
import ContactForm from "@/components/contact-form"
import ContactFAQ from "@/components/contact/faq"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "Contact — LaieslyBird",
  description: "Contact LaieslyBird for questions, partnerships, or media. Expect an expert, timely response.",
}

export default async function ContactPage() {
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
          contactType: "customer support",
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
      <ContactHero />
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-purple-200 bg-white p-5">
          <h2 className="mb-3 text-xl font-semibold text-purple-800">Send us a message</h2>
          <ContactForm />
        </div>
        <ContactDetails />
      </div>
      <div className="mt-12">
        <ContactFAQ />
      </div>
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
