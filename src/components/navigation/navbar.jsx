"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded"
import NavbarDrawer from "./navbarDrawer"
import SubscribeModal from "./subscribe-modal"
import Logo from "./logo"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  const [searchOpen, setSearchOpen] = useState(false)
  const [subscribeOpen, setSubscribeOpen] = useState(false)

  const [q, setQ] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [active, setActive] = useState(-1)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const abortRef = useRef(null)

  // Close drawer on navigation or resize
  useEffect(() => {
    const handler = () => setOpen(false)
    const onResize = () => {
      if (typeof window !== "undefined" && window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener("popstate", handler)
    window.addEventListener("hashchange", handler)
    window.addEventListener("resize", onResize)

    const onKey = (e) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        setSearchOpen(true)
        setTimeout(() => inputRef.current?.focus(), 0)
      }
    }
    window.addEventListener("keydown", onKey)
    onResize()
    return () => {
      window.removeEventListener("popstate", handler)
      window.removeEventListener("hashchange", handler)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  // Search effect
  useEffect(() => {
    if (!searchOpen) return
    if (!q || q.trim().length < 2) {
      setResults([])
      return
    }
    setLoading(true)
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
      } finally {
        setLoading(false)
      }
    }, 220)
    return () => {
      clearTimeout(id)
      controller.abort()
    }
  }, [q, searchOpen])

  // Close search on ESC
  useEffect(() => {
    if (!searchOpen) return
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false)
        setQ("")
        setResults([])
        setActive(-1)
      }
    }
    window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [searchOpen])

  const onKeyDown = (e) => {
    if (!results.length) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
      listRef.current
        ?.querySelectorAll("a")
        [Math.min(active + 1, results.length - 1)]?.scrollIntoView({ block: "nearest" })
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
      listRef.current?.querySelectorAll("a")[Math.max(active - 1, 0)]?.scrollIntoView({ block: "nearest" })
    } else if (e.key === "Enter") {
      if (active >= 0 && results[active]) {
        router.push(results[active].href)
        setSearchOpen(false)
        setQ("")
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

  // Desktop navigation items
  const navItems = [
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/videos", label: "Videos" },
    { href: "/books", label: "Books (PDF)" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/whitepapers", label: "Whitepapers" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="mx-auto flex  items-center justify-between px-4 py-3 md:py-4 transition-all duration-300">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <Logo className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 md:flex bg-white/30 backdrop-blur-sm rounded-full px-5 py-2 border border-purple-100 shadow-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-all underline-offset-4 ${
                    isActive
                      ? "text-purple-700 font-semibold bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1 rounded-full shadow-sm"
                      : "text-gray-700 hover:text-purple-700"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* Subscribe button */}
            <button
              onClick={() => setSubscribeOpen(true)}
              className="rounded-full bg-purple-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md hover:bg-purple-700 transition-colors"
            >
              Subscribe
            </button>

            {/* Search button */}
            <button
              type="button"
              onClick={() => {
                setSearchOpen(true)
                setTimeout(() => inputRef.current?.focus(), 0)
              }}
              className="inline-flex items-center gap-1 rounded-full border border-purple-200 px-3 py-1.5 text-sm text-purple-700 hover:bg-purple-50 transition-colors"
              aria-label="Search site"
            >
              <SearchRoundedIcon fontSize="small" />
              <span className="hidden sm:inline">Search</span>
              <span className="ml-2 hidden rounded border border-purple-200 px-1.5 py-0.5 text-[10px] text-purple-500 md:inline">
                /
              </span>
            </button>

            {/* Admin link */}
            <Link
              href="/admin/login"
              className={`text-sm font-semibold transition-colors ${
                pathname === "/admin/login"
                  ? "text-purple-700 underline"
                  : "text-purple-700 hover:text-purple-900"
              }`}
            >
              Admin
            </Link>
          </nav>

          {/* Mobile menu trigger */}
          <button
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded-md p-2 text-purple-700 hover:bg-purple-50 md:hidden transition"
          >
            <MenuRoundedIcon />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <NavbarDrawer open={open} onClose={onClose} />

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-x-0 top-0 z-50 mx-auto max-w-6xl px-4 pt-2 md:pt-3">
          <div
            className="fixed inset-0 z-[-1] bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setSearchOpen(false)
              setQ("")
              setResults([])
            }}
            aria-hidden="true"
          />
          <div className="rounded-xl border border-purple-200 bg-white shadow-2xl animate-fadeIn">
            <div className="flex items-center gap-2 px-3 py-2">
              <SearchRoundedIcon className="text-purple-600" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search LaieslyBird — posts, videos, PDFs, case studies, whitepapers..."
                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-purple-300"
                aria-autocomplete="list"
                aria-expanded="true"
                aria-controls="lb-search-listbox"
              />
              {q ? (
                <button
                  onClick={() => {
                    setQ("")
                    setResults([])
                    inputRef.current?.focus()
                  }}
                  className="rounded-md p-1.5 text-purple-500 hover:bg-purple-50"
                  aria-label="Clear search"
                >
                  <CloseRoundedIcon fontSize="small" />
                </button>
              ) : null}
              <button
                onClick={() => {
                  setSearchOpen(false)
                  setQ("")
                  setResults([])
                }}
                className="rounded-md p-1.5 text-purple-700 hover:bg-purple-50"
                aria-label="Close search"
              >
                <CloseRoundedIcon />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-auto border-t border-purple-100" ref={listRef}>
              {!q && (
                <div className="px-4 py-6 text-sm text-purple-500">
                  Start typing to search articles, videos, and resources.
                </div>
              )}
              {q && loading && <div className="px-4 py-3 text-sm text-purple-500">Searching…</div>}
              {q && !loading && results.length === 0 && (
                <div className="px-4 py-6 text-sm text-purple-500">No results found.</div>
              )}
              <ul id="lb-search-listbox" role="listbox" className="divide-y divide-purple-50">
                {results.map((r, idx) => (
                  <li key={`${r.type}-${r.id}`} role="option" aria-selected={idx === active}>
                    <Link
                      href={r.href}
                      onClick={() => {
                        setSearchOpen(false)
                        setQ("")
                        setResults([])
                      }}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-purple-50 focus:bg-purple-50 transition-colors ${
                        idx === active ? "bg-purple-50" : ""
                      }`}
                    >
                      <span className="mt-0.5 inline-flex shrink-0 select-none rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-semibold leading-5 text-purple-700">
                        {r.type}
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span
                          className="truncate font-medium text-purple-800"
                          dangerouslySetInnerHTML={{ __html: highlight(r.title) }}
                        />
                        {r.snippet ? (
                          <span
                            className="line-clamp-2 text-xs text-gray-500"
                            dangerouslySetInnerHTML={{ __html: highlight(r.snippet) }}
                          />
                        ) : null}
                      </span>
                      <ArrowOutwardRoundedIcon className="ml-auto mt-0.5 shrink-0 text-purple-300" fontSize="small" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </>
  )
}
