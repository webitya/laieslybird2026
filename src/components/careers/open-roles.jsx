import WorkOutlineIcon from "@mui/icons-material/WorkOutline"

export default function OpenRoles() {
  const roles = [
    { title: "Content Strategist (SEO)", type: "Full‑time", location: "Remote", link: "#" },
    { title: "Video Producer", type: "Contract", location: "Remote", link: "#" },
  ]
  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-purple-800">
          <WorkOutlineIcon className="text-purple-600" /> Open roles
        </h2>
        <div className="mt-6 space-y-4">
          {roles.map((r) => (
            <a
              key={r.title}
              href={r.link}
              className="block rounded-xl border border-purple-200 bg-purple-50 p-5 hover:bg-purple-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-purple-900">{r.title}</h3>
                  <p className="text-sm text-purple-700/80">
                    {r.type} • {r.location}
                  </p>
                </div>
                <span className="text-purple-700/80">Apply →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
