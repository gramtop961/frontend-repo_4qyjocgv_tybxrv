import MagButton from './MagButton'
import { motion } from 'framer-motion'
import { Github, MessageSquare, Mail, ArrowRight } from 'lucide-react'

export default function Contact() {
  return (
    <section className="relative py-32 md:py-44 bg-black text-white overflow-hidden">
      {/* Ambient glow frame */}
      <div className="pointer-events-none absolute inset-0 vignette" />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-5xl font-black tracking-tight">
            Let’s build something beautiful
          </h3>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            High-polish web experiences. 3D, motion, and performance-first craft.
          </p>
        </motion.div>

        {/* Card CTA with neon ring and glass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          className="mt-10 rounded-2xl p-[1px] ring-neon"
        >
          <div className="glass rounded-2xl p-8 md:p-10 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-xl md:text-2xl font-semibold">Available for select collaborations</h4>
                <p className="mt-2 text-white/60">Tell me about your product, timeline, and goals.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
                <MagButton as="a" href="mailto:work@sixteen.dev" target="_blank">
                  <Mail className="w-4 h-4 mr-2 inline-block"/> Email
                </MagButton>
                <MagButton as="a" href="https://github.com/gustambolopez" target="_blank">
                  <Github className="w-4 h-4 mr-2 inline-block"/> GitHub
                </MagButton>
                <MagButton as="a" href="https://discord.com/users/mogolixzq" target="_blank">
                  <MessageSquare className="w-4 h-4 mr-2 inline-block"/> Discord
                </MagButton>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Micro footer */}
        <div className="mt-10 flex items-center justify-center gap-2 text-white/40 text-sm">
          <span>Built with motion & care</span>
          <ArrowRight className="w-3.5 h-3.5" />
          <span>s16</span>
        </div>
      </div>

      {/* Decorative light sweeps */}
      <div className="pointer-events-none absolute -inset-x-20 bottom-0 h-32 opacity-25" style={{
        background: 'radial-gradient(80% 60% at 50% 100%, rgba(255,255,255,0.2), transparent 60%)'
      }} />
    </section>
  )
}
