import { useEffect, useMemo, useRef } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

const R = 200 // bán kính phần vòng quay
const VIEW = 452 // khung SVG (chừa viền đèn + kim chỉ)
const C = VIEW / 2
const PALETTE = ['#C9187F', '#50002F', '#FEB12E', '#E8593A', '#7A1244', '#FB6094']
const TEXT_ON = { '#FEB12E': '#50002F', '#FB6094': '#50002F' }
const MAX_SEGMENTS = 12
const MIN_SEGMENTS = 8 // ít giải thì lặp lại để vòng quay đủ đầy, đẹp

const polar = (deg, r) => {
  const rad = ((deg - 90) * Math.PI) / 180
  return [C + r * Math.cos(rad), C + r * Math.sin(rad)]
}

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
  const base = mixed.length >= 2 ? mixed : [...mixed, ...mixed, ...mixed]
  const reps = Math.ceil(MIN_SEGMENTS / base.length)
  return Array.from({ length: reps }, () => base).flat()
}

// Nhãn ngắn, chữ lớn trên vòng quay (tối đa 2 dòng); tên đầy đủ vẫn hiện ở màn kết quả.
function labelLines(p, maxChars) {
  if (p.type === 'forum50') return ['VOUCHER 50%', 'VÉ FORUM']
  if (p.type === 'forumfree') return ['VÉ FORUM', 'MIỄN PHÍ']
  const words = p.name.split(/\s+/)
  const lines = ['']
  words.forEach((w) => {
    const cur = lines[lines.length - 1]
    if (!cur) lines[lines.length - 1] = w
    else if (`${cur} ${w}`.length <= maxChars) lines[lines.length - 1] = `${cur} ${w}`
    else if (lines.length < 2) lines.push(w)
    else lines[1] = `${lines[1]} ${w}`
  })
  return lines.slice(0, 2).map((l, i, arr) => {
    const t = i === arr.length - 1 && lines.join(' ').length > arr.join(' ').length ? `${l} …` : l
    return t.length > maxChars ? `${t.slice(0, maxChars - 1)}…` : t
  })
}

export default function Wheel({ prizes, target, phase, onFlick, onDone }) {
  const rotation = useMotionValue(0)
  const wrapRef = useRef(null)
  const drag = useRef(null)
  const speedRef = useRef(540)
  const segments = useMemo(() => buildSegments(prizes, target), [prizes, target])
  const seg = 360 / segments.length
  const fontSize = seg >= 45 ? 24 : seg >= 36 ? 21 : 19
  const maxChars = Math.floor(118 / (fontSize * 0.56))

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
    const tap = Math.abs(d.total) < 8 // chạm/click nhẹ lên vòng quay cũng tính là quay
    if (tap || Math.abs(v) > 0.25 || Math.abs(d.total) > 60) {
      speedRef.current = Math.min(1100, Math.max(540, Math.abs(v) * 1000))
      onFlick()
    }
  }

  const flickByButton = () => {
    speedRef.current = 700
    onFlick()
  }

  const bulbs = Array.from({ length: 24 }, (_, i) => polar(i * 15, R + 13))

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto select-none"
      style={{ width: 'min(94vw, 460px)', touchAction: 'none', cursor: phase === 'idle' ? 'grab' : 'default' }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="block w-full overflow-visible" style={{ filter: 'drop-shadow(0 18px 30px rgba(0,0,0,.45))' }}>
        <defs>
          <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFE7A3" />
            <stop offset=".45" stopColor="#FEB12E" />
            <stop offset="1" stopColor="#E8593A" />
          </linearGradient>
          <radialGradient id="shade" cx=".5" cy=".5" r=".5">
            <stop offset=".55" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".28" />
          </radialGradient>
          <radialGradient id="gloss" cx=".32" cy=".22" r=".7">
            <stop offset="0" stopColor="#fff" stopOpacity=".28" />
            <stop offset=".6" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hub" cx=".4" cy=".35" r=".8">
            <stop offset="0" stopColor="#7A1244" />
            <stop offset="1" stopColor="#2B081F" />
          </radialGradient>
        </defs>

        {/* viền vàng + bóng đèn */}
        <circle cx={C} cy={C} r={R + 22} fill="url(#rim)" />
        <circle cx={C} cy={C} r={R + 4} fill="#2B081F" />
        {bulbs.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.6" fill="#FFF6D6" stroke="#E8593A" strokeWidth="1" />
        ))}

        <motion.g style={{ rotate: rotation, originX: 0.5, originY: 0.5 }}>
          {segments.map((p, i) => {
            const [x1, y1] = polar(i * seg, R)
            const [x2, y2] = polar((i + 1) * seg, R)
            const fill = PALETTE[i % PALETTE.length]
            const mid = (i + 0.5) * seg
            const lines = labelLines(p, maxChars)
            const lh = fontSize * 1.12
            return (
              <g key={i}>
                <path d={`M${C},${C} L${x1},${y1} A${R},${R} 0 0 1 ${x2},${y2} Z`} fill={fill} stroke="#FFFAF9" strokeWidth="2.5" />
                <g transform={`rotate(${mid - 90} ${C} ${C})`}>
                  {lines.map((l, k) => (
                    <text
                      key={k}
                      x={C + R - 16}
                      y={C + (k - (lines.length - 1) / 2) * lh}
                      fill={TEXT_ON[fill] || '#FFFFFF'}
                      fontSize={fontSize}
                      fontWeight="700"
                      textAnchor="end"
                      dominantBaseline="central"
                      style={{
                        fontFamily: 'MonaSans, Inter, sans-serif',
                        letterSpacing: '.01em',
                        paintOrder: 'stroke',
                        stroke: TEXT_ON[fill] ? 'rgba(255,255,255,.25)' : 'rgba(43,8,31,.45)',
                        strokeWidth: 3,
                        strokeLinejoin: 'round',
                      }}
                    >
                      {l}
                    </text>
                  ))}
                </g>
              </g>
            )
          })}
        </motion.g>

        {/* ánh sáng cố định phủ lên vòng quay */}
        <circle cx={C} cy={C} r={R} fill="url(#shade)" pointerEvents="none" />
        <circle cx={C} cy={C} r={R} fill="url(#gloss)" pointerEvents="none" />
        <circle cx={C} cy={C} r={R + 1} fill="none" stroke="#FFE7A3" strokeWidth="3" />

        {/* tâm vòng quay */}
        <circle cx={C} cy={C} r="52" fill="#FEB12E" />
        <circle cx={C} cy={C} r="46" fill="url(#hub)" stroke="#FFE7A3" strokeWidth="3" />

        {/* kim chỉ */}
        <path d={`M${C - 22},4 L${C + 22},4 L${C},56 Z`} fill="#FEB12E" stroke="#50002F" strokeWidth="4" strokeLinejoin="round" />
        <circle cx={C} cy="18" r="5" fill="#50002F" />
      </svg>

      <button
        type="button"
        onClick={flickByButton}
        disabled={phase !== 'idle'}
        aria-label="Quay"
        className="absolute left-1/2 top-1/2 flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[clamp(14px,4.2vw,20px)] font-extrabold tracking-wider text-[#FEB12E] transition active:scale-90 disabled:opacity-80"
      >
        {phase === 'idle' ? 'QUAY' : '…'}
      </button>
    </div>
  )
}
