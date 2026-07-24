// Tải script reCAPTCHA v3 (1 lần) + lấy token vô hình lúc submit, dùng để Apps Script
// verify server-side trước khi ghi vào Sheet — chặn bot POST thẳng vào Apps Script URL.
let loadPromise = null

function loadScript(siteKey) {
  if (loadPromise) return loadPromise
  loadPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha) return resolve()
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
  return loadPromise
}

export async function getRecaptchaToken(action) {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
  if (!siteKey) return null
  await loadScript(siteKey)
  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, { action }).then(resolve).catch(reject)
    })
  })
}
