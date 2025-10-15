export default function ContactFAQ() {
  const faqs = [
    { q: "How soon do you reply?", a: "We typically respond within 24–48 hours on weekdays." },
    { q: "Do you support startups?", a: "Yes—our roadmaps and content are designed for early‑stage teams." },
    {
      q: "Can I request a topic?",
      a: "Absolutely. Send it via the contact form and we’ll prioritize popular requests.",
    },
  ]
  return (
    <section className="w-full bg-purple-50 py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-800">Frequently asked questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-lg border border-purple-200 bg-white p-4">
              <h3 className="font-semibold text-purple-900">{f.q}</h3>
              <p className="mt-2 text-purple-800/90">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
