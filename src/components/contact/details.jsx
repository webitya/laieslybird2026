import { Email, LocationOn } from "@mui/icons-material"

export default function ContactDetails() {
  return (
    <section className="mt-10 grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border border-purple-200 bg-white p-5">
        <h3 className="font-semibold text-purple-800">Email</h3>
        <p className="mt-1 flex items-center gap-2 text-sm text-gray-700">
          <Email fontSize="small" className="text-purple-600" />
          <a href="mailto:laieslybird@gmail.com" className="text-purple-700 underline">
            laieslybird@gmail.com
          </a>
        </p>
      </div>
      <div className="rounded-lg border border-purple-200 bg-white p-5">
        <h3 className="font-semibold text-purple-800">Location</h3>
        <p className="mt-1 flex items-center gap-2 text-sm text-gray-700">
          <LocationOn fontSize="small" className="text-purple-600" />
          Remote‑first
        </p>
      </div>
    </section>
  )
}
