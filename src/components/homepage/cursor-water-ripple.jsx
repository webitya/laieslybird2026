"use client"

import { useEffect, useRef } from "react"

export default function CursorWaterRipple() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rippleRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class WaterRipple {
      constructor(x, y, intensity = 1) {
        this.x = x
        this.y = y
        this.radius = 0
        this.maxRadius = 150 * intensity
        this.life = 1
        this.decay = 0.02 / intensity
        this.intensity = intensity
      }

      update() {
        this.radius += 3 * this.intensity
        this.life -= this.decay
      }

      draw(ctx) {
        ctx.save()
        ctx.globalAlpha = this.life * 0.6
        ctx.strokeStyle = `rgba(168, 85, 247, ${this.life * 0.8})`
        ctx.lineWidth = 2 * this.intensity
        ctx.beginPath()
        ctx.arc(this.x, this.y, Math.max(0, this.radius), 0, Math.PI * 2)
        ctx.stroke()

        // Inner glow
        ctx.strokeStyle = `rgba(6, 182, 212, ${this.life * 0.5})`
        ctx.lineWidth = 1.5 * this.intensity
        ctx.beginPath()
        ctx.arc(this.x, this.y, Math.max(0, this.radius - 10), 0, Math.PI * 2)
        ctx.stroke()

        ctx.restore()
      }
    }

    class GlassyParticle {
      constructor(x, y, intensity = 1) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 6 * intensity
        this.vy = (Math.random() - 0.5) * 6 * intensity - 1
        this.life = 1
        this.decay = Math.random() * 0.02 + 0.015
        this.size = Math.random() * 25 + 15
        this.hue = Math.random() > 0.5 ? 270 : 180
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.1
        this.intensity = intensity
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.vy -= 0.08 * this.intensity
        this.life -= this.decay
        this.vx *= 0.96
        this.rotation += this.rotationSpeed
      }

      draw(ctx) {
        ctx.save()
        ctx.globalAlpha = this.life * 0.7
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size)
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, 0.6)`)
        gradient.addColorStop(0.7, `hsla(${this.hue}, 100%, 50%, 0.3)`)
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 40%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(0, 0, this.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = `hsla(${this.hue}, 100%, 80%, 0.4)`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2)
        ctx.stroke()

        ctx.restore()
      }
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      // Check if hovering over button
      const buttons = document.querySelectorAll("button, a[role='button']")
      let isOverButton = false
      for (const btn of buttons) {
        const rect = btn.getBoundingClientRect()
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          isOverButton = true
          break
        }
      }

      // Only create ripples and particles if NOT over button
      if (!isOverButton) {
        rippleRef.current.push(new WaterRipple(e.clientX, e.clientY, 1))
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push(new GlassyParticle(e.clientX, e.clientY, 1))
        }
      }
    }

    const handleClick = (e) => {
      const x = e.clientX
      const y = e.clientY

      // Create burst of ripples on click
      for (let i = 0; i < 4; i++) {
        rippleRef.current.push(new WaterRipple(x, y, 2.5))
      }

      // Create powerful particle burst
      for (let i = 0; i < 20; i++) {
        particlesRef.current.push(new GlassyParticle(x, y, 2.5))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      rippleRef.current = rippleRef.current.filter((r) => r.life > 0)
      rippleRef.current.forEach((ripple) => {
        ripple.update()
        ripple.draw(ctx)
      })

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0)
      particlesRef.current.forEach((particle) => {
        particle.update()
        particle.draw(ctx)
      })

      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-20" />
}
