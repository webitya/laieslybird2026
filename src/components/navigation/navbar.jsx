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
  const [subscribeOpen, setSubscribeOpen] = useState(false)
  const [q, setQ] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(-1)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const abortRef = useRef(null)
  const [searchFocused, setSearchFocused] = useState(false)

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

  // Close drawer on navigation or resize
  useEffect(() => {
    const handler = () => setOpen(false)
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    window.addEventListener("popstate", handler)
    window.addEventListener("hashchange", handler)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("popstate", handler)
      window.removeEventListener("hashchange", handler)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  // Fetch search results
  useEffect(() => {
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
  }, [q])

  // Keyboard navigation
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
    <>
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="mx-auto flex items-center justify-between px-4 py-2 md:py-3">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-6 transition-transform duration-300 group-hover:scale-105" />
          </Link>

          <nav className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-100 shadow-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={`text-sm font-medium px-2 py-1 rounded-full transition ${
                    isActive
                      ? "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 font-semibold"
                      : "text-gray-700 hover:text-purple-700"
                  }`}
                >
                  {item.label}
                </button>
              )
            })}

            {/* Inline search */}
            <div className="relative inline-block w-[270px] ml-2">
              <div className="flex items-center gap-1 rounded-full border border-purple-200 px-2 h-8 text-sm text-purple-700 hover:bg-purple-50 transition-colors">
                <SearchRoundedIcon fontSize="small" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  onKeyDown={onKeyDown}
                  placeholder="Search..."
                  className="w-full bg-transparent outline-none placeholder:text-purple-300 text-xs h-full"
                />
                {q && (
                  <button onClick={() => setQ("")} className="ml-1 rounded-md p-1 text-purple-500 hover:bg-purple-50" type="button">
                    <CloseRoundedIcon fontSize="small" />
                  </button>
                )}
              </div>

              {searchFocused && results.length > 0 && (
                <ul
                  ref={listRef}
                  className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-lg border border-purple-200 bg-white shadow-md text-xs"
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
                        }}
                        className={`flex items-start gap-1 w-full text-left cursor-pointer px-2 py-1 hover:bg-purple-50 ${
                          idx === active ? "bg-purple-50" : ""
                        }`}
                      >
                        <span className="inline-flex shrink-0 rounded-md bg-purple-100 px-1 py-0.5 text-[9px] font-semibold text-purple-700">
                          {r.type}
                        </span>
                        <span className="flex flex-col min-w-0">
                          <span className="truncate font-medium text-purple-800" dangerouslySetInnerHTML={{ __html: highlight(r.title) }} />
                          {r.snippet && <span className="line-clamp-2 text-[9px] text-gray-500" dangerouslySetInnerHTML={{ __html: highlight(r.snippet) }} />}
                        </span>
                        <ArrowOutwardRoundedIcon className="ml-auto mt-0.5 shrink-0 text-purple-300" fontSize="small" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={() => setSubscribeOpen(true)}
              className="rounded-full bg-purple-600 px-3 py-1 text-md font-semibold text-white shadow-md hover:bg-purple-700 transition-colors ml-2"
            >
              Subscribe
            </button>
          </nav>

          <button
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded-md p-1.5 text-purple-700 hover:bg-purple-50 md:hidden transition"
          >
            <MenuRoundedIcon fontSize="small" />
          </button>
        </div>
      </header>

      <NavbarDrawer open={open} onClose={() => setOpen(false)} />
      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </>
  )
}
