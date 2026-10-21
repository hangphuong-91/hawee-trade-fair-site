import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const BODIES = ['#C9187F', '#E8593A', '#FEB12E', '#FB6094', '#7A1244']

export function GiftIcon({ size = 40, body = '#C9187F', ribbon = '#FEB12E' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 17c-3-7-12-9-12-3.5S19 17 24 17Zm0 0c3-7 12-9 12-3.5S29 17 24 17Z" fill="none" stroke={ribbon} strokeWidth="3" strokeLinecap="round" />
      <rect x="6" y="17" width="36" height="9" rx="2" fill={body} />
      <rect x="9" y="26" width="30" height="17" rx="2" fill={body} opacity=".92" />
      <rect x="21" y="17" width="6" height="26" fill={ribbon} />
      <rect x="6" y="17" width="36" height="3" rx="1.5" fill="#fff" opacity=".25" />
    </svg>
  )
}

function Star({ size = 20, color = '#FEB12E' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 1 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill={color} />
    </svg>
  )
}

// Quà trôi lơ lửng khắp màn hình (nền). Vị trí cố định để không nhảy giữa các lần render.
const FLOATERS = [
  { l: 4, t: 6, s: 44, d: 0, k: 'gift', c: 0 }, { l: 84, t: 4, s: 52, d: 0.6, k: 'gift', c: 2 },
  { l: 46, t: 2, s: 22, d: 1.1, k: 'star', c: 2 }, { l: 90, t: 22, s: 30, d: 0.3, k: 'star', c: 3 },
  { l: 2, t: 26, s: 56, d: 1.4, k: 'gift', c: 1 }, { l: 92, t: 40, s: 46, d: 0.9, k: 'gift', c: 3 },
  { l: 6, t: 48, s: 26, d: 0.2, k: 'star', c: 2 }, { l: 80, t: 58, s: 24, d: 1.7, k: 'star', c: 3 },
  { l: 3, t: 66, s: 50, d: 0.5, k: 'gift', c: 4 }, { l: 88, t: 72, s: 58, d: 1.2, k: 'gift', c: 0 },
  { l: 14, t: 84, s: 40, d: 1.9, k: 'gift', c: 2 }, { l: 70, t: 88, s: 36, d: 0.8, k: 'gift', c: 1 },
  { l: 48, t: 94, s: 24, d: 0.4, k: 'star', c: 2 }, { l: 30, t: 12, s: 20, d: 1.5, k: 'star', c: 3 },
]

export function FloatingGifts() {
  const reduce = useReducedMotion()
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {FLOATERS.map((f, i) => (
        <motion.div
          key={i}
          className="absolute opacity-80"
          style={{ left: `${f.l}%`, top: `${f.t}%` }}
          animate={reduce ? undefined : { y: [0, -22, 0], rotate: [-10, 10, -10] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: f.d }}
        >
          {f.k === 'gift' ? <GiftIcon size={f.s} body={BODIES[f.c]} /> : <Star size={f.s} color={f.c === 2 ? '#FEB12E' : '#FFD4E5'} />}
        </motion.div>
      ))}
    </div>
  )
}

// Mưa quà + confetti khi có kết quả.
export function GiftRain({ count = 38 }) {
  const reduce = useReducedMotion()
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: Math.random() * 100,
        size: 20 + Math.random() * 30,
        delay: Math.random() * 2.2,
        dur: 3.2 + Math.random() * 2.4,
        sway: (Math.random() - 0.5) * 120,
        kind: i % 3, // 0 quà, 1 sao, 2 mảnh giấy
        c: i % BODIES.length,
      })),
    [count],
  )
  if (reduce) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${p.x}%`, top: -70 }}
          initial={{ y: -70, opacity: 1 }}
          animate={{ y: '110vh', x: [0, p.sway, 0], rotate: 360 * (i % 2 ? 1 : -1) }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeIn', repeat: 1, repeatDelay: 0.4 }}
        >
          {p.kind === 0 && <GiftIcon size={p.size} body={BODIES[p.c]} />}
          {p.kind === 1 && <Star size={p.size * 0.7} color={BODIES[(p.c + 2) % BODIES.length]} />}
          {p.kind === 2 && <div style={{ width: 8, height: 14, background: BODIES[p.c], borderRadius: 2 }} />}
        </motion.div>
      ))}
    </div>
  )
}
