"use client"

import { motion } from "framer-motion"
import { ArrowRight, Rocket, Zap } from "lucide-react"
import ImageCarousel from "./image-carousel"

export default function HomeHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
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
      y: [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative w-full overflow-hidden bg-white" style={{ maxHeight: "90vh" }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50/30" />

        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-200 to-violet-200 opacity-8 blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-slate-200 to-purple-100 opacity-8 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/50 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <motion.div className="w-full max-w-7xl" variants={containerVariants} initial="hidden" animate="visible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center h-full">
            {/* Left side - Text content */}
            <div className="flex flex-col justify-center space-y-3 sm:space-y-5">
              {/* Main Heading */}
              <motion.div variants={itemVariants}>
                <h1 className="text-balance text-3xl sm:text-3xl lg:text-3xl xl:text-5xl font-bold text-slate-900 leading-tight">
                  Transform Vision Into
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">
                    Unstoppable Growth
                  </span>
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-lg"
              >
                Master the art of leadership with battle-tested frameworks, expert insights, and real-world case
                studies.
                <span className="block text-slate-700 font-semibold mt-2">Stop guessing. Start scaling.</span>
              </motion.p>

              {/* CTA Section */}
              <motion.div variants={itemVariants} className="flex flex-col gap-2 sm:gap-3 sm:flex-row pt-1">
                <motion.a
                  href="/videos"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-6 sm:px-8 py-3 sm:py-3.5 font-semibold text-white shadow-lg shadow-purple-500/30 overflow-hidden hover:shadow-2xl hover:shadow-purple-400/50 transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  role="button"
                  aria-label="Explore Tutorials"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <span className="relative flex items-center gap-2">
                    <Rocket className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                    <span className="hidden sm:inline">Explore Tutorials</span>
                    <span className="sm:hidden">Tutorials</span>
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </motion.a>

                <motion.a
                  href="/books"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-lg border border-purple-200/60 bg-white/70 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-3.5 font-semibold text-purple-700 shadow-md hover:bg-white hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/40 transition-all duration-300"
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  role="button"
                  aria-label="Access Playbooks"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <span className="relative flex items-center gap-2">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                    <span className="hidden sm:inline">Access Playbooks</span>
                    <span className="sm:hidden">Playbooks</span>
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2">
                {[
                  { label: "10K+", desc: "Leaders" },
                  { label: "500+", desc: "Frameworks" },
                  { label: "98%", desc: "Success" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={floatingVariants}
                    animate="animate"
                    className="text-center lg:text-left group cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-purple-50/60 transition-colors duration-300"
                    whileHover={{ scale: 1.06 }}
                  >
                    <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">
                      {stat.label}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 mt-0.5 group-hover:text-purple-600 transition-colors duration-300 font-medium">
                      {stat.desc}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right side - Image Carousel */}
            <motion.div variants={itemVariants}>
              <ImageCarousel />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(71,85,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
    </section>
  )
}
