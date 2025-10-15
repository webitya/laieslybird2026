import { ArrowForward } from "@mui/icons-material"

export default function HomeCta() {
  return (
    <section className="rounded-lg border border-purple-200 bg-purple-50 p-5">
      <h2 className="text-xl font-semibold text-purple-900">Start your leadership roadmap today</h2>
      <p className="mt-1 text-sm text-purple-900/80">
        Follow curated tracks for CEOs and Co‑Founders. Watch tutorials, read case studies, and download PDFs.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href="/videos"
          className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          Watch Tutorials <ArrowForward fontSize="small" />
        </a>
        <a
          href="/books"
          className="inline-flex items-center gap-2 rounded-md border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50"
        >
          Download PDFs <ArrowForward fontSize="small" />
        </a>
        <a
          href="/case-studies"
          className="inline-flex items-center gap-2 rounded-md border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50"
        >
          Case Studies <ArrowForward fontSize="small" />
        </a>
      </div>
    </section>
  )
}
