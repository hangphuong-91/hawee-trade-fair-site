import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle2, Loader2, Store } from 'lucide-react'
import VoucherShell, { formatTime, panel } from './VoucherShell'
import { fetchVoucherStatus, getSavedBooth, lookupBooth, redeemVoucher, saveBooth } from './voucherApi'

const ERRORS = {
  offline: 'Mất kết nối tới hệ thống. Kiểm tra mạng rồi bấm xác nhận lại.',
  invalid_booth: 'Không tìm thấy số gian này trong HAWEE Pavilion. Vui lòng kiểm tra lại (vd. A 12).',
  not_found: 'Không tìm thấy voucher. Kiểm tra lại mã voucher và 4 số cuối điện thoại của khách.',
  expired: 'Voucher đã hết hạn sử dụng.',
}

// Số gian nhập kiểu nào cũng được: "A12", "a 12", "A 12".
const boothKey = (v) => String(v || '').replace(/\s+/g, '').toUpperCase()

const input =
  'w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white outline-none focus:border-[#FEB12E]'
const button =
  'w-full rounded-full bg-gradient-to-r from-[#FEB12E] to-[#E8593A] py-4 text-lg font-bold text-[#50002F] shadow-lg transition active:scale-95 disabled:opacity-50'

// /voucher/use?c=<mã>&t=<mã bảo mật> — gian hàng quét QR của khách bằng camera điện thoại là vào trang này.
// Không có tham số → gian hàng nhập tay mã voucher + 4 số cuối SĐT của khách.
export default function Redeem() {
  const params = new URLSearchParams(window.location.search)
  const token = params.get('t') || ''
  const [code, setCode] = useState(params.get('c') || '')
  const [phone4, setPhone4] = useState('')
  const [voucher, setVoucher] = useState(null)
  const [loading, setLoading] = useState(!!token)
  const [booth, setBooth] = useState(getSavedBooth) // { code, name } đã xác minh
  const [boothInput, setBoothInput] = useState(booth?.code || '')
  const [boothError, setBoothError] = useState('')
  const [checkingBooth, setCheckingBooth] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(null)

  useEffect(() => {
    document.title = 'Xác nhận voucher — HAWEE Pavilion'
    if (!token) return
    fetchVoucherStatus(code, token)
      .then((v) => {
        setVoucher(v)
        if (!v) setError(ERRORS.not_found)
      })
      .catch(() => setError(ERRORS.offline))
      .finally(() => setLoading(false))
  }, [])

  const checkBooth = async () => {
    const b = boothKey(boothInput)
    if (!b || b === boothKey(booth?.code)) return
    setBooth(null)
    setBoothError('')
    setCheckingBooth(true)
    try {
      const name = await lookupBooth(b)
      if (name) {
        setBooth({ code: b, name })
        saveBooth({ code: b, name })
      } else {
        setBoothError(ERRORS.invalid_booth)
      }
    } catch {
      setBoothError(ERRORS.offline)
    } finally {
      setCheckingBooth(false)
    }
  }

  const confirm = async (e) => {
    e.preventDefault()
    if (!booth) return
    setBusy(true)
    setError('')
    try {
      const v = await redeemVoucher({ code: code.trim().toUpperCase(), token, phone4: token ? '' : phone4, boothCode: booth.code })
      setDone(v)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      if (err.code === 'already_used' && err.voucher) setVoucher(err.voucher)
      else setError(ERRORS[err.code] || ERRORS.offline)
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <VoucherShell eyebrow="Dành cho gian hàng HAWEE Pavilion" title="Đã xác nhận voucher">
        <div className={`${panel} text-center`}>
          <CheckCircle2 className="mx-auto h-20 w-20 text-[#7BE0A0]" />
          <p className="mt-3 font-mono text-3xl font-bold tracking-[0.15em] text-[#FEB12E]">{done.code}</p>
          <p className="mt-1 text-white/80">
            {done.name} · {done.phone}
          </p>
          <div className="mt-5 space-y-1 rounded-2xl bg-black/30 p-4 text-left text-sm">
            <p>
              Gian hàng: <b>{done.booth}</b>
            </p>
            <p>
              Thời gian: <b>{formatTime(done.used_at)}</b>
            </p>
            <p>
              Giá trị: <b>500.000đ</b>
            </p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Hệ thống đã ghi nhận. Gian hàng trừ 500.000đ vào hoá đơn của khách; HAWEE sẽ đối soát và thanh toán theo dữ liệu
            này.
          </p>
          <a href="/voucher/use" className="mt-5 inline-block text-sm font-semibold text-[#FEB12E] underline">
            Nhập tay voucher khác
          </a>
        </div>
      </VoucherShell>
    )
  }

  const usedAlready = voucher?.used

  return (
    <VoucherShell eyebrow="Dành cho gian hàng HAWEE Pavilion" title="Xác nhận sử dụng voucher">
      <form onSubmit={confirm} className={`${panel} space-y-5`}>
        {token ? (
          loading ? (
            <p className="flex items-center justify-center gap-2 py-6 text-white/80">
              <Loader2 className="h-5 w-5 animate-spin" /> Đang kiểm tra voucher…
            </p>
          ) : (
            voucher && (
              <div className="rounded-2xl bg-black/30 p-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">Voucher 500.000đ</p>
                <p className="mt-1 font-mono text-3xl font-bold tracking-[0.15em] text-[#FEB12E]">{voucher.code}</p>
                <p className="mt-1 text-white/85">
                  {voucher.name} · {voucher.phone}
                </p>
              </div>
            )
          )
        ) : (
          <>
            <p className="text-sm text-white/80">Không quét được QR? Nhập mã voucher trên màn hình khách và 4 số cuối điện thoại của khách.</p>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-[#FFD4E5]">Mã voucher</span>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="VC-XXXXXX"
                autoCapitalize="characters"
                className={`${input} font-mono uppercase`}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-[#FFD4E5]">4 số cuối điện thoại của khách</span>
              <input
                value={phone4}
                onChange={(e) => setPhone4(e.target.value.replace(/\D/g, '').slice(0, 4))}
                inputMode="numeric"
                className={`${input} font-mono`}
              />
            </label>
          </>
        )}

        {usedAlready ? (
          <p className="flex items-start gap-2 rounded-xl bg-[#C9187F]/30 p-4 text-sm leading-relaxed">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#FEB12E]" />
            <span>
              <b>Voucher này đã được sử dụng</b> tại {voucher.booth} lúc {formatTime(voucher.used_at)}. Không áp dụng lại.
            </span>
          </p>
        ) : (
          (voucher || !token) && (
            <>
              <label className="block">
                <span className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#FFD4E5]">
                  <Store className="h-4 w-4" /> Mã gian hàng (số gian)
                </span>
                <input
                  value={boothInput}
                  onChange={(e) => {
                    setBoothInput(e.target.value)
                    if (booth && boothKey(e.target.value) !== boothKey(booth.code)) setBooth(null)
                  }}
                  onBlur={checkBooth}
                  autoCapitalize="characters"
                  placeholder="Số gian, vd. A 12"
                  className={`${input} font-mono uppercase`}
                />
                {checkingBooth && <span className="mt-1 block text-xs text-white/70">Đang kiểm tra mã gian hàng…</span>}
                {booth && (
                  <span className="mt-2 block rounded-lg bg-[#7BE0A0]/15 px-3 py-2 text-sm text-[#7BE0A0]">
                    Gian hàng: <b>{booth.name}</b>
                  </span>
                )}
                {boothError && <span className="mt-1 block text-xs text-[#FEB12E]">{boothError}</span>}
              </label>

              <p className="text-xs leading-relaxed text-white/65">
                Voucher sẽ được ghi nhận cho gian hàng hiển thị phía trên. Gian hàng tự chịu trách nhiệm nhập đúng Mã gian
                hàng — HAWEE không chịu trách nhiệm với voucher ghi nhận sai gian do nhập nhầm mã. Mỗi voucher chỉ dùng 1 lần.
              </p>

              {error && <p className="rounded-lg bg-black/30 p-3 text-sm text-[#FEB12E]">{error}</p>}

              {booth ? (
                <button type="submit" disabled={busy || (!token && (!code.trim() || phone4.length !== 4))} className={button}>
                  {busy ? 'Đang xác nhận…' : 'Xác nhận sử dụng voucher'}
                </button>
              ) : (
                <button type="button" onClick={checkBooth} disabled={!boothInput.trim() || checkingBooth} className={button}>
                  Kiểm tra mã gian hàng
                </button>
              )}
            </>
          )
        )}

        {!voucher && token && !loading && error && <p className="rounded-lg bg-black/30 p-3 text-sm text-[#FEB12E]">{error}</p>}
      </form>
    </VoucherShell>
  )
}
