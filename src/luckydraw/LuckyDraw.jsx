import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DrawForm from './DrawForm'
import ResultCard from './ResultCard'
import Wheel from './Wheel'
import { FloatingGifts, GiftRain } from './Gifts'
import { FALLBACK_WHEEL, fetchWheelPrizes, spin } from './drawApi'

const MESSAGES = {
  offline:
    'Hệ thống đang bận. Thông tin của bạn đã được ghi nhận, đội ngũ HAWEE sẽ liên hệ để trao quà. Bạn cũng có thể thử lại sau ít phút.',
  no_prize_left: 'Rất tiếc, các phần quà đã được trao hết. Cảm ơn bạn đã tham gia!',
  invalid_input: 'Thông tin chưa hợp lệ, vui lòng kiểm tra lại.',
}

const MIN_SPIN_MS = 1500 // vòng quay luôn quay ít nhất chừng này trước khi giảm tốc, dù server trả nhanh
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export default function LuckyDraw() {
  const [stage, setStage] = useState('form') // form | play | result
  const [phase, setPhase] = useState('idle') // idle | spinning | landing (chỉ dùng ở stage play)
  const [wheel, setWheel] = useState(FALLBACK_WHEEL)
  const [fields, setFields] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const src = new URLSearchParams(window.location.search).get('src') || ''

  useEffect(() => {
    document.title = 'Quay số trúng thưởng — HAWEE International Trade Fair 2026'
    fetchWheelPrizes().then(setWheel)
  }, [])

  const onSubmit = (values) => {
    setFields(values)
    setError('')
    setStage('play')
  }

  // Người chơi vuốt/kéo vòng quay (hoặc bấm QUAY) → xin giải từ server trong lúc vòng quay đang quay.
  const onFlick = async () => {
    if (phase !== 'idle') return
    setPhase('spinning')
    const started = Date.now()
    try {
      const res = await spin({ ...fields, src })
      if (res.alreadyPlayed) {
        // Email đã quay rồi → hiện thẳng kết quả cũ.
        setResult(res)
        setPhase('idle')
        setStage('result')
        return
      }
      await sleep(Math.max(0, MIN_SPIN_MS - (Date.now() - started)))
      setResult(res)
      setPhase('landing')
    } catch (err) {
      setError(MESSAGES[err.code] || MESSAGES.offline)
      setPhase('idle')
      setStage('form')
    }
  }

  const onLanded = () =>
    setTimeout(() => {
      setStage('result')
      setPhase('idle')
    }, 700)

  const reset = () => {
    setFields((f) => ({ ...f, email: '' })) // giữ thông tin người chơi, chỉ nhập lại email khác
    setResult(null)
    setError('')
    setStage('form')
    fetchWheelPrizes().then(setWheel)
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 pb-12 pt-8 text-white"
      style={{
        background: 'radial-gradient(circle at 50% 0%, #7A1244 0%, #50002F 45%, #2B081F 100%)',
        fontFamily: 'MonaSans, Inter, sans-serif',
      }}
    >
      <FloatingGifts />
      {stage === 'result' && <GiftRain />}

      <div className="relative z-10">
        <header className="mb-6 text-center">
          <div className="mx-auto mb-4 w-fit rounded-2xl bg-white px-5 py-3 shadow-lg">
            <img src="/hawee-logo-final.png" alt="HAWEE — Ho Chi Minh City Association for Women Executives & Entrepreneurs" className="h-12 w-auto" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FEB12E]">HAWEE International Trade Fair 2026</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight">Quay số trúng thưởng</h1>
          <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-white/85">
            Quà tại các gian hàng HAWEE Pavilion và vé tham dự HAWEE Leaders Forum 2026 trị giá <b className="text-[#FEB12E]">2.000.000đ</b>
          </p>
        </header>

        {stage === 'form' && (
          <div className="mx-auto w-full max-w-md rounded-3xl border border-white/15 bg-white/[.06] p-5 shadow-2xl backdrop-blur">
            <DrawForm onSubmit={onSubmit} errorMessage={error} initial={fields || undefined} />
          </div>
        )}

        {stage === 'play' && (
          <div className="space-y-8 pt-3">
            <Wheel prizes={wheel} target={result?.prize} phase={phase} onFlick={onFlick} onDone={onLanded} />
            <motion.p
              className="text-center text-base font-semibold text-[#FEB12E]"
              animate={phase === 'idle' ? { opacity: [1, 0.55, 1], y: [0, -4, 0] } : { opacity: 1 }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              {phase === 'idle' && 'Chạm vào vòng quay, vuốt tay, hoặc bấm nút QUAY ở giữa để quay'}
              {phase === 'spinning' && 'Đang quay… chúc bạn may mắn!'}
              {phase === 'landing' && 'Sắp có kết quả…'}
            </motion.p>
          </div>
        )}

        {stage === 'result' && result && (
          <ResultCard prize={result.prize} code={result.code} alreadyPlayed={result.alreadyPlayed} email={fields?.email || ''} onAgain={reset} />
        )}
      </div>
    </main>
  )
}
