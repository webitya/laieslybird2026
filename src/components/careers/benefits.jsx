import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone"
import DevicesIcon from "@mui/icons-material/Devices"

export default function Benefits() {
  const items = [
    {
      icon: <FavoriteTwoToneIcon className="text-purple-600" />,
      title: "Health & wellness",
      text: "Comprehensive medical, dental, and mental health support.",
    },
    {
      icon: <DevicesIcon className="text-purple-600" />,
      title: "Remote‑first",
      text: "Build from anywhere with async collaboration and autonomy.",
    },
  ]
  return (
    <section className="w-full bg-purple-50 py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-800">Benefits</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {items.map((i) => (
            <div key={i.title} className="rounded-xl border border-purple-200 bg-white p-6">
              {i.icon}
              <h3 className="mt-2 text-lg font-semibold text-purple-900">{i.title}</h3>
              <p className="mt-2 text-purple-800/90">{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
