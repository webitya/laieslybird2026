"use client"

import Link from "next/link"
import { useState } from "react"
import { Email, Facebook, Twitter, LinkedIn, YouTube } from "@mui/icons-material"
import Logo from "./logo"

export default function Footer() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle") // idle | loading | ok | error

  async function handleSubscribe(e) {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams({ name, email }),
      })
      setStatus(res.ok ? "ok" : "error")
      if (res.ok) {
        setName("")
        setEmail("")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <footer className="relative z-10 bg-gradient-to-tr from-purple-50 to-white/80 border-t border-purple-200 py-10 px-6 md:px-12">
      <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-4">

        {/* Logo & About */}
        <div className="space-y-4">
         <Logo/>
          <p className="text-gray-700 text-sm leading-relaxed">
            Practical roadmaps, tutorials, and resources to help CEOs & Co-Founders lead with clarity.
          </p>

          {/* Email & Social under About */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-purple-700">
              <Email fontSize="small" />
              <a href="mailto:laieslybird@gmail.com" className="text-sm hover:underline">
                laieslybird@gmail.com
              </a>
            </div>
            <div className="flex gap-3 text-purple-600">
              <Link href="#" className="hover:text-purple-800 transition-colors"><Facebook /></Link>
              <Link href="#" className="hover:text-purple-800 transition-colors"><Twitter /></Link>
              <Link href="#" className="hover:text-purple-800 transition-colors"><LinkedIn /></Link>
              <Link href="#" className="hover:text-purple-800 transition-colors"><YouTube /></Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-purple-800 font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            {["About", "Videos", "Books (PDF)", "Blog", "Contact"].map((link) => (
              <li key={link}>
                <Link href={`/${link.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-purple-700 transition-colors">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-purple-800 font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            {["Case Studies", "Whitepapers", "Careers"].map((link) => (
              <li key={link}>
                <Link href={`/${link.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-purple-700 transition-colors">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe Form */}
        <div className="space-y-4">
          <h3 className="text-purple-800 font-semibold mb-2">Subscribe</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-md border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-70"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
            {status === "ok" && <p className="text-xs text-green-600">Welcome email sent! You’re subscribed.</p>}
            {status === "error" && <p className="text-xs text-red-600">Subscription failed. Try again.</p>}
          </form>
        </div>
      </div>

      {/* Divider & Copyright */}
      <hr className="my-6 border-purple-200" />
      <p className="text-center text-sm text-gray-600">
        © {new Date().getFullYear()} LaieslyBird. All rights reserved.
      </p>
    </footer>
  )
}
