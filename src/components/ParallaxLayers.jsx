import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Depthy parallax stack using transforms only (GPU-friendly)
export default function ParallaxLayers() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Layer transforms: farther = slower
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -220])

  // Subtle perspective tilt for camera feel
  const tilt = useTransform(scrollYProgress, [0, 1], [0, 4])

  return (
    <section ref={ref} className="relative h-[130vh] bg-black overflow-hidden will-change-transform">
      {/* Back layer: removed grid background for a cleaner OLED look */}
      <motion.div style={{ y: yBack, rotateX: tilt }} className="absolute inset-0" />

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
          <p className="mt-3 max-w-2xl text-white/60">Scroll to feel layers move at different speeds. The background grid has been removed for a purer OLED aesthetic.</p>
        </div>
      </div>
    </section>
  )
}
