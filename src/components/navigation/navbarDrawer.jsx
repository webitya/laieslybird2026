"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded"

export default function NavbarDrawer({ open, onClose }) {
  const pathname = usePathname()

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

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

  return (
    <div
      aria-hidden={!open}
      aria-modal="true"
      role="dialog"
      className={`fixed inset-0 z-50 transition-all duration-500 md:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Soft backdrop with blur */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer Panel */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-white/80 backdrop-blur-xl border-l border-purple-100 shadow-2xl transition-all duration-500 ease-out ${
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-100 bg-gradient-to-r from-white/70 to-purple-50/40 backdrop-blur-sm">
          <span className="text-lg font-semibold text-purple-700 tracking-tight">Menu</span>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-purple-700 hover:bg-purple-50 transition"
          >
            <CloseRoundedIcon fontSize="small" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between rounded-lg px-3 py-2 text-[15px] font-medium transition-all duration-200
                      ${
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
        <div className="mt-auto border-t border-purple-100 px-5 py-4 bg-gradient-to-r from-purple-50/40 to-white/70 backdrop-blur-md">
          <div className="rounded-xl border border-purple-200 bg-white/70 p-3 shadow-sm">
            <p className="text-xs font-medium text-gray-700 leading-snug">
              <span className="font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                LaieslyBird
              </span>{" "}
              • Roadmaps for CEOs & Co-Founders
              <span className="block text-gray-500 text-[11px] mt-1">
                Learn • Lead • Scale with Clarity
              </span>
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}
