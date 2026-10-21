import { useEffect, useState } from 'react'
import DrawForm from './DrawForm'
import ResultCard from './ResultCard'
import Wheel from './Wheel'
import { FALLBACK_WHEEL, fetchWheelPrizes, spin } from './drawApi'

const MESSAGES = {
  offline:
    'Hệ thống đang bận. Thông tin của bạn đã được ghi nhận, đội ngũ HAWEE sẽ liên hệ để trao quà. Bạn cũng có thể thử lại sau ít phút.',
  no_prize_left: 'Rất tiếc, các phần quà đã được trao hết. Cảm ơn bạn đã tham gia!',
  invalid_input: 'Thông tin chưa hợp lệ, vui lòng kiểm tra lại.',
}

export default function LuckyDraw() {
  const [stage, setStage] = useState('form') // form | spinning | result
  const [wheel, setWheel] = useState(FALLBACK_WHEEL)
  const [result, setResult] = useState(null)
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const src = new URLSearchParams(window.location.search).get('src') || ''

  useEffect(() => {
    document.title = 'Quay số trúng thưởng — HAWEE International Trade Fair 2026'
    fetchWheelPrizes().then(setWheel)
  }, [])

  const onSubmit = async (fields) => {
    setBusy(true)
    setError('')
    try {
      const res = await spin({ ...fields, src })
      setEmail(fields.email)
      setResult(res)
      // Email đã quay rồi → hiện thẳng kết quả cũ, không quay lại.
      setStage(res.alreadyPlayed ? 'result' : 'spinning')
    } catch (err) {
      setError(MESSAGES[err.code] || MESSAGES.offline)
    } finally {
      setBusy(false)
    }
  }

  const reset = () => {
    setResult(null)
    setStage('form')
    fetchWheelPrizes().then(setWheel)
  }

  return (
    <main
      className="min-h-screen px-4 pb-12 pt-8 text-white"
      style={{
        background: 'radial-gradient(circle at 50% 0%, #7A1244 0%, #50002F 45%, #2B081F 100%)',
        fontFamily: 'MonaSans, Inter, sans-serif',
      }}
    >
      <header className="mb-6 text-center">
        <div className="mx-auto mb-4 w-fit rounded-2xl bg-white px-5 py-3 shadow-lg">
          <img src="/hawee-logo-final.png" alt="HAWEE — Ho Chi Minh City Association for Women Executives & Entrepreneurs" className="h-12 w-auto" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FEB12E]">HAWEE International Trade Fair 2026</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight">Quay số trúng thưởng</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-white/75">
          Quà tại các gian hàng HAWEE Pavilion và ưu đãi vé tham dự HAWEE Leaders Forum 2026.
        </p>
        <ul className="mx-auto mt-4 flex max-w-sm flex-wrap justify-center gap-2 text-xs font-semibold">
          <li className="rounded-full border border-[#FEB12E]/60 bg-white/10 px-3 py-1.5 text-[#FEB12E]">100 voucher giảm 50% vé Forum</li>
          <li className="rounded-full border border-[#FEB12E]/60 bg-white/10 px-3 py-1.5 text-[#FEB12E]">5 vé Forum miễn phí</li>
          <li className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-white/90">Quà tại gian hàng Pavilion</li>
        </ul>
      </header>

      {stage === 'form' && <DrawForm onSubmit={onSubmit} busy={busy} errorMessage={error} />}

      {stage === 'spinning' && result && (
        <div className="space-y-8">
          <Wheel prizes={wheel} target={result.prize} spinning onDone={() => setTimeout(() => setStage('result'), 600)} />
          <p className="text-center text-sm text-white/70">Đang quay… chúc bạn may mắn!</p>
        </div>
      )}

      {stage === 'result' && result && (
        <ResultCard prize={result.prize} code={result.code} alreadyPlayed={result.alreadyPlayed} email={email} onAgain={reset} />
      )}
    </main>
  )
}
