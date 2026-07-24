import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'

export default function AnimatedCounter({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, value, { duration: 2, ease: 'easeOut' })
    const unsubscribe = motionValue.on('change', (v) => {
      setDisplay(decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('vi-VN'))
    })
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [inView])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
