import MagButton from './MagButton'
import { motion } from 'framer-motion'
import { Mail, Github, MessageSquare } from 'lucide-react'

export default function Contact() {
  return (
    <section className="relative py-28 md:py-40 bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-semibold">
          Let’s build something beautiful
        </motion.h3>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <MagButton as="a" href="mailto:hello@example.com"><Mail className="w-4 h-4 mr-2 inline-block"/> Email</MagButton>
          <MagButton as="a" href="https://github.com/s16dih" target="_blank"><Github className="w-4 h-4 mr-2 inline-block"/> GitHub</MagButton>
          <MagButton as="a" href="https://discord.com/users/" target="_blank"><MessageSquare className="w-4 h-4 mr-2 inline-block"/> Discord</MagButton>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_200px_at_50%_0%,rgba(120,119,198,0.18),transparent_60%)]" />
      </div>
    </section>
  )
}
