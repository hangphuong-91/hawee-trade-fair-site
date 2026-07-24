import { getRecaptchaToken } from './recaptcha'

// Gửi dữ liệu tới Google Apps Script web app dạng text/plain chứa JSON.
// Lý do không dùng FormData/multipart trực tiếp: Apps Script decode sai UTF-8
// khi đọc e.parameter từ multipart, gây vỡ font tiếng Việt trong Sheet.
// Lý do không dùng Content-Type application/json: trigger CORS preflight (OPTIONS)
// mà Apps Script web app không xử lý được. text/plain tránh preflight, còn nội dung
// vẫn là JSON hợp lệ để Code.gs JSON.parse(e.postData.contents).
export async function postToAppsScript(url, form, action = 'submit') {
  if (!url) return
  const payload = Object.fromEntries(new FormData(form).entries())
  try {
    payload.recaptcha_token = await getRecaptchaToken(action)
  } catch {
    payload.recaptcha_token = null
  }
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
  })
}
