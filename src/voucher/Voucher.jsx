import { useEffect, useState } from 'react'
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
  recaptcha_failed: 'Hệ thống chưa xác minh được trình duyệt của bạn. Vui lòng tải lại trang và thử lại.',
}

// /voucher — khách điền thông tin để nhận 1 voucher 500.000đ (tối đa 50), nhận xong hiện QR cho gian hàng quét.
export default function Voucher() {
  const [voucher, setVoucher] = useState(getSavedVoucher) // thiết bị này đã nhận → hiện lại voucher cũ
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [fields, setFields] = useState(null)
  const src = new URLSearchParams(window.location.search).get('src') || ''

  useEffect(() => {
    document.title = 'Nhận voucher 500.000đ — HAWEE Pavilion'
  }, [])

  const onSubmit = async (values) => {
    setFields(values)
    setBusy(true)
    setError('')
    try {
      setVoucher(await claimVoucher({ ...values, src }))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(MESSAGES[err.code] || MESSAGES.offline)
    } finally {
      setBusy(false)
    }
  }

  return (
    <VoucherShell
      title="Voucher mua sắm 500.000đ"
      subtitle={
        <>
          Áp dụng tại các gian hàng <b className="text-[#FEB12E]">HAWEE Pavilion</b>. Số lượng có hạn: chỉ{' '}
          <b className="text-[#FEB12E]">50 voucher</b>.
        </>
      }
    >
      {voucher ? (
        <VoucherCard voucher={voucher} />
      ) : (
        <div className={panel}>
          <DrawForm
            onSubmit={onSubmit}
            busy={busy}
            errorMessage={error}
            initial={fields || undefined}
            submitLabel="Nhận voucher"
            consent="Tôi đồng ý để HAWEE lưu thông tin này để phát hành và đối soát voucher. Mỗi khách (mỗi điện thoại, số điện thoại và email) nhận 1 voucher."
          />
        </div>
      )}
    </VoucherShell>
  )
}
