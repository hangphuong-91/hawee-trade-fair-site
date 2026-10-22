import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { CheckCircle2 } from 'lucide-react'
import { fetchVoucherStatus, redeemUrl } from './voucherApi'
import { formatTime } from './VoucherShell'

const POLL_MS = 15000 // khách đang mở QR → tự chuyển sang "Đã sử dụng" ngay sau khi gian hàng quét

export default function VoucherCard({ voucher }) {
  const [qr, setQr] = useState('')
  const [status, setStatus] = useState(null)

  useEffect(() => {
    QRCode.toDataURL(redeemUrl(voucher), { width: 480, margin: 1, errorCorrectionLevel: 'M' }).then(setQr)
  }, [voucher])

  useEffect(() => {
    let alive = true
    let timer
    const tick = async () => {
      try {
        const s = await fetchVoucherStatus(voucher.code, voucher.token)
        if (alive && s) setStatus(s)
        if (s?.used) return
      } catch {
        /* mất mạng tạm thời → thử lại lượt sau */
      }
      if (alive) timer = setTimeout(tick, POLL_MS)
    }
    tick()
    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [voucher])

  const used = status?.used

  return (
    <div className="vc-card p-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#FFC83D]">
        {voucher.alreadyClaimed ? 'Voucher của bạn' : 'Chúc mừng! Bạn đã nhận voucher'}
      </p>
      <h2 className="mt-2 text-2xl font-bold text-white">Voucher mua sắm 500.000đ</h2>
      {voucher.name && <p className="mt-1 text-sm text-white/75">Dành cho {voucher.name}</p>}

      <div className="relative mx-auto mt-5 w-fit rounded-2xl bg-white p-3">
        {qr ? (
          <img src={qr} alt={`Mã QR voucher ${voucher.code}`} className={`h-56 w-56 ${used ? 'opacity-20' : ''}`} />
        ) : (
          <div className="h-56 w-56" />
        )}
        {used && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rotate-[-8deg] rounded-xl border-4 border-[#C9187F] bg-white/90 px-4 py-2 text-xl font-bold uppercase tracking-widest text-[#C9187F]">
              Đã sử dụng
            </span>
          </div>
        )}
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-white/70">Mã voucher</p>
      <p className="mt-1 font-mono text-3xl font-bold tracking-[0.15em] text-[#FFC83D]">{voucher.code}</p>

      {used ? (
        <p className="mt-4 flex items-start justify-center gap-2 rounded-xl bg-black/30 p-3 text-left text-sm text-white/90">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FFC83D]" />
          <span>
            Đã sử dụng tại <b>{status.booth}</b> lúc {formatTime(status.used_at)}.
          </span>
        </p>
      ) : (
        <ol className="mt-5 space-y-2 text-left text-sm leading-relaxed text-white/85">
          <li>1. Chọn sản phẩm tại bất kỳ gian hàng nào trong HAWEE Pavilion.</li>
          <li>2. Khi thanh toán, đưa màn hình này để nhân viên gian hàng <b>quét mã QR</b>.</li>
          <li>3. Gian hàng xác nhận xong, voucher được trừ 500.000đ vào hoá đơn.</li>
        </ol>
      )}

      <p className="mt-5 text-xs leading-relaxed text-white/60">
        Mỗi voucher chỉ dùng 1 lần, không quy đổi thành tiền mặt. Hãy chụp màn hình để lưu lại — mở lại trang này trên
        cùng điện thoại cũng sẽ thấy voucher.
        {status?.expires_at && ` Hạn sử dụng: ${formatTime(status.expires_at)}.`}
      </p>
    </div>
  )
}
