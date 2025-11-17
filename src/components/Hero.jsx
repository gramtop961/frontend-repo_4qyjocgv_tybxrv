import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Rocket, Code2, Monitor } from 'lucide-react'

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6])

  const floating = {
    animate: {
      y: [0, -8, 0],
      rotate: [0, 2, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    }
  }

  return (
    <section className="relative min-h-[100svh] w-full bg-black text-white overflow-hidden">
      {/* Background grid glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{
        backgroundImage: `radial-gradient(circle at 20% 10%, rgba(120,119,198,.15), transparent 35%), radial-gradient(circle at 80% 30%, rgba(59,130,246,.2), transparent 40%), radial-gradient(circle at 50% 80%, rgba(236,72,153,.12), transparent 40%)`
      }} />

      {/* Parallax stars */}
      <motion.div style={{ scale, y, opacity }} className="relative h-full">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 md:pt-36 md:pb-24">
          <motion.h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">S16DIH</span>
          </motion.h1>
          <motion.p className="mt-5 max-w-2xl text-lg md:text-xl text-white/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8, ease: 'easeOut' }}>
            Building beautiful software that looks as good as it works.
          </motion.p>

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

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0),rgba(0,0,0,0.6))]" />
    </section>
  )
}
