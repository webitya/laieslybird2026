"use client"

import { useEffect, useRef, useState } from "react"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import Link from "next/link"
import Chip from "@mui/material/Chip"

export default function SearchModal({ open, onClose }) {
  const [q, setQ] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.()
      if (!open) return
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActive((i) => Math.min(i + 1, Math.max(0, results.length - 1)))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActive((i) => Math.max(i - 1, 0))
      }
      if (e.key === "Enter" && results[active]) {
        window.location.href = results[active].href
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, results, active, onClose])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQ("")
      setResults([])
      setActive(0)
    }
  }, [open])

  // Debounced search
  useEffect(() => {
    if (!open) return
    const controller = new AbortController()
    const id = setTimeout(async () => {
      const query = q.trim()
      if (query.length < 2) {
        setResults([])
        return
      }
      try {
        setLoading(true)
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        })
        const data = await res.json()
        setResults(Array.isArray(data?.results) ? data.results.slice(0, 20) : [])
      } catch (e) {
        // swallow
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => {
      clearTimeout(id)
      controller.abort()
    }
  }, [q, open])

  const groups = ["Blog", "Video", "Book", "Case Study", "Whitepaper"]
  const grouped = results.reduce((acc, r) => {
    const key = r.type || "Other"
    if (!acc[key]) acc[key] = []
    acc[key].push(r)
    return acc
  }, {})

  const tokens = Array.from(new Set(q.split(" ").filter(Boolean)))
  function highlight(text) {
    const t = String(text || "")
    if (!tokens.length) return t
    // split by tokens while keeping them, case-insensitive
    let out = [t]
    for (const tok of tokens) {
      const next = []
      for (const chunk of out) {
        if (typeof chunk !== "string") {
          next.push(chunk)
          continue
        }
        const parts = chunk.split(new RegExp(`(${tok})`, "ig"))
        for (const p of parts) {
          if (!p) continue
          if (p.toLowerCase() === tok.toLowerCase()) {
            next.push(
              <mark key={Math.random()} className="rounded bg-purple-100 px-0.5 text-purple-800">
                {p}
              </mark>,
            )
          } else {
            next.push(p)
          }
        }
      }
      out = next
    }
    return out
  }

  return (
    <div
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      className={["fixed inset-0 z-[60] transition", open ? "" : "pointer-events-none"].join(" ")}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={["absolute inset-0 bg-black/40 transition-opacity", open ? "opacity-100" : "opacity-0"].join(" ")}
      />
      {/* Panel */}
      <div
        className={[
          "absolute left-1/2 top-10 w-[92%] max-w-3xl -translate-x-1/2 rounded-xl border border-purple-200 bg-white shadow-2xl",
          "ring-1 ring-purple-100",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
          "transition-all duration-200",
        ].join(" ")}
      >
        <div className="flex items-center gap-2 border-b border-purple-100 px-4 py-3">
          <SearchRoundedIcon className="text-purple-600" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search blog, videos, books (PDF), case studies, whitepapers…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-purple-400"
          />
          <button
            aria-label="Close search"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-purple-700 hover:bg-purple-50"
          >
            <CloseRoundedIcon fontSize="small" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-auto p-2">
          {loading && <p className="px-3 py-2 text-xs text-purple-500">Searching…</p>}
          {!loading && results.length === 0 && q.trim().length >= 2 && (
            <div className="space-y-2 px-3 py-2">
              <p className="text-xs text-purple-500">No results found.</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/blog", label: "Explore Blog" },
                  { href: "/videos", label: "Watch Videos" },
                  { href: "/books", label: "Read PDFs" },
                  { href: "/case-studies", label: "Case Studies" },
                  { href: "/whitepapers", label: "Whitepapers" },
                ].map((s) => (
                  <Link key={s.href} href={s.href} className="text-xs">
                    <Chip label={s.label} color="secondary" variant="outlined" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {groups.map((g) => {
            const list = grouped[g] || []
            if (list.length === 0) return null
            return (
              <div key={g} className="mb-2">
                <div className="sticky top-0 z-[1] bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-500 backdrop-blur">
                  {g}
                </div>
                <ul className="space-y-1">
                  {list.slice(0, 5).map((r, i) => {
                    const idx = results.findIndex((x) => x === r)
                    return (
                      <li key={`${r.type}-${r.id}-${i}`}>
                        <Link
                          href={r.href}
                          className={[
                            "block rounded-md px-3 py-2",
                            idx === active ? "bg-purple-50" : "hover:bg-purple-50",
                            "transition",
                          ].join(" ")}
                          onMouseEnter={() => setActive(idx)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-purple-800">{highlight(r.title)}</span>
                            <span className="text-[10px] uppercase tracking-wide text-purple-500">{r.type}</span>
                          </div>
                          {r.snippet && (
                            <p className="mt-0.5 line-clamp-2 text-xs text-gray-600">{highlight(r.snippet)}</p>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
