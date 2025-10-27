"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Professional placeholder images
  const images = [
    "/professional-business-team-meeting.png",
    "/corporate-leadership-conference.jpg",
    "/business-strategy-planning.png",
    "/professional-growth-development.jpg",
    "/corporate-success-achievement.jpg",
    "/business-innovation-technology.jpg",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="hidden lg:flex flex-col justify-center items-center h-full gap-4"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative w-full max-w-md h-80 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
        {/* Glassmorphism overlay */}
        <div className="absolute backdrop-blur-sm rounded-2xl border border-purple-200/40 z-10 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Carousel image ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent rounded-2xl" />
      </div>

      <div className="flex gap-1.5 justify-center">
        {images.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-gradient-to-r from-purple-600 to-violet-600 w-6 h-2"
                : "bg-purple-200/50 w-2 h-2 hover:bg-purple-300/70"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </motion.div>
  )
}
