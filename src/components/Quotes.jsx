import { motion } from 'framer-motion'

const quotes = [
  '“I judge a book by its cover because users do too.”',
  '“Beautiful interfaces create trust.”',
  '“ui  is the product, code is just the engine.”'
]

export default function Quotes() {
  return (
    <section className="relative py-24 md:py-32 bg-black text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.06 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 backdrop-blur-md text-lg md:text-xl"
            >
              {q}
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
