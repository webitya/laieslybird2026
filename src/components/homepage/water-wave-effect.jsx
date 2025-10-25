"use client"

import { useEffect, useRef } from "react"

export default function WaterWaveEffect() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = 250

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const waves = [
        {
          amplitude: 25,
          frequency: 0.018,
          speed: 0.04,
          offset: 0,
          color: "rgba(168, 85, 247, 0.2)",
          blur: 2,
        },
        {
          amplitude: 18,
          frequency: 0.012,
          speed: 0.025,
          offset: Math.PI / 3,
          color: "rgba(6, 182, 212, 0.15)",
          blur: 3,
        },
        {
          amplitude: 12,
          frequency: 0.008,
          speed: 0.015,
          offset: (Math.PI * 2) / 3,
          color: "rgba(236, 72, 153, 0.12)",
          blur: 2.5,
        },
        {
          amplitude: 8,
          frequency: 0.005,
          speed: 0.01,
          offset: Math.PI,
          color: "rgba(168, 85, 247, 0.08)",
          blur: 1.5,
        },
      ]

      waves.forEach((wave) => {
        ctx.save()
        ctx.filter = `blur(${wave.blur}px)`

        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x += 4) {
          const y =
            canvas.height / 2 +
            Math.sin((x * wave.frequency + time * wave.speed + wave.offset) * Math.PI) * wave.amplitude
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        // Glassy gradient effect
        const gradient = ctx.createLinearGradient(0, canvas.height / 2, 0, canvas.height)
        gradient.addColorStop(0, wave.color)
        gradient.addColorStop(
          1,
          wave.color.replace("0.2", "0.05").replace("0.15", "0.02").replace("0.12", "0.01").replace("0.08", "0"),
        )

        ctx.fillStyle = gradient
        ctx.fill()
        ctx.restore()
      })

      time++
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="absolute bottom-0 left-0 w-full pointer-events-none" />
}
