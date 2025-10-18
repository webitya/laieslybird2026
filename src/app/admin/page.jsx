"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ReplyModal from "@/components/admin/reply-modal"
import Pagination from "@/components/admin/pagination"
import DashboardHeader from "@/components/admin/dashboard-header"
import { Download, Reply as Reply2, Filter } from "lucide-react"

const ITEMS_PER_PAGE = 10

export default function Admin() {
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [subscribers, setSubscribers] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [dbHealthy, setDbHealthy] = useState(true)

  // Pagination state
  const [subPage, setSubPage] = useState(1)
  const [contactPage, setContactPage] = useState(1)

  // Filter state
  const [contactFilter, setContactFilter] = useState("all")
  const [replyModal, setReplyModal] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [statsRes, subsRes, contactsRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/get-subscribers"),
          fetch("/api/admin/get-contacts"),
        ])

        if (!statsRes.ok || !subsRes.ok || !contactsRes.ok) {
          setDbHealthy(false)
          return
        }

        const [statsData, subsData, contactsData] = await Promise.all([
          statsRes.json(),
          subsRes.json(),
          contactsRes.json(),
        ])

        setStats(statsData)
        setSubscribers(subsData.data || [])
        setContacts(contactsData.data || [])
      } catch (e) {
        console.error("[v0] Admin fetch error:", e)
        setDbHealthy(false)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredContacts = contactFilter === "all" ? contacts : contacts.filter((c) => c.status === contactFilter)

  const subTotalPages = Math.ceil(subscribers.length / ITEMS_PER_PAGE)
  const contactTotalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE)

  const paginatedSubs = subscribers.slice((subPage - 1) * ITEMS_PER_PAGE, subPage * ITEMS_PER_PAGE)
  const paginatedContacts = filteredContacts.slice((contactPage - 1) * ITEMS_PER_PAGE, contactPage * ITEMS_PER_PAGE)

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      const res = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: contactId, status: newStatus }),
      })
      if (res.ok) {
        setContacts((prev) => prev.map((c) => (c._id === contactId ? { ...c, status: newStatus } : c)))
      }
    } catch (e) {
      console.error("[v0] Status update error:", e)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-md border border-purple-300 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 transition"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <DashboardHeader stats={stats || {}} dbHealthy={dbHealthy} />

        {/* Subscribers Section */}
        <section className="grid gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-purple-800">Latest Subscribers</h2>
            <a
              href="/api/admin/export-subscribers"
              className="flex items-center gap-2 rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700 transition"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </a>
          </div>
          <div className="rounded-lg border border-purple-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-purple-50 text-purple-800 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSubs.map((s) => (
                    <tr key={s._id} className="border-t border-purple-100 hover:bg-purple-50 transition">
                      <td className="px-4 py-3">{s.name || "-"}</td>
                      <td className="px-4 py-3 text-purple-600">{s.email}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "-"}
                      </td>
                    </tr>
                  ))}
                  {paginatedSubs.length === 0 && (
                    <tr>
                      <td className="px-4 py-4 text-gray-500 text-center" colSpan={3}>
                        {dbHealthy ? "No subscribers yet." : "Database not connected."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {subTotalPages > 1 && (
              <Pagination currentPage={subPage} totalPages={subTotalPages} onPageChange={setSubPage} />
            )}
          </div>
        </section>

        {/* Contacts Section */}
        <section className="grid gap-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-semibold text-purple-800">Recent Contacts</h2>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-purple-600" />
              <select
                value={contactFilter}
                onChange={(e) => {
                  setContactFilter(e.target.value)
                  setContactPage(1)
                }}
                className="rounded-md border border-purple-300 px-3 py-2 text-sm bg-white hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="replied">Replied</option>
                <option value="resolved">Resolved</option>
              </select>
              <a
                href="/api/admin/export-contacts"
                className="flex items-center gap-2 rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700 transition"
              >
                <Download className="h-4 w-4" />
                CSV
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-purple-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-purple-50 text-purple-800 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedContacts.map((c) => (
                    <tr key={c._id} className="border-t border-purple-100 hover:bg-purple-50 transition">
                      <td className="px-4 py-3 font-medium">{c.name || "-"}</td>
                      <td className="px-4 py-3 text-purple-600">{c.email}</td>
                      <td className="px-4 py-3 max-w-xs truncate text-gray-600">{c.message}</td>
                      <td className="px-4 py-3">
                        <select
                          value={c.status || "pending"}
                          onChange={(e) => handleStatusChange(c._id, e.target.value)}
                          className="rounded-md border border-purple-300 px-2 py-1 text-xs bg-white hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="replied">Replied</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setReplyModal(c)}
                          className="flex items-center gap-1 rounded-md bg-purple-600 px-3 py-1 text-xs text-white hover:bg-purple-700 transition"
                        >
                          <Reply2 className="h-3 w-3" />
                          Reply
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedContacts.length === 0 && (
                    <tr>
                      <td className="px-4 py-4 text-gray-500 text-center" colSpan={5}>
                        {dbHealthy ? "No contacts found." : "Database not connected."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {contactTotalPages > 1 && (
              <Pagination currentPage={contactPage} totalPages={contactTotalPages} onPageChange={setContactPage} />
            )}
          </div>
        </section>
      </div>

      {/* Reply Modal */}
      {replyModal && (
        <ReplyModal
          contact={replyModal}
          onClose={() => setReplyModal(null)}
          onSuccess={() => {
            setReplyModal(null)
            // Refresh contacts
            window.location.reload()
          }}
        />
      )}
    </div>
  )
}
