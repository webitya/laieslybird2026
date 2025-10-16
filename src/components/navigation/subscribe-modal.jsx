"use client"

import { useEffect, useRef, useState } from "react"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import EmailRoundedIcon from "@mui/icons-material/EmailRounded"

export default function SubscribeModal({ open, onClose }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle") // idle | loading | ok | error
  const formRef = useRef(null)

  useEffect(() => {
    if (!open) {
      setStatus("idle")
      setName("")
      setEmail("")
    }
  }, [open])

  async function onSubmit(e) {
    e.preventDefault()
    setStatus("loading")
    try {
      const fd = new FormData(formRef.current)
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      })
      const ok = res.ok
      setStatus(ok ? "ok" : "error")
      if (ok) {
        setTimeout(() => {
          onClose?.()
        }, 800)
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div
      aria-hidden={!open}
      aria-modal="true"
      role="dialog"
      className={["fixed inset-0 z-[60] transition", open ? "" : "pointer-events-none"].join(" ")}
    >
      <div
        onClick={onClose}
        className={["absolute inset-0 bg-black/40 transition-opacity", open ? "opacity-100" : "opacity-0"].join(" ")}
      />
      <div
        className={[
          "absolute left-1/2 top-20 w-[92%] max-w-md -translate-x-1/2 rounded-xl border border-purple-200 bg-white p-4 shadow-2xl",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
          "transition-all duration-200",
        ].join(" ")}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <EmailRoundedIcon className="text-purple-600" />
            <h3 className="text-sm font-semibold text-purple-800">Subscribe to LaieslyBird</h3>
          </div>
          <button
            aria-label="Close subscribe"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-purple-700 hover:bg-purple-50"
          >
            <CloseRoundedIcon fontSize="small" />
          </button>
        </div>
        <form ref={formRef} onSubmit={onSubmit} className="grid gap-3">
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="rounded-md border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
          />
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            required
            className="rounded-md border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
          />
          <button
            disabled={status === "loading"}
            className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-70"
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
          {status === "ok" && <p className="text-xs text-green-600">Welcome email sent. You’re subscribed!</p>}
          {status === "error" && (
            <p className="text-xs text-red-600">There was an issue subscribing. Please try again.</p>
          )}
        </form>
        <p className="mt-3 text-[11px] text-purple-500">
          You’ll receive roadmaps, videos, and PDFs for CEOs & Co‑Founders. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}
