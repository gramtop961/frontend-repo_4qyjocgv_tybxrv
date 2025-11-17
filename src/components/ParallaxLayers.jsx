import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Depthy parallax stack using transforms only (GPU-friendly)
export default function ParallaxLayers() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Layer transforms: farther = slower
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -220])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.9, 1])

  return (
    <section ref={ref} className="relative h-[120vh] bg-black overflow-hidden">
      {/* Back layer: soft grid lines */}
      <motion.div style={{ y: yBack, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center',
        }}/>
      </motion.div>

      {/* Mid layer: blurred glass blobs */}
      <motion.div style={{ y: yMid }} className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-[40vw] h-[40vw] rounded-full bg-white/5 blur-3xl border border-white/5" />
        <div className="absolute -bottom-16 right-10 w-[30vw] h-[30vw] rounded-full bg-white/5 blur-3xl border border-white/5" />
      </motion.div>

      {/* Front layer: subtle angled beams */}
      <motion.div style={{ y: yFront }} className="absolute inset-0">
        <div className="absolute -inset-10 rotate-12 opacity-20" style={{
          background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 2px, transparent 2px 10px)'
        }}/>
      </motion.div>

      <div className="relative z-10 h-full flex items-end">
        <div className="mx-auto max-w-6xl px-6 pb-20 text-white/80">
          <h3 className="text-2xl md:text-3xl font-semibold">Depth Layers</h3>
          <p className="mt-2 max-w-2xl text-white/60">Scroll to feel layers move at different speeds for cinematic depth without heavy WebGL.</p>
        </div>
      </div>
    </section>
  )
}
