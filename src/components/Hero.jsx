import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Rocket, Code2, Monitor } from 'lucide-react'
import Spline from '@splinetool/react-spline'

// Simple error boundary so external 3D embeds can never crash the page
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch() {
    // swallow errors from third-party embeds
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 40])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7])
  const tilt = useTransform(scrollYProgress, [0, 0.3], [0, 4])

  const canvasRef = useRef(null)

  // Optional Spline scene URL via env; disabled by default if not provided
  const [splineUrl, setSplineUrl] = useState(() => import.meta.env.VITE_SPLINE_URL || '')

  // Lightweight GPU-friendly starfield (2D canvas with parallax feel)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0
    let rafId

    const STAR_COUNT = 220
    const stars = []

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const init = () => {
      stars.length = 0
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 0.8 + 0.2, // depth
          r: Math.random() * 1.6 + 0.2,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
        })
      }
    }

    let tiltX = 0, tiltY = 0
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / rect.width - 0.5
      const my = (e.clientY - rect.top) / rect.height - 0.5
      tiltX = mx
      tiltY = my
    }

    const step = () => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        // Parallax drift
        s.x += s.vx + tiltX * s.z * 0.6
        s.y += s.vy + tiltY * s.z * 0.6
        if (s.x < -10) s.x = w + 10
        if (s.x > w + 10) s.x = -10
        if (s.y < -10) s.y = h + 10
        if (s.y > h + 10) s.y = -10

        const alpha = 0.35 + s.z * 0.4
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      }
      rafId = requestAnimationFrame(step)
    }

    const onResize = () => {
      resize()
      init()
    }

    resize()
    init()
    step()

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const floating = {
    animate: {
      y: [0, -8, 0],
      rotate: [0, 2, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    }
  }

  return (
    <section className="relative min-h-[100svh] w-full bg-black text-white overflow-hidden">
      {/* Optional complementary Spline model behind content (safe-guarded) */}
      {splineUrl ? (
        <div className="pointer-events-none absolute inset-0 opacity-[0.15]">
          <ErrorBoundary>
            <Spline scene={splineUrl} />
          </ErrorBoundary>
        </div>
      ) : null}

      {/* Starfield canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 w-full h-full" />

      {/* Foreground content */}
      <motion.div style={{ scale, y, opacity, rotateX: tilt }} className="relative h-full">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://cdn.discordapp.com/avatars/1400491046445777008/126bc184ac2879c483c272b6ac11f029.webp?size=1024"
              alt="s16 logo"
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover mb-4 ring-neon shadow-[0_0_40px_rgba(255,255,255,0.08)]"
            />
            <motion.h1
              className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="block text-white">s16</span>
            </motion.h1>
            <motion.p
              className="mt-5 max-w-2xl text-lg md:text-xl text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: 'easeOut' }}
            >
              Building beautiful software that looks as good as it works.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Floating icons */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div variants={floating} animate="animate" className="absolute left-10 top-24">
          <Sparkles className="w-8 h-8 text-white/80" />
        </motion.div>
        <motion.div variants={floating} animate="animate" className="absolute right-14 top-36" transition={{ delay: .2 }}>
          <Rocket className="w-9 h-9 text-white/80" />
        </motion.div>
        <motion.div variants={floating} animate="animate" className="absolute left-1/2 top-1/2" transition={{ delay: .4 }}>
          <Code2 className="w-7 h-7 text-white/80" />
        </motion.div>
        <motion.div variants={floating} animate="animate" className="absolute right-1/3 bottom-24" transition={{ delay: .6 }}>
          <Monitor className="w-7 h-7 text-white/80" />
        </motion.div>
      </div>

      {/* Seamless fade to next section to hide any hard borders */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-black" />

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0),rgba(0,0,0,0.6))]" />
    </section>
  )
}
