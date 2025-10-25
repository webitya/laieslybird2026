"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function AnimatedSVGIllustration() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full max-w-md drop-shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:drop-shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
          </linearGradient>

          <radialGradient id="glassyGradient" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glassyGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="superGlow">
            <feGaussianBlur stdDeviation="10" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main rotating geometric shape */}
        <motion.g
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            duration: isHovered ? 6 : 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <circle
            cx="200"
            cy="200"
            r="120"
            fill="url(#glowGradient)"
            opacity={isHovered ? "0.25" : "0.15"}
            filter="url(#glassyGlow)"
          />
          <circle
            cx="200"
            cy="200"
            r="100"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="2.5"
            opacity={isHovered ? "0.9" : "0.7"}
          />
          <circle
            cx="200"
            cy="200"
            r="80"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="2"
            opacity={isHovered ? "0.7" : "0.5"}
          />
          <circle
            cx="200"
            cy="200"
            r="60"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="1.5"
            opacity={isHovered ? "0.5" : "0.3"}
          />
        </motion.g>

        {/* Glassy outer ring */}
        <circle
          cx="200"
          cy="200"
          r="130"
          fill="url(#glassyGradient)"
          opacity={isHovered ? "0.35" : "0.2"}
          filter="url(#glassyGlow)"
        />

        {/* Floating orbs with enhanced animations */}
        <motion.circle
          cx="200"
          cy="150"
          r="18"
          fill="#a855f7"
          opacity={isHovered ? "1" : "0.9"}
          animate={{
            y: isHovered ? [0, -50, 0] : [0, -30, 0],
            x: isHovered ? [-40, 40, -40] : [-20, 20, -20],
            r: isHovered ? [18, 26, 18] : [15, 18, 15],
          }}
          transition={{
            duration: isHovered ? 3 : 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          filter={isHovered ? "url(#superGlow)" : "url(#glassyGlow)"}
        />

        <motion.circle
          cx="150"
          cy="250"
          r="16"
          fill="#06b6d4"
          opacity={isHovered ? "1" : "0.85"}
          animate={{
            y: isHovered ? [0, 40, 0] : [0, 25, 0],
            x: isHovered ? [30, -30, 30] : [15, -15, 15],
            r: isHovered ? [16, 24, 16] : [12, 16, 12],
          }}
          transition={{
            duration: isHovered ? 3.5 : 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
          filter={isHovered ? "url(#superGlow)" : "url(#glassyGlow)"}
        />

        <motion.circle
          cx="250"
          cy="260"
          r="14"
          fill="#ec4899"
          opacity={isHovered ? "1" : "0.8"}
          animate={{
            y: isHovered ? [0, -40, 0] : [0, -20, 0],
            x: isHovered ? [-20, 40, -20] : [-10, 25, -10],
            r: isHovered ? [14, 22, 14] : [10, 14, 10],
          }}
          transition={{
            duration: isHovered ? 4 : 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          filter={isHovered ? "url(#superGlow)" : "url(#glassyGlow)"}
        />

        {/* Connecting lines with enhanced animation */}
        <motion.line
          x1="200"
          y1="150"
          x2="150"
          y2="250"
          stroke="url(#glowGradient)"
          strokeWidth={isHovered ? "3" : "2"}
          opacity={isHovered ? "0.8" : "0.4"}
          animate={{
            opacity: isHovered ? [0.5, 0.9, 0.5] : [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: isHovered ? 1.5 : 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.line
          x1="200"
          y1="150"
          x2="250"
          y2="260"
          stroke="url(#glowGradient)"
          strokeWidth={isHovered ? "3" : "2"}
          opacity={isHovered ? "0.9" : "0.4"}
          animate={{
            opacity: isHovered ? [0.6, 1, 0.6] : [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: isHovered ? 2 : 3.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />

        <motion.line
          x1="150"
          y1="250"
          x2="250"
          y2="260"
          stroke="url(#glowGradient)"
          strokeWidth={isHovered ? "2.5" : "1.5"}
          opacity={isHovered ? "0.7" : "0.3"}
          animate={{
            opacity: isHovered ? [0.4, 0.8, 0.4] : [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: isHovered ? 2.5 : 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.6,
          }}
        />

        {/* Enhanced pulsing center point */}
        <motion.circle
          cx="200"
          cy="200"
          r="10"
          fill="url(#glowGradient)"
          animate={{
            r: isHovered ? [10, 18, 10] : [8, 12, 8],
            opacity: isHovered ? [1, 1, 1] : [0.8, 1, 0.8],
          }}
          transition={{
            duration: isHovered ? 1 : 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          filter={isHovered ? "url(#superGlow)" : "url(#glassyGlow)"}
        />

        {/* Additional glassy accent circles */}
        <motion.circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="url(#glassyGradient)"
          strokeWidth={isHovered ? "2" : "1"}
          opacity={isHovered ? "0.6" : "0.3"}
          animate={{
            opacity: isHovered ? [0.4, 0.8, 0.4] : [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  )
}
