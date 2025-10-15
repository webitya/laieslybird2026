import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import MovieIcon from "@mui/icons-material/Movie"
import DescriptionIcon from "@mui/icons-material/Description"
import Link from "next/link"

export default function HomeFeaturedResources() {
  const cards = [
    {
      href: "/videos",
      title: "Video Tutorials",
      desc: "Bite‑size strategy lessons for CEOs & Co‑Founders.",
      icon: <MovieIcon className="text-purple-600" />,
    },
    {
      href: "/books",
      title: "Books & PDFs",
      desc: "Curated playbooks you can read or download.",
      icon: <PictureAsPdfIcon className="text-purple-600" />,
    },
    {
      href: "/blog",
      title: "SEO Blog",
      desc: "In‑depth analysis to rank and learn fast.",
      icon: <DescriptionIcon className="text-purple-600" />,
    },
  ]
  return (
    <section className="w-full bg-purple-50 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-800">Featured resources</h2>
          <p className="mt-2 text-purple-700/80">Start with the most impactful content for leaders.</p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-xl border border-purple-200 bg-white p-6 shadow-sm hover:shadow"
            >
              <div>{c.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-purple-900 group-hover:underline">{c.title}</h3>
              <p className="mt-2 text-purple-800/90">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
