import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Large soft spotlight that follows the cursor for a depthy OLED glow
export default function CursorGlow({ size = 420, intensity = 0.22 }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 })
  const y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 })

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX - size / 2)
      my.set(e.clientY - size / 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, size])

  return (
    <motion.div
      aria-hidden
      style={{ x, y, width: size, height: size }}
      className="pointer-events-none fixed top-0 left-0 z-[1] rounded-full mix-blend-screen"
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(closest-side, rgba(120,119,198,${intensity}), rgba(120,119,198,0) 70%)`,
          filter: 'blur(30px)',
          opacity: 0.75,
        }}
      />
    </motion.div>
  )
}
