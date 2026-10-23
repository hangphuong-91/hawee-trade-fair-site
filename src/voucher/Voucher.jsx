import { useEffect, useState } from 'react'
import { CalendarClock, Clock, Store, Ticket } from 'lucide-react'
import DrawForm from '../luckydraw/DrawForm'
import VoucherCard from './VoucherCard'
import VoucherShell, { panel } from './VoucherShell'
import { claimVoucher, getSavedVoucher } from './voucherApi'

const MESSAGES = {
  offline: 'Hệ thống đang bận, vui lòng thử lại sau ít phút.',
  no_voucher_left: 'Rất tiếc, 50 voucher đã được nhận hết. Cảm ơn bạn đã quan tâm đến HAWEE Pavilion!',
  invalid_input: 'Thông tin chưa hợp lệ, vui lòng kiểm tra lại.',
  invalid_phone: 'Số điện thoại chưa đúng. Vui lòng nhập số di động Việt Nam (10 số, bắt đầu bằng 03, 05, 07, 08 hoặc 09).',
  invalid_email: 'Email này không nhận được thư. Vui lòng nhập email bạn đang dùng.',
  paused: 'Voucher hôm nay đã được nhận hết. Hệ thống mở lại lúc 9:00 sáng 24/10, mời bạn quay lại nhé!',
  recaptcha_failed: 'Hệ thống chưa xác minh được trình duyệt của bạn. Vui lòng tải lại trang và thử lại.',
}

// Tạm khoá phát voucher mới tới 9:00 24/10 (phát hiện gian lận 23/10) — khớp VC_PAUSED_UNTIL trong Code.gs.
const PAUSED_UNTIL = new Date('2026-10-24T09:00:00+07:00').getTime()

const PERKS = [
  { icon: Ticket, text: 'Chỉ 50 suất' },
  { icon: Store, text: '56 gian hàng' },
  { icon: CalendarClock, text: 'Dùng đến 24.10' },
]

function Hero() {
  return (
    <div className="mt-7 text-center">
      <p className="vc-chip">HAWEE Pavilion · 22–24.10 · WTC Expo</p>
      <p className="vc-display mt-5 text-[26px] leading-none">Nhận ngay voucher</p>
      <p className="vc-display vc-gold-text mt-1 whitespace-nowrap text-[clamp(44px,15vw,76px)] leading-[1.05]">500.000đ</p>
      <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-white/90">
        Mua sắm sản phẩm Việt tại các gian hàng <b className="text-[#FFC83D]">HAWEE Pavilion</b>
      </p>

      <ul className="mt-5 grid grid-cols-3 gap-2">
        {PERKS.map(({ icon: Icon, text }) => (
          <li key={text} className="flex flex-col items-center gap-1.5 rounded-2xl border border-[#FFC83D]/40 bg-[#140C3D]/85 px-2 py-3">
            <Icon className="h-6 w-6 text-[#FFC83D]" strokeWidth={2.2} />
            <span className="text-[12px] font-bold leading-tight">{text}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-6 h-[190px]">
        <img src="/voucher/pavilion.jpg" alt="Lối vào HAWEE Pavilion" className="vc-photo absolute left-0 top-2 h-[160px] w-[62%] -rotate-3" />
        <img src="/voucher/booth.jpg" alt="Khách tham quan gian hàng HAWEE Pavilion" className="vc-photo absolute right-0 top-8 h-[150px] w-[52%] rotate-3" />
      </div>
    </div>
  )
}

// /voucher — khách điền thông tin để nhận 1 voucher 500.000đ (tối đa 50), nhận xong hiện QR cho gian hàng quét.
export default function Voucher() {
  const [voucher, setVoucher] = useState(getSavedVoucher) // thiết bị này đã nhận → hiện lại voucher cũ
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [fields, setFields] = useState(null)
  const src = new URLSearchParams(window.location.search).get('src') || ''

  const [paused, setPaused] = useState(() => Date.now() < PAUSED_UNTIL)

  useEffect(() => {
    document.title = 'Nhận voucher 500.000đ — HAWEE Pavilion'
  }, [])

  // Trang đang mở lúc 9:00 → tự mở lại form, không cần tải lại.
  useEffect(() => {
    if (!paused) return
    const t = setTimeout(() => setPaused(false), Math.min(PAUSED_UNTIL - Date.now(), 2 ** 31 - 1))
    return () => clearTimeout(t)
  }, [paused])

  const onSubmit = async (values) => {
    setFields(values)
    setBusy(true)
    setError('')
    try {
      setVoucher(await claimVoucher({ ...values, src }))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      if (err.code === 'paused') setPaused(true)
      else setError(MESSAGES[err.code] || MESSAGES.offline)
    } finally {
      setBusy(false)
    }
  }

  if (voucher) {
    return (
      <VoucherShell eyebrow="HAWEE Pavilion · WTC Expo" title="Voucher của bạn">
        <VoucherCard voucher={voucher} />
      </VoucherShell>
    )
  }

  if (paused) {
    return (
      <VoucherShell hero={<Hero />}>
        <div className={`${panel} text-center`}>
          <Clock className="mx-auto h-12 w-12 text-[#FFC83D]" strokeWidth={2.2} />
          <p className="vc-display mt-3 text-[22px] leading-tight">Voucher hôm nay đã hết</p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/90">
            Hệ thống sẽ mở lại lúc <b className="text-[#FFC83D]">9:00 sáng thứ Sáu, 24/10</b>. Mời bạn quay lại trang này để nhận
            voucher 500.000đ nhé!
          </p>
          <p className="mt-4 text-[13px] text-white/70">Đã nhận voucher? Mở lại trang này trên đúng điện thoại đã nhận để xem mã QR.</p>
        </div>
      </VoucherShell>
    )
  }

  return (
    <VoucherShell hero={<Hero />}>
      <div className={panel}>
        <p className="vc-display text-center text-[20px]">Điền thông tin – nhận mã ngay</p>
        <p className="mb-5 mt-1 text-center text-[13px] text-white/80">Mất chưa tới 30 giây. Mã QR hiện ngay trên màn hình.</p>
        <DrawForm
          onSubmit={onSubmit}
          busy={busy}
          errorMessage={error}
          initial={fields || undefined}
          submitLabel="Nhận voucher 500.000đ"
          consent="Tôi đồng ý để HAWEE lưu thông tin này để phát hành và đối soát voucher. Mỗi khách (mỗi điện thoại, số điện thoại và email) nhận 1 voucher."
        />
      </div>
      <ol className="mt-6 space-y-3 text-[14px] text-white/90">
        {['Điền thông tin, nhận mã QR', 'Chọn sản phẩm ở gian hàng HAWEE Pavilion', 'Đưa QR cho gian hàng quét, giảm ngay 500.000đ'].map((t, i) => (
          <li key={t} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFC83D] font-extrabold text-[#4A0B3E]">{i + 1}</span>
            {t}
          </li>
        ))}
      </ol>
    </VoucherShell>
  )
}
