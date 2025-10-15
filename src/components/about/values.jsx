export default function AboutValues() {
  const values = [
    { title: "Clarity", desc: "Distill complex topics into clear, actionable steps." },
    { title: "Impact", desc: "Bias toward execution and measurable outcomes." },
    { title: "Depth", desc: "Go beyond surface advice with case studies and templates." },
  ]
  return (
    <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {values.map((v) => (
        <div key={v.title} className="rounded-lg border border-purple-200 bg-white p-5">
          <h3 className="font-semibold text-purple-800">{v.title}</h3>
          <p className="mt-1 text-sm text-gray-700">{v.desc}</p>
        </div>
      ))}
    </section>
  )
}
