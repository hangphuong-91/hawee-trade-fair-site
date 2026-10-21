import { useEffect, useMemo } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

const SIZE = 320
const R = SIZE / 2
const PALETTE = ['#C9187F', '#50002F', '#FEB12E', '#E8593A', '#7A1244', '#FB6094']
const TEXT_ON = { '#FEB12E': '#50002F', '#FB6094': '#50002F' }
const MAX_SEGMENTS = 12

const polar = (deg, r) => {
  const rad = ((deg - 90) * Math.PI) / 180
  return [R + r * Math.cos(rad), R + r * Math.sin(rad)]
}

const shorten = (s) => (s.length > 18 ? `${s.slice(0, 17)}…` : s)

// Chọn các nhãn hiển thị: luôn giữ giải Forum (voucher 50% + vé miễn phí) trên vòng, rồi trộn xen kẽ
// với quà gian hàng cho đẹp; đảm bảo giải trúng luôn có mặt để vòng quay dừng đúng.
export function buildSegments(prizes, target) {
  const forum = prizes.filter((p) => p.type === 'forum50' || p.type === 'forumfree')
  const others = prizes.filter((p) => p.type !== 'forum50' && p.type !== 'forumfree')
  const picked = [...forum, ...others.slice(0, Math.max(0, MAX_SEGMENTS - forum.length))].slice(0, MAX_SEGMENTS)
  if (target && !picked.some((p) => p.name === target.name)) {
    picked[picked.length - 1] = target
  }
  // Xen kẽ: rải đều giải Forum giữa các quà khác.
  const forumPicked = picked.filter((p) => p.type === 'forum50' || p.type === 'forumfree')
  const rest = picked.filter((p) => !forumPicked.includes(p))
  const step = forumPicked.length ? Math.ceil(picked.length / forumPicked.length) : Infinity
  const mixed = []
  let fi = 0
  let ri = 0
  for (let i = 0; i < picked.length; i++) {
    if (fi < forumPicked.length && (i % step === 0 || ri >= rest.length)) mixed.push(forumPicked[fi++])
    else mixed.push(rest[ri++])
  }
  return mixed.length >= 2 ? mixed : [...mixed, ...mixed, ...mixed]
}

export default function Wheel({ prizes, target, spinning, onDone }) {
  const rotation = useMotionValue(0)
  const segments = useMemo(() => buildSegments(prizes, target), [prizes, target])
  const seg = 360 / segments.length

  useEffect(() => {
    if (!spinning || !target) return
    // Nhiều ô trùng tên → chọn ngẫu nhiên 1 ô trong số đó cho tự nhiên.
    const matches = segments.map((p, i) => (p.name === target.name ? i : -1)).filter((i) => i >= 0)
    const idx = matches[Math.floor(Math.random() * matches.length)]
    const jitter = (Math.random() - 0.5) * seg * 0.6
    const finalDeg = 360 * 6 + (360 - (idx + 0.5) * seg) + jitter
    const controls = animate(rotation, finalDeg, {
      duration: 5,
      ease: [0.12, 0.7, 0.1, 1],
      onComplete: onDone,
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, target])

  return (
    <div className="relative mx-auto" style={{ width: SIZE, maxWidth: '88vw' }}>
      <div
        className="absolute left-1/2 -top-2 z-10 -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: '14px solid transparent',
          borderRight: '14px solid transparent',
          borderTop: '28px solid #FEB12E',
          filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.5))',
        }}
      />
      <div className="rounded-full p-2" style={{ background: 'linear-gradient(135deg,#FEB12E,#E8593A)' }}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="block w-full overflow-hidden rounded-full">
          <motion.g style={{ rotate: rotation, originX: 0.5, originY: 0.5 }}>
            {segments.map((p, i) => {
              const [x1, y1] = polar(i * seg, R)
              const [x2, y2] = polar((i + 1) * seg, R)
              const fill = PALETTE[i % PALETTE.length]
              const [tx, ty] = polar((i + 0.5) * seg, R * 0.62)
              return (
                <g key={i}>
                  <path
                    d={`M${R},${R} L${x1},${y1} A${R},${R} 0 0 1 ${x2},${y2} Z`}
                    fill={fill}
                    stroke="#FFFAF9"
                    strokeWidth="1.5"
                  />
                  <text
                    x={tx}
                    y={ty}
                    fill={TEXT_ON[fill] || '#FFFAF9'}
                    fontSize="11"
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${(i + 0.5) * seg} ${tx} ${ty})`}
                  >
                    {shorten(p.name)}
                  </text>
                </g>
              )
            })}
            <circle cx={R} cy={R} r="22" fill="#50002F" stroke="#FEB12E" strokeWidth="4" />
          </motion.g>
        </svg>
      </div>
    </div>
  )
}
