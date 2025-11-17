import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

// Depthy parallax stack using transforms only (GPU-friendly)
export default function ParallaxLayers() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Layer transforms: farther = slower
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -220])

  // Fade the grid out gently when motion settles
  const gridOpacityBase = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const inactivity = useMotionValue(0)
  const opacity = useSpring(gridOpacityBase, { stiffness: 120, damping: 30 })

  useEffect(() => {
    let raf
    let last = 0
    const loop = (t) => {
      const dt = Math.min(33, t - last)
      last = t
      // decay inactivity to 0, which we map to extra fade
      inactivity.set(Math.max(0, inactivity.get() - dt * 0.002))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [inactivity])

  // Subtle perspective tilt for camera feel
  const tilt = useTransform(scrollYProgress, [0, 1], [0, 4])

  return (
    <section ref={ref} className="relative h-[130vh] bg-black overflow-hidden will-change-transform">
      {/* Back layer: soft grid lines with shadow-away fade at rest */}
      <motion.div style={{ y: yBack, rotateX: tilt }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            opacity,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            backgroundPosition: 'center',
            maskImage:
              'radial-gradient(ellipse at 50% 60%, black 40%, transparent 90%)',
          }}
        />
        {/* Shadow-away at bottom when scroll slows */}
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.95) 100%)'
        }} />
      </motion.div>

      {/* Mid layer: blurred glass blobs with improved spacing */}
      <motion.div style={{ y: yMid }} className="absolute inset-0">
        <div className="absolute -top-16 -left-24 w-[42vw] h-[42vw] rounded-full bg-white/5 blur-3xl border border-white/5" />
        <div className="absolute -bottom-20 right-8 w-[32vw] h-[32vw] rounded-full bg-white/5 blur-3xl border border-white/5" />
      </motion.div>

      {/* Front layer: subtle angled beams */}
      <motion.div style={{ y: yFront }} className="absolute inset-0">
        <div className="absolute -inset-12 rotate-12 opacity-20" style={{
          background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 2px, transparent 2px 12px)'
        }}/>
      </motion.div>

      <div className="relative z-10 h-full flex items-end">
        <div className="mx-auto max-w-6xl px-6 pb-24 text-white/80">
          <h3 className="text-2xl md:text-3xl font-semibold">Depth Layers</h3>
          <p className="mt-3 max-w-2xl text-white/60">Scroll to feel layers move at different speeds. The grid now eases into a soft shadow instead of stopping abruptly.</p>
        </div>
      </div>
    </section>
  )
}
