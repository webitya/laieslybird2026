import Script from "next/script"
import CareersHero from "@/components/careers/hero"
import CareersRoles from "@/components/careers/roles"
import Benefits from "@/components/careers/benefits"
import OpenRoles from "@/components/careers/open-roles"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "Careers — LaieslyBird",
  description: "Join LaieslyBird to craft the best CEO and Co‑Founder education on the web.",
}

export default async function CareersPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://laieslybid.com"
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Careers", item: `${base}/careers` },
    ],
  }
  const jobsJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: "Content Strategist (Leadership)",
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: "LaieslyBird",
        sameAs: base,
      },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: { "@type": "Country", name: "Worldwide" },
      description:
        "Own our CEO/Co‑Founder roadmap content: research, structure, and collaborate on world‑class tutorials and PDFs.",
      validThrough: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    },
    {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: "Video Producer (Tutorials)",
      employmentType: "CONTRACTOR",
      hiringOrganization: {
        "@type": "Organization",
        name: "LaieslyBird",
        sameAs: base,
      },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: { "@type": "Country", name: "Worldwide" },
      description:
        "Plan and produce tutorial videos with clear narratives, high production value, and actionable insights.",
      validThrough: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    },
  ]

  return (
    <>
      <CareersHero />
      <CareersRoles />
      <Benefits />
      <OpenRoles />
      <Script
        id="ld-breadcrumb-careers"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Script
        id="ld-jobs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsJsonLd) }}
      />
    </>
  )
}
