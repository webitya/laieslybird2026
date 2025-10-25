"use client"

import { useEffect, useRef } from "react"

export default function CursorSmokeEffect() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 4
        this.vy = (Math.random() - 0.5) * 4 - 2
        this.life = 1
        this.decay = Math.random() * 0.015 + 0.01
        this.size = Math.random() * 30 + 20
        this.hue = Math.random() * 60 + 240 // Purple to cyan range
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.vy -= 0.1 // Gravity effect
        this.life -= this.decay
        this.vx *= 0.98 // Friction
      }

      draw(ctx) {
        ctx.save()
        ctx.globalAlpha = this.life * 0.5
        ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, 0.3)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      // Create particles at cursor position
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push(new Particle(e.clientX, e.clientY))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0)

      particlesRef.current.forEach((particle) => {
        particle.update()
        particle.draw(ctx)
      })

      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-20" />
}
