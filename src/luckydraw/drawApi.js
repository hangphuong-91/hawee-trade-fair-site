import { getRecaptchaToken } from '../lib/recaptcha'

const TIMEOUT_MS = 8000

// Biến riêng cho quay số (Config, không bí mật); fallback về biến đăng ký gian hàng cũ.
const appsScriptUrl = () => import.meta.env.VITE_LUCKYDRAW_SCRIPT_URL || import.meta.env.VITE_APPS_SCRIPT_URL
const formspreeId = () => import.meta.env.VITE_FORMSPREE_ID

const DEVICE_KEY = 'hawee_ld_device'
const RESULT_KEY = 'hawee_ld_result'
const KNOWN_ERRORS = ['no_prize_left', 'invalid_input', 'invalid_phone', 'invalid_email']

// Mã thiết bị ngẫu nhiên lưu trong trình duyệt (localStorage + cookie 1 năm) — mỗi thiết bị chỉ quay 1 lần.
export function getDeviceId() {
  let id = ''
  try {
    id = localStorage.getItem(DEVICE_KEY) || ''
  } catch {
    /* trình duyệt chặn localStorage → thử cookie */
  }
  if (!id) id = (document.cookie.match(/(?:^|; )hawee_ld_device=([\w-]+)/) || [])[1] || ''
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
  }
  try {
    localStorage.setItem(DEVICE_KEY, id)
  } catch {
    /* bỏ qua */
  }
  document.cookie = `hawee_ld_device=${id}; max-age=31536000; path=/; SameSite=Lax`
  return id
}

// Kết quả đã quay trên thiết bị này → mở lại trang là hiện ngay, không cho nhập lại.
export function getSavedResult() {
  try {
    return JSON.parse(localStorage.getItem(RESULT_KEY) || 'null')
  } catch {
    return null
  }
}

function saveResult(result) {
  try {
    localStorage.setItem(RESULT_KEY, JSON.stringify(result))
  } catch {
    /* bỏ qua */
  }
}

// Vòng quay mặc định khi chưa tải được danh sách giải từ Sheet — chỉ để hiển thị, giải thật do server chọn.
export const FALLBACK_WHEEL = [
  { name: 'Voucher giảm 50% vé Forum', type: 'forum50' },
  { name: 'Quà tại gian hàng', type: 'booth' },
  { name: 'Vé Forum miễn phí', type: 'forumfree' },
  { name: 'Quà tại gian hàng', type: 'booth' },
  { name: 'Voucher giảm 50% vé Forum', type: 'forum50' },
  { name: 'Quà tại gian hàng', type: 'booth' },
]

export async function fetchWheelPrizes() {
  const url = appsScriptUrl()
  if (!url) return FALLBACK_WHEEL
  try {
    const res = await fetch(`${url}?action=luckydraw_prizes`)
    const json = await res.json()
    return json.prizes?.length ? json.prizes : FALLBACK_WHEEL
  } catch {
    return FALLBACK_WHEEL
  }
}

// Bản sao lưu: Formspree nhận mọi lượt đăng ký, kể cả khi Apps Script lỗi (đánh dấu status).
function backupToFormspree(fields, status, prize) {
  const id = formspreeId()
  if (!id) return Promise.resolve()
  const body = new FormData()
  Object.entries(fields).forEach(([k, v]) => body.append(k, v ?? ''))
  body.append('form_source', 'luckydraw')
  body.append('status', status)
  body.append('prize', prize?.name ?? '')
  return fetch(`https://formspree.io/f/${id}`, {
    method: 'POST',
    body,
    headers: { Accept: 'application/json' },
  }).catch(() => {})
}

// Trả { prize, code, alreadyPlayed } hoặc ném lỗi với code: 'offline' | 'no_prize_left' | 'invalid_input'.
export async function spin(fields) {
  const url = appsScriptUrl()
  const payload = { ...fields, device_id: getDeviceId(), form_source: 'luckydraw' }
  try {
    payload.recaptcha_token = await getRecaptchaToken('luckydraw')
  } catch {
    payload.recaptcha_token = null
  }

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  let json
  try {
    if (!url) throw new Error('VITE_APPS_SCRIPT_URL chưa được cấu hình')
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      signal: ctrl.signal,
    })
    json = await res.json()
  } catch {
    await backupToFormspree(fields, 'offline')
    const err = new Error('offline')
    err.code = 'offline'
    throw err
  } finally {
    clearTimeout(timer)
  }

  if (json.result !== 'success') {
    const err = new Error(json.error || 'error')
    err.code = KNOWN_ERRORS.includes(json.error) ? json.error : 'offline'
    if (!['invalid_input', 'invalid_phone', 'invalid_email'].includes(err.code)) await backupToFormspree(fields, `error:${json.error}`)
    throw err
  }

  backupToFormspree(fields, json.already_played ? 'replay' : 'ok', json.prize)
  const result = { prize: json.prize, code: json.code || '', alreadyPlayed: !!json.already_played, email: fields.email }
  saveResult({ ...result, alreadyPlayed: true })
  return result
}
