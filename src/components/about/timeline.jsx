import TimelineIcon from "@mui/icons-material/Timeline"

export default function Timeline() {
  const items = [
    { year: "2023", text: "LaieslyBird launched to help founders move faster." },
    { year: "2024", text: "Added video tutorials, books dashboard, and admin tools." },
    { year: "2025", text: "Expanded CEO & Co‑Founder roadmaps with case studies." },
  ]
  return (
    <section className="w-full bg-purple-50 py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-purple-800">
          <TimelineIcon className="text-purple-600" /> Our journey
        </h2>
        <ol className="mt-6 space-y-4">
          {items.map((i) => (
            <li key={i.year} className="rounded-lg border border-purple-200 bg-white p-4">
              <div className="text-sm text-purple-700/80">{i.year}</div>
              <div className="text-purple-900">{i.text}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
