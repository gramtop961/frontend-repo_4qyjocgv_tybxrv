import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import MagButton from './MagButton'

export default function Project() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0.25, 0.6], [0.95, 1.06])
  const opacity = useTransform(scrollYProgress, [0.25, 0.6], [0.7, 1])

  // 3D hover card
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const [hover, setHover] = useState(false)

  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 180, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 180, damping: 20 })
  const shineX = useTransform(mx, [0, 1], ['0%', '100%'])
  const shineY = useTransform(my, [0, 1], ['0%', '100%'])

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mx.set(x)
    my.set(y)
  }

  return (
    <section className="relative py-28 md:py-44 bg-black text-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Featured — Syntra Lite</h2>
          <p className="text-white/60 mt-3 max-w-2xl">A next-generation web unblocking platform with an OLED interface and advanced UI polish.</p>
        </div>

        <motion.div style={{ scale, opacity }} className="relative">
          <motion.div
            ref={ref}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseMove={onMove}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md transform-gpu will-change-transform"
            style={{ rotateX: hover ? rx : 0, rotateY: hover ? ry : 0, perspective: 1000 }}
          >
            <img src="https://cdn.jsdelivr.net/gh/outbrowsed/syntralite21k@main/preview.png" alt="Syntra Lite Preview" className="w-full object-cover" />

            {/* sheen */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  `radial-gradient(600px 300px at ${shineX} ${shineY}, rgba(255,255,255,0.14), transparent 60%)`,
                opacity: hover ? 1 : 0,
                transition: 'opacity 200ms ease',
                mixBlendMode: 'screen',
              }}
            />

            <div className="absolute inset-0 pointer-events-none vignette" />
          </motion.div>
        </motion.div>

        {/* CTA lowered with better spacing */}
        <div className="mt-14 flex gap-3">
          <MagButton as="a" href="https://github.com/outbrowsed/syntralite21k" target="_blank">Open on GitHub</MagButton>
        </div>
      </div>
    </section>
  )
}
