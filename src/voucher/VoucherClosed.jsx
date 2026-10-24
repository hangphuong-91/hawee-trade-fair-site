import { useEffect } from 'react'
import { PartyPopper } from 'lucide-react'
import VoucherShell, { panel } from './VoucherShell'

// Chương trình voucher đã kết thúc — /voucher và /voucher/use đều hiện trang này (Apps Script cũng chặn nhận & xác nhận).
export default function VoucherClosed() {
  useEffect(() => {
    document.title = 'Chương trình voucher đã kết thúc — HAWEE Pavilion'
  }, [])

  return (
    <VoucherShell eyebrow="HAWEE Pavilion · WTC Expo" title="Chương trình đã kết thúc">
      <div className={`${panel} text-center`}>
        <PartyPopper className="mx-auto h-12 w-12 text-[#FFC83D]" strokeWidth={2.2} />
        <p className="vc-display mt-3 text-[22px] leading-tight">Cảm ơn bạn đã đồng hành!</p>
        <p className="mt-3 text-[15px] leading-relaxed text-white/90">
          Chương trình voucher mua sắm 500.000đ tại <b className="text-[#FFC83D]">HAWEE Pavilion</b> đã khép lại. Cảm ơn bạn
          đã ghé thăm và ủng hộ hàng Việt tại HAWEE International Trade Fair 2026.
        </p>
        <p className="mt-4 text-[14px] text-white/75">Hẹn gặp lại bạn ở những sự kiện tiếp theo của HAWEE!</p>
        <a
          href="/"
          className="mt-5 inline-block rounded-full bg-gradient-to-r from-[#FFE08A] to-[#F59E0B] px-6 py-3 text-sm font-extrabold uppercase text-[#4A0B3E]"
        >
          Về trang HAWEE Trade Fair
        </a>
      </div>
    </VoucherShell>
  )
}
