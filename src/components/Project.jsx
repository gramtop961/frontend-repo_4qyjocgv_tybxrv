import { motion, useScroll, useTransform } from 'framer-motion'
import MagButton from './MagButton'

export default function Project() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0.25, 0.6], [0.9, 1.1])
  const opacity = useTransform(scrollYProgress, [0.25, 0.6], [0.6, 1])

  return (
    <section className="relative py-28 md:py-40 bg-black text-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Featured — Syntra Lite</h2>
          <p className="text-white/60 mt-2">A next-generation web unblocking platform with an OLED interface and advanced UI polish.</p>
        </div>

        <motion.div style={{ scale, opacity }} className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
          <img src="https://cdn.jsdelivr.net/gh/outbrowsed/syntralite21k@main/preview.png" alt="Syntra Lite Preview" className="w-full object-cover" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0),rgba(0,0,0,0.6))]" />
        </motion.div>

        <div className="mt-6 flex gap-3">
          <MagButton as="a" href="https://github.com/outbrowsed/syntralite21k" target="_blank">Open on GitHub</MagButton>
        </div>
      </div>
    </section>
  )
}
