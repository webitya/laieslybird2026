"use client"
import { useEffect } from "react"
import Link from "next/link"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded"

export default function NavbarDrawer({ open, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  return (
    <div
      aria-hidden={!open}
      aria-modal="true"
      role="dialog"
      className={["fixed inset-0 z-50 transition md:hidden", open ? "pointer-events-auto" : "pointer-events-none"].join(
        " ",
      )}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={["absolute inset-0 bg-black/60 transition-opacity", open ? "opacity-100" : "opacity-0"].join(" ")}
      />
      {/* Panel */}
      <aside
        className={[
          "absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white",
          "shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between p-4 border-b border-purple-100">
          <span className="font-semibold text-purple-700">Menu</span>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-purple-50 text-purple-700"
          >
            <CloseRoundedIcon fontSize="small" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/blog", label: "Blog" },
              { href: "/videos", label: "Videos" },
              { href: "/books", label: "Books (PDFs)" },
              { href: "/case-studies", label: "Case Studies" },
              { href: "/whitepapers", label: "Whitepapers" },
              { href: "/careers", label: "Careers" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  onClick={onClose}
                  href={item.href}
                  className="group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-purple-800 hover:bg-purple-50"
                >
                  <span>{item.label}</span>
                  <ArrowRightAltRoundedIcon className="opacity-0 transition group-hover:opacity-100 text-purple-500" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-4 border-t border-purple-100">
          <div className="rounded-lg bg-purple-50 p-3">
            <p className="text-xs text-purple-700">LaieslyBird • CEO & Co‑Founder Roadmaps, Tutorials, and Resources</p>
          </div>
        </div>
      </aside>
    </div>
  )
}
