export default function CareersRoles() {
  const roles = [
    {
      title: "Content Strategist (Leadership)",
      type: "Full‑time",
      location: "Remote",
      id: "content-strategist",
      summary:
        "Own our CEO/Co‑Founder roadmap content: research, structure, and collaborate on world‑class tutorials and PDFs.",
    },
    {
      title: "Video Producer (Tutorials)",
      type: "Contract",
      location: "Remote",
      id: "video-producer",
      summary:
        "Plan and produce tutorial videos with clear narratives, high production value, and actionable insights.",
    },
  ]
  return (
    <section className="mt-10 grid gap-6 md:grid-cols-2">
      {roles.map((r) => (
        <article key={r.id} className="rounded-lg border border-purple-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-purple-800">{r.title}</h3>
          <p className="mt-1 text-sm text-gray-700">{r.summary}</p>
          <p className="mt-2 text-xs text-gray-600">
            {r.type} • {r.location}
          </p>
          <a
            href={`mailto:laieslybird@gmail.com?subject=Application%20—%20${encodeURIComponent(r.title)}`}
            className="mt-3 inline-block rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700"
          >
            Apply via Email
          </a>
        </article>
      ))}
    </section>
  )
}
