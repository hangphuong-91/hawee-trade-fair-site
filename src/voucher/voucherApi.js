import { getRecaptchaToken } from '../lib/recaptcha'
import { getDeviceId } from '../luckydraw/drawApi'

const TIMEOUT_MS = 10000

// Dùng chung Web App Apps Script với quay số.
const appsScriptUrl = () => import.meta.env.VITE_LUCKYDRAW_SCRIPT_URL || import.meta.env.VITE_APPS_SCRIPT_URL

const VOUCHER_KEY = 'hawee_vc_voucher'
const BOOTH_KEY = 'hawee_vc_booth'

function readStore(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null')
  } catch {
    return null
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* bỏ qua */
  }
}

// Voucher đã nhận trên thiết bị này → mở lại trang là hiện QR ngay.
export const getSavedVoucher = () => readStore(VOUCHER_KEY)

// Mã gian hàng nhập lần trước trên điện thoại của gian hàng — lần quét sau không phải gõ lại.
export const getSavedBooth = () => readStore(BOOTH_KEY)
export const saveBooth = (booth) => writeStore(BOOTH_KEY, booth)

// Link nằm trong QR: gian hàng quét bằng camera điện thoại là mở thẳng trang xác nhận.
export const redeemUrl = ({ code, token }) =>
  `${window.location.origin}/voucher/use?c=${encodeURIComponent(code)}&t=${encodeURIComponent(token)}`

function fail(code, extra) {
  const err = new Error(code)
  err.code = code
  Object.assign(err, extra)
  return err
}

async function request(query, body) {
  const url = appsScriptUrl()
  if (!url) throw fail('offline')
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = body
      ? await fetch(url, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          signal: ctrl.signal,
        })
      : await fetch(`${url}?${new URLSearchParams(query)}`, { signal: ctrl.signal })
    return await res.json()
  } catch {
    throw fail('offline')
  } finally {
    clearTimeout(timer)
  }
}

// Trả { code, token, name, alreadyClaimed } hoặc ném lỗi: offline | no_voucher_left | invalid_* | recaptcha_failed.
export async function claimVoucher(fields) {
  const payload = { ...fields, device_id: getDeviceId(), form_source: 'voucher' }
  try {
    payload.recaptcha_token = await getRecaptchaToken('voucher')
  } catch {
    payload.recaptcha_token = null
  }
  const json = await request(null, payload)
  if (json.result !== 'success') throw fail(json.error || 'offline')
  const voucher = { code: json.code, token: json.token, name: json.name, alreadyClaimed: !!json.already_claimed }
  writeStore(VOUCHER_KEY, { ...voucher, alreadyClaimed: true })
  return voucher
}

// Trạng thái voucher: { code, name, phone, used, booth, used_at, expires_at } hoặc null nếu sai mã.
export async function fetchVoucherStatus(code, token) {
  const json = await request({ action: 'voucher_status', code, t: token })
  if (json.result !== 'success') throw fail('offline')
  return json.voucher
}

// Tên gian hàng ứng với Mã gian hàng (null nếu sai mã).
export async function lookupBooth(boothCode) {
  const json = await request({ action: 'voucher_booth', b: boothCode })
  if (json.result !== 'success') throw fail('offline')
  return json.booth
}

// Gian hàng xác nhận sử dụng. Có token (quét QR) hoặc phone4 (nhập tay). Lỗi: invalid_booth | not_found | already_used | expired | offline.
export async function redeemVoucher({ code, token, phone4, boothCode }) {
  const json = await request(null, { form_source: 'voucher_redeem', code, token, phone4, booth_code: boothCode })
  if (json.result !== 'success') throw fail(json.error || 'offline', { voucher: json.voucher })
  return json.voucher
}
