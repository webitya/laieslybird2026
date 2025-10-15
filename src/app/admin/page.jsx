import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const metadata = { title: "Admin Dashboard" }

async function getData() {
  const database = await db()
  const [subs, contacts] = await Promise.all([
    database
      .collection("subscribers")
      .find({}, { projection: { name: 1, email: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray(),
    database
      .collection("contacts")
      .find({}, { projection: { name: 1, email: 1, message: 1, status: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray(),
  ])
  return { subs, contacts }
}

export default async function Admin() {
  const isAdmin = cookies().get("laieslybird_admin")?.value === "1"
  if (!isAdmin) redirect("/admin/login")

  const { subs, contacts } = await getData()

  return (
    <div className="grid gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-800">Admin Dashboard</h1>
        <form method="POST" action="/api/admin/logout">
          <button className="rounded-md border border-purple-300 px-3 py-2 text-sm text-purple-700 hover:bg-purple-100">
            Logout
          </button>
        </form>
      </div>

      <section className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-purple-800">Latest Subscribers</h2>
          <a
            className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700"
            href="/api/admin/export-subscribers"
          >
            Download CSV
          </a>
        </div>
        <div className="overflow-x-auto rounded-lg border border-purple-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-purple-50 text-purple-800">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s, i) => (
                <tr key={i} className="border-t border-purple-100">
                  <td className="px-3 py-2">{s.name || "-"}</td>
                  <td className="px-3 py-2">{s.email}</td>
                  <td className="px-3 py-2">{s.createdAt ? new Date(s.createdAt).toLocaleString() : "-"}</td>
                </tr>
              ))}
              {subs.length === 0 && (
                <tr>
                  <td className="px-3 py-4 text-gray-700" colSpan={3}>
                    No subscribers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-purple-800">Recent Contacts</h2>
          <a
            className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700"
            href="/api/admin/export-contacts"
          >
            Download CSV
          </a>
        </div>
        <div className="overflow-x-auto rounded-lg border border-purple-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-purple-50 text-purple-800">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Message</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={i} className="border-t border-purple-100 align-top">
                  <td className="px-3 py-2">{c.name || "-"}</td>
                  <td className="px-3 py-2">{c.email}</td>
                  <td className="px-3 py-2 whitespace-pre-wrap">{c.message}</td>
                  <td className="px-3 py-2">
                    <form method="POST" action="/api/admin/update-status" className="flex items-center gap-2">
                      <input type="hidden" name="id" value={c._id?.toString?.() || ""} />
                      <select
                        name="status"
                        defaultValue={c.status || "pending"}
                        className="rounded-md border border-purple-300 px-2 py-1 text-xs"
                      >
                        <option>pending</option>
                        <option>replied</option>
                        <option>resolved</option>
                      </select>
                      <button className="rounded-md bg-purple-600 px-2 py-1 text-xs text-white hover:bg-purple-700">
                        Save
                      </button>
                    </form>
                  </td>
                  <td className="px-3 py-2">
                    <form method="POST" action="/api/admin/reply-email" className="grid gap-2">
                      <input type="hidden" name="to" defaultValue={c.email} />
                      <input
                        name="subject"
                        required
                        placeholder="Subject"
                        className="rounded-md border border-purple-300 px-2 py-1 text-xs"
                      />
                      <textarea
                        name="html"
                        required
                        placeholder="Message (HTML allowed)"
                        className="min-h-20 rounded-md border border-purple-300 px-2 py-1 text-xs"
                      />
                      <button className="rounded-md border border-purple-300 px-2 py-1 text-xs text-purple-700 hover:bg-purple-100">
                        Send
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td className="px-3 py-4 text-gray-700" colSpan={5}>
                    No contacts yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
