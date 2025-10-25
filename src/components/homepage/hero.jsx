"use client"

import { motion } from "framer-motion"
import { Zap, ArrowRight, Sparkles, Rocket } from "lucide-react"
import AnimatedSVGIllustration from "./animated-svg-illustration"
import WaterWaveEffect from "./water-wave-effect"
import CursorWaterRipple from "./cursor-water-ripple"

export default function HomeHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ maxHeight: "90vh" }}>
      <CursorWaterRipple />
      <WaterWaveEffect />

      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-950" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 opacity-20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 opacity-20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div className="w-full max-w-7xl" variants={containerVariants} initial="hidden" animate="visible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center h-full">
            {/* Left side - Text content */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
              {/* Badge */}
              <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-white/5 px-3 sm:px-4 py-2 backdrop-blur-md hover:border-purple-400/60 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.08, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
                  <span className="text-xs sm:text-sm font-medium text-purple-300">Empowering Leaders • 2026</span>
                </motion.div>
              </motion.div>

              {/* Main Heading */}
              <motion.div variants={itemVariants}>
                <h1 className="text-balance bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-3xl sm:text-3xl lg:text-4xl xl:text-4xl font-black text-transparent leading-tight hover:from-purple-100 hover:via-white hover:to-cyan-100 transition-all duration-500">
                  Transform Vision Into
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 hover:from-purple-300 hover:via-pink-300 hover:to-cyan-300 transition-all duration-500">
                    Unstoppable Growth
                  </span>
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-lg hover:text-gray-200 transition-colors duration-300"
              >
                Master the art of leadership with battle-tested frameworks, expert insights, and real-world case
                studies.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 font-semibold mt-2 hover:from-purple-200 hover:to-cyan-200 transition-all duration-300">
                  Stop guessing. Start scaling.
                </span>
              </motion.p>

              {/* CTA Section */}
              <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:gap-4 sm:flex-row pt-2">
                <motion.a
                  href="/videos"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white shadow-lg shadow-purple-500/50 overflow-hidden hover:shadow-2xl hover:shadow-purple-400/80 transition-all duration-300"
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  role="button"
                  aria-label="Explore Tutorials"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  <span className="relative flex items-center gap-2">
                    <Rocket className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                    <span className="hidden sm:inline">Explore Tutorials</span>
                    <span className="sm:hidden">Tutorials</span>
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </motion.a>

                <motion.a
                  href="/books"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-purple-500/50 bg-white/5 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white backdrop-blur-md hover:bg-white/15 hover:border-purple-400/80 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  role="button"
                  aria-label="Access Playbooks"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />
                  <span className="relative flex items-center gap-2">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                    <span className="hidden sm:inline">Access Playbooks</span>
                    <span className="sm:hidden">Playbooks</span>
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </motion.a>
              </motion.div>

              {/* Floating Stats */}
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 sm:pt-4">
                {[
                  { label: "10K+", desc: "Leaders" },
                  { label: "500+", desc: "Frameworks" },
                  { label: "98%", desc: "Success" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={floatingVariants}
                    animate="animate"
                    className="text-center lg:text-left group cursor-pointer"
                    whileHover={{ scale: 1.08 }}
                  >
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300">
                      {stat.label}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                      {stat.desc}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right side - Animated SVG Illustration */}
            <motion.div
              variants={itemVariants}
              className="hidden lg:flex justify-center items-center h-full"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-full max-w-sm">
                <AnimatedSVGIllustration />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
    </section>
  )
}
