import { getRecaptchaToken } from '../lib/recaptcha'

const TIMEOUT_MS = 8000

const appsScriptUrl = () => import.meta.env.VITE_APPS_SCRIPT_URL
const formspreeId = () => import.meta.env.VITE_FORMSPREE_ID

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
  const payload = { ...fields, form_source: 'luckydraw' }
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
    err.code = json.error === 'no_prize_left' || json.error === 'invalid_input' ? json.error : 'offline'
    if (err.code === 'offline') await backupToFormspree(fields, `error:${json.error}`)
    throw err
  }

  backupToFormspree(fields, json.already_played ? 'replay' : 'ok', json.prize)
  return { prize: json.prize, code: json.code || '', alreadyPlayed: !!json.already_played }
}
