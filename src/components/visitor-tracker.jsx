"use client"

import { useEffect } from "react"

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch("/api/track-visit", { method: "POST" })
      } catch (e) {
        console.log("[v0] Visitor tracking error:", e?.message)
      }
    }
    trackVisit()
  }, [])

  return null
}
