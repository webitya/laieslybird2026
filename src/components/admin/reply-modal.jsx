"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function ReplyModal({ contact, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({ subject: "", html: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin/reply-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: contact.email,
          subject: formData.subject,
          html: formData.html,
          contactId: contact._id,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to send reply")

      setFormData({ subject: "", html: "" })
      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-purple-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-purple-800">Reply to {contact.email}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 p-6">
          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-purple-800 mb-2">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Email subject"
              className="w-full rounded-md border border-purple-300 px-3 py-2 text-sm bg-white hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-800 mb-2">Message (HTML allowed)</label>
            <textarea
              required
              value={formData.html}
              onChange={(e) => setFormData({ ...formData, html: e.target.value })}
              placeholder="Your reply message..."
              rows={6}
              className="w-full rounded-md border border-purple-300 px-3 py-2 text-sm bg-white hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-purple-300 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
