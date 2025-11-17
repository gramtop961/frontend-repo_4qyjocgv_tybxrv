import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../utils/cn'

export default function MagButton({ children, className = '', onClick, as = 'button', href, target }) {
  const ref = useRef(null)
  const [hover, setHover] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState([])

  const Comp = as

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCoords({ x, y })
  }

  const handleMouseDown = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Math.random().toString(36).slice(2)
    setRipples((r) => [...r, { id, x, y }])
    // Auto-remove ripple after animation
    setTimeout(() => {
      setRipples((r) => r.filter((rip) => rip.id !== id))
    }, 500)
  }

  const commonProps = {
    ref,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onMouseMove: handleMouseMove,
    onMouseDown: handleMouseDown,
    onClick,
    className: cn(
      // Layout
      'relative inline-flex items-center justify-center rounded-2xl px-5 py-3 overflow-hidden select-none',
      // Pure OLED button: solid black, subtle border, no gradients
      'bg-black text-white/90 border border-white/10',
      // Smooth transitions and micro-interactions
      'transition-transform duration-150 ease-out will-change-transform',
      // Hover/active feedback with shadows (not gradients)
      hover ? 'shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(120,119,198,0.45)]' : 'shadow-[0_0_0_1px_rgba(255,255,255,0.06)]',
      'hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/20',
      className
    ),
    style: {
      // subtle magnetic translation based on cursor, without gradients
      transform: hover
        ? `translate3d(${((coords.x - (ref.current?.clientWidth || 0) / 2) / 40).toFixed(2)}px, ${((coords.y - (ref.current?.clientHeight || 0) / 2) / 40).toFixed(2)}px, 0)`
        : undefined,
    },
  }

  return (
    <Comp {...commonProps} href={href} target={target}>
      {/* Ripples: solid circle, no gradients */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.25, scale: 0 }}
            animate={{ opacity: 0, scale: 3.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: r.x,
              top: r.y,
              width: 16,
              height: 16,
              marginLeft: -8,
              marginTop: -8,
              backgroundColor: 'rgba(255,255,255,0.18)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Content */}
      <span className="relative z-10 font-medium tracking-wide text-white">{children}</span>
    </Comp>
  )
}
