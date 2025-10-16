"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded"

export default function NavbarDrawer({ open, onClose }) {
  const router = useRouter()
  const pathname = usePathname()

  const [q, setQ] = useState("")
  const [results, setResults] = useState([])
  const [active, setActive] = useState(-1)
  const [searchFocused, setSearchFocused] = useState(false)
  const abortRef = useRef(null)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/videos", label: "Videos" },
    { href: "/books", label: "Books (PDFs)" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/whitepapers", label: "Whitepapers" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ]

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  // Fetch search results
  useEffect(() => {
    if (!q || q.trim().length < 2) {
      setResults([])
      return
    }
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const id = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
        const data = await res.json()
        setResults(Array.isArray(data.results) ? data.results : [])
      } catch (err) {
        if (err?.name !== "AbortError") console.log("search error:", err?.message || err)
      }
    }, 200)
    return () => {
      clearTimeout(id)
      controller.abort()
    }
  }, [q])

  const onKeyDown = (e) => {
    if (!results.length) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
      listRef.current?.querySelectorAll("button")[Math.min(active + 1, results.length - 1)]?.scrollIntoView({ block: "nearest" })
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
      listRef.current?.querySelectorAll("button")[Math.max(active - 1, 0)]?.scrollIntoView({ block: "nearest" })
    } else if (e.key === "Enter") {
      if (active >= 0 && results[active]) {
        router.push(results[active].href)
        setQ("")
        setSearchFocused(false)
        setActive(-1)
        onClose()
      }
    }
  }

  const highlight = (text) => {
    const tokens = Array.from(new Set((q || "").toLowerCase().split(/\s+/).filter(Boolean)))
    if (!tokens.length) return text
    let out = text
    for (const t of tokens) {
      const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig")
      out = out.replace(re, "<mark class='bg-purple-100 text-purple-800 rounded px-0.5'>$1</mark>")
    }
    return out
  }

  return (
    <div
      aria-hidden={!open}
      aria-modal="true"
      role="dialog"
      className={`fixed inset-0 z-50 transition-all duration-500 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Drawer Panel */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-72 max-w-[85%] flex-col bg-white/80 backdrop-blur-xl border-l border-purple-100 shadow-2xl transition-all duration-500 ease-out ${
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-purple-100 bg-gradient-to-r from-white/70 to-purple-50/40 backdrop-blur-sm">
          <span className="text-lg font-semibold text-purple-700 tracking-tight">Menu</span>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-purple-700 hover:bg-purple-50 transition"
          >
            <CloseRoundedIcon fontSize="small" />
          </button>
        </div>

        {/* Inline Search */}
        <div className="px-4 py-3 border-b border-purple-100">
          <div className="relative">
            <div className="flex items-center gap-2 rounded-full border border-purple-200 px-3 h-9 text-sm text-purple-700 hover:bg-purple-50 transition-colors">
              <SearchRoundedIcon fontSize="small" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                onKeyDown={onKeyDown}
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-xs placeholder:text-purple-300 h-full"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="ml-1 rounded-md p-1 text-purple-500 hover:bg-purple-50"
                  type="button"
                >
                  <CloseRoundedIcon fontSize="small" />
                </button>
              )}
            </div>

            {searchFocused && results.length > 0 && (
              <ul
                ref={listRef}
                className="absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-purple-200 bg-white shadow-md text-xs"
              >
                {results.map((r, idx) => (
                  <li key={`${r.type}-${r.id}`}>
                    <button
                      type="button"
                      onMouseDown={() => {
                        router.push(r.href)
                        setQ("")
                        setSearchFocused(false)
                        setActive(-1)
                        onClose()
                      }}
                      className={`flex items-start gap-1 w-full text-left px-2 py-1 hover:bg-purple-50 ${
                        idx === active ? "bg-purple-50" : ""
                      }`}
                    >
                      <span className="inline-flex shrink-0 rounded-md bg-purple-100 px-1 py-0.5 text-[9px] font-semibold text-purple-700">
                        {r.type}
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span
                          className="truncate font-medium text-purple-800"
                          dangerouslySetInnerHTML={{ __html: highlight(r.title) }}
                        />
                        {r.snippet && (
                          <span
                            className="line-clamp-2 text-[9px] text-gray-500"
                            dangerouslySetInnerHTML={{ __html: highlight(r.snippet) }}
                          />
                        )}
                      </span>
                      <ArrowOutwardRoundedIcon className="ml-auto mt-0.5 shrink-0 text-purple-300" fontSize="small" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-3">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between rounded-lg px-3 py-2 text-[14px] font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border border-purple-200 shadow-sm"
                        : "text-gray-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-700"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRightAltRoundedIcon
                      className={`transition-all duration-200 ${
                        isActive
                          ? "opacity-100 translate-x-0 text-purple-500"
                          : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-purple-400"
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t border-purple-100 px-4 py-3 bg-gradient-to-r from-purple-50/40 to-white/70 backdrop-blur-md">
          <div className="rounded-xl border border-purple-200 bg-white/70 p-3 shadow-sm text-[11px]">
            <p className="text-gray-700 leading-snug">
              <span className="font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                LaieslyBird
              </span>{" "}
              • Roadmaps for CEOs & Co-Founders
              <span className="block text-gray-500 mt-1">Learn • Lead • Scale with Clarity</span>
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}
