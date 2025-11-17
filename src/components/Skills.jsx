import { motion } from 'framer-motion'
import { Github, Database, Globe, TerminalSquare, Server, Layers, Zap } from 'lucide-react'

const skills = [
  { icon: Database, label: 'MongoDB', tip: 'Document database for fast, flexible storage.' },
  { icon: Globe, label: 'HTML / CSS / JS', tip: 'Semantic, accessible, performant front-ends.' },
  { icon: Server, label: 'ExpressJS', tip: 'Minimal and robust NodeJS web framework.' },
  { icon: TerminalSquare, label: 'Fastify', tip: 'Fast and low-overhead NodeJS framework.' },
  { icon: Layers, label: 'Modern Front end', tip: 'Design systems, motion, and micro-interactions.' },
  { icon: Zap, label: 'ux prioritized', tip: 'Every detail crafted for feel and clarity.' },
]

export default function Skills() {
  return (
    <section className="relative py-24 md:py-32 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Skillset MHEM</h2>
          <p className="text-white/60 mt-2" style={{ fontFamily: 'var(--font-geist-mono)' }}>Mongodb • html/css/js • Express • Fastify • Modern Front end • ux prioritized</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -6, rotateX: 6, rotateY: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md"
            >
              <s.icon className="w-6 h-6 text-white/90" />
              <p className="mt-3 text-sm font-medium">{s.label}</p>
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(200px_circle_at_var(--mx)_var(--my),rgba(120,119,198,0.25),transparent_40%)]" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="rounded-xl bg-white/10 border border-white/10 text-xs px-3 py-1 backdrop-blur-md whitespace-nowrap">{s.tip}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .group:hover { --mx: 50%; --my: 50%; }
      `}</style>
    </section>
  )
}
