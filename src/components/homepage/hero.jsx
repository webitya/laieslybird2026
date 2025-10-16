import { VideoLibrary, MenuBook } from "@mui/icons-material"
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded"

export default function HomeHero() {
  return (
    <section className="grid gap-8 md:grid-cols-2 md:items-center">
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-3 py-1 shadow-sm">
          <RocketLaunchRoundedIcon className="text-purple-600" fontSize="small" />
          <span className="text-xs font-medium text-purple-700">2025 Roadmaps • CEOs & Co‑Founders</span>
        </div>
        <h1 className="text-balance text-3xl font-bold text-purple-800 md:text-4xl">
          Level up as a CEO or Co‑Founder with curated roadmaps and tutorials
        </h1>
        <p className="text-pretty text-gray-700">
          LaieslyBird brings you step‑by‑step roadmaps, video tutorials, PDF books, case studies, whitepapers, and an
          SEO‑friendly blog designed to help you lead with clarity.
        </p>
        <p className="text-sm text-purple-700">
          Practical roadmaps for leaders in fast‑moving tech — curated by LaieslyBird.
        </p>
        <ul className="mt-2 flex flex-wrap items-center gap-2">
          <li className="rounded-full border border-purple-200 bg-white px-2.5 py-1 text-xs font-medium text-purple-700">
            {"AI‑Readable Content"}
          </li>
          <li className="rounded-full border border-purple-200 bg-white px-2.5 py-1 text-xs font-medium text-purple-700">
            {"SEO‑Optimized JSON‑LD"}
          </li>
          <li className="rounded-full border border-purple-200 bg-white px-2.5 py-1 text-xs font-medium text-purple-700">
            {"SSR by default"}
          </li>
        </ul>
        <div className="flex flex-wrap gap-3">
          <a
            href="/videos"
            className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-white shadow-sm hover:bg-purple-700"
          >
            <VideoLibrary fontSize="small" /> Watch Tutorials
          </a>
          <a
            href="/books"
            className="inline-flex items-center gap-2 rounded-md border border-purple-300 bg-white px-4 py-2 text-purple-700 shadow-sm hover:bg-purple-100"
          >
            <MenuBook fontSize="small" /> Read PDFs
          </a>
        </div>
      </div>
      <div className="rounded-xl border border-purple-200 bg-white p-6 shadow-sm">
        <ul className="grid gap-3">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 h-5 w-5 rounded bg-purple-100 ring-1 ring-purple-200" aria-hidden />
            <div>
              <h3 className="font-semibold text-purple-800">CEO Roadmap</h3>
              <p className="text-sm text-gray-700">Strategy, execution, org design, and growth frameworks.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 h-5 w-5 rounded bg-purple-100 ring-1 ring-purple-200" aria-hidden />
            <div>
              <h3 className="font-semibold text-purple-800">Co‑Founder Roadmap</h3>
              <p className="text-sm text-gray-700">Product, team, operations, GTM, fundraising playbooks.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 h-5 w-5 rounded bg-purple-100 ring-1 ring-purple-200" aria-hidden />
            <div>
              <h3 className="font-semibold text-purple-800">SEO‑friendly Blog</h3>
              <p className="text-sm text-gray-700">Deep dives, case studies, whitepapers, and templates.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
