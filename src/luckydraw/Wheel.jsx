import { useEffect, useMemo, useRef } from 'react'
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

export default function Wheel({ prizes, target, phase, onFlick, onDone }) {
  const rotation = useMotionValue(0)
  const wrapRef = useRef(null)
  const drag = useRef(null)
  const speedRef = useRef(540)
  const segments = useMemo(() => buildSegments(prizes, target), [prizes, target])
  const seg = 360 / segments.length

  // idle: trôi chậm mời gọi; spinning: quay liên tục chờ server; landing: giảm tốc dừng đúng giải.
  useEffect(() => {
    if (phase !== 'idle' && phase !== 'spinning') return
    let raf
    let last = performance.now()
    const tick = (now) => {
      const dt = (now - last) / 1000
      last = now
      if (phase === 'spinning') rotation.set(rotation.get() + speedRef.current * dt)
      else if (!drag.current) rotation.set(rotation.get() + 8 * dt)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase, rotation])

  useEffect(() => {
    if (phase !== 'landing' || !target) return
    const matches = segments.map((p, i) => (p.name === target.name ? i : -1)).filter((i) => i >= 0)
    const idx = matches[Math.floor(Math.random() * matches.length)]
    const desired = 360 - (idx + 0.5) * seg + (Math.random() - 0.5) * seg * 0.6
    const cur = rotation.get()
    const delta = (((desired - cur) % 360) + 360) % 360
    const controls = animate(rotation, cur + 360 * 4 + delta, { duration: 4.5, ease: [0.15, 0.7, 0.1, 1], onComplete: onDone })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, target])

  const angleOf = (e) => {
    const r = wrapRef.current.getBoundingClientRect()
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI
  }
  const onDown = (e) => {
    if (phase !== 'idle' || e.target.closest('button')) return
    wrapRef.current.setPointerCapture(e.pointerId)
    drag.current = { last: angleOf(e), total: 0, samples: [{ t: performance.now(), a: rotation.get() }] }
  }
  const onMove = (e) => {
    const d = drag.current
    if (!d) return
    const a = angleOf(e)
    let delta = a - d.last
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360
    d.last = a
    d.total += delta
    rotation.set(rotation.get() + delta)
    d.samples.push({ t: performance.now(), a: rotation.get() })
    if (d.samples.length > 8) d.samples.shift()
  }
  const onUp = () => {
    const d = drag.current
    drag.current = null
    if (!d) return
    const first = d.samples[0]
    const last = d.samples[d.samples.length - 1]
    const fresh = performance.now() - last.t < 120
    const v = fresh ? (last.a - first.a) / Math.max(last.t - first.t, 1) : 0 // độ/ms
    if (Math.abs(v) > 0.25 || Math.abs(d.total) > 60) {
      speedRef.current = Math.min(1100, Math.max(540, Math.abs(v) * 1000))
      onFlick()
    }
  }

  const flickByButton = () => {
    speedRef.current = 700
    onFlick()
  }

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto select-none"
      style={{ width: SIZE, maxWidth: '88vw', touchAction: 'none', cursor: phase === 'idle' ? 'grab' : 'default' }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <div
        className="absolute left-1/2 -top-3 z-10 -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: '16px solid transparent',
          borderRight: '16px solid transparent',
          borderTop: '32px solid #FEB12E',
          filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.5))',
        }}
      />
      <div className="rounded-full p-2" style={{ background: 'linear-gradient(135deg,#FEB12E,#E8593A)', boxShadow: '0 0 40px rgba(254,177,46,.45)' }}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="block w-full overflow-hidden rounded-full">
          <motion.g style={{ rotate: rotation, originX: 0.5, originY: 0.5 }}>
            {segments.map((p, i) => {
              const [x1, y1] = polar(i * seg, R)
              const [x2, y2] = polar((i + 1) * seg, R)
              const fill = PALETTE[i % PALETTE.length]
              const [tx, ty] = polar((i + 0.5) * seg, R * 0.62)
              return (
                <g key={i}>
                  <path d={`M${R},${R} L${x1},${y1} A${R},${R} 0 0 1 ${x2},${y2} Z`} fill={fill} stroke="#FFFAF9" strokeWidth="1.5" />
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
          </motion.g>
        </svg>
      </div>
      <button
        type="button"
        onClick={flickByButton}
        disabled={phase !== 'idle'}
        aria-label="Quay"
        className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#FEB12E] bg-[#50002F] text-base font-extrabold tracking-wider text-[#FEB12E] shadow-xl transition active:scale-90 disabled:opacity-80"
      >
        {phase === 'idle' ? 'QUAY' : '…'}
      </button>
    </div>
  )
}
