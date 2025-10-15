import StarPurple500Icon from "@mui/icons-material/StarPurple500"

export default function HomeTestimonials() {
  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-800">Leaders who trust LaieslyBird</h2>
          <p className="mt-2 text-purple-700/80">Real outcomes from CEOs and Co‑Founders using our roadmaps.</p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Amelia, CEO", quote: "Doubled qualified pipeline in 90 days.", role: "B2B SaaS" },
            { name: "Ravi, Co‑Founder", quote: "Clear focus unlocked our PMF.", role: "Fintech" },
            { name: "Lena, COO", quote: "Hired our first 10 with confidence.", role: "Marketplace" },
          ].map((t) => (
            <figure key={t.name} className="rounded-xl border border-purple-200 bg-purple-50 p-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarPurple500Icon key={i} className="h-5 w-5 text-purple-600" />
                ))}
              </div>
              <blockquote className="mt-3 text-purple-900">{t.quote}</blockquote>
              <figcaption className="mt-2 text-sm text-purple-700/80">
                {t.name} • {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
