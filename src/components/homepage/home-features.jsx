import { AutoGraph, Timeline, Insights } from "@mui/icons-material"

export default function HomeFeatures() {
  return (
    <section aria-labelledby="features-title" className="rounded-lg border border-purple-200 bg-white p-5">
      <h2 id="features-title" className="text-xl font-semibold text-purple-800">
        Built for CEOs & Co‑Founders
      </h2>
      <p className="mt-1 text-sm text-gray-700">
        Actionable roadmaps, real case studies, and step‑by‑step tutorials that help you ship faster and lead smarter.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-purple-100 p-4">
          <div className="mb-2 flex items-center gap-2 text-purple-700">
            <AutoGraph fontSize="small" />
            <span className="font-medium">Strategy → Results</span>
          </div>
          <p className="text-sm text-gray-700">Turn vision into measurable outcomes using proven CEO frameworks.</p>
        </div>
        <div className="rounded-md border border-purple-100 p-4">
          <div className="mb-2 flex items-center gap-2 text-purple-700">
            <Timeline fontSize="small" />
            <span className="font-medium">Roadmaps that Scale</span>
          </div>
          <p className="text-sm text-gray-700">30‑60‑90 plans, hiring, org design, and GTM checklists for leaders.</p>
        </div>
        <div className="rounded-md border border-purple-100 p-4">
          <div className="mb-2 flex items-center gap-2 text-purple-700">
            <Insights fontSize="small" />
            <span className="font-medium">Case Studies & PDFs</span>
          </div>
          <p className="text-sm text-gray-700">Downloadable playbooks and whitepapers to share with your team.</p>
        </div>
      </div>
      <div className="mt-6">
        <a
          href="/blog"
          className="inline-block rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          Explore the Blog
        </a>
      </div>
    </section>
  )
}
