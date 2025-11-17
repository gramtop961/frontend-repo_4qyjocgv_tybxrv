import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

export default function MagButton({ children, className = '', onClick, as = 'button', href, target }) {
  const ref = useRef(null)
  const [hover, setHover] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  const Comp = as

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCoords({ x, y })
  }

  const commonProps = {
    ref,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onMouseMove: handleMouseMove,
    onClick,
    className: cn(
      'relative inline-flex items-center justify-center rounded-2xl px-5 py-3 overflow-hidden select-none',
      'bg-white/5 text-white/90 backdrop-blur-md border border-white/10',
      'shadow-[0_0_0_0_rgba(0,0,0,0.0)] transition-all',
      'hover:shadow-[0_0_40px_-10px_rgba(120,119,198,0.5)]',
      'active:scale-[0.98]',
      className
    ),
  }

  return (
    <Comp {...commonProps} href={href} target={target}>
      {/* Glow */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: hover ? 1 : 0 }}
        style={{
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(120,119,198,0.25), transparent 40%)`
        }}
      />
      {/* Ripple */}
      <span className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-[linear-gradient(120deg,rgba(168,85,247,0.15),rgba(59,130,246,0.15))]" />
      <span className="relative z-10 font-medium tracking-wide">{children}</span>
    </Comp>
  )
}
