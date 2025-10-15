import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"

export default function Leadership() {
  const leaders = [
    { name: "Avery Chen", role: "CEO", bio: "Operator‑founder focused on velocity and outcomes." },
    { name: "Marco Diaz", role: "Co‑Founder", bio: "Product leader who turns insights into action." },
  ]
  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-800">Leadership</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {leaders.map((l) => (
            <div key={l.name} className="rounded-xl border border-purple-200 bg-purple-50 p-6">
              <VerifiedUserIcon className="text-purple-600" />
              <h3 className="mt-2 text-lg font-semibold text-purple-900">{l.name}</h3>
              <p className="text-sm text-purple-700/80">{l.role}</p>
              <p className="mt-2 text-purple-900">{l.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
