import { useState } from 'react'
import { Handshake } from 'lucide-react'
import FadeUp from './FadeUp'
import { cashSponsorships, inKindSponsorships } from '../data/packages'
import { postToAppsScript } from '../lib/appsScript'
import { useLanguage } from '../context/LanguageContext'

function buildPackageOptions(lang) {
  return [
    ...cashSponsorships.map((s) => `${lang === 'en' ? s.tierEn : s.tier} (${lang === 'en' ? s.priceEn : s.price})`),
    ...inKindSponsorships.map((k) => (lang === 'en' ? k.groupEn : k.group)),
    lang === 'en' ? 'Not sure yet — need advice' : 'Chưa chắc chắn — cần tư vấn',
  ]
}

function fieldClass() {
  return 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm bg-white'
}

const copy = {
  vi: {
    sentTitle: 'Đã gửi đăng ký thành công!',
    sentDesc: 'Đội ngũ HAWEE sẽ liên hệ tư vấn gói tài trợ phù hợp trong 24 giờ.',
    heading: 'Bạn quan tâm trở thành Nhà Tài trợ?',
    sub: 'Để lại thông tin, đội ngũ HAWEE sẽ liên hệ tư vấn gói tài trợ phù hợp trong 24 giờ.',
    name: 'Họ & Tên *',
    company: 'Tên Doanh nghiệp *',
    packageLabel: 'Gói tài trợ quan tâm *',
    phone: 'Số điện thoại *',
    email: 'Email *',
    error: 'Gửi đăng ký chưa thành công, vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo/Hotline HAWEE.',
    sending: 'Đang gửi...',
    submit: 'Đăng ký làm Nhà Tài trợ',
    recaptcha: 'Trang này được bảo vệ bởi reCAPTCHA và có áp dụng',
    privacyPolicy: 'Chính sách quyền riêng tư',
    and: 'và',
    termsOfService: 'Điều khoản dịch vụ',
    ofGoogle: 'của Google.',
  },
  en: {
    sentTitle: 'Your registration was sent successfully!',
    sentDesc: 'The HAWEE team will reach out with sponsorship package guidance within 24 hours.',
    heading: 'Interested In Becoming A Sponsor?',
    sub: 'Leave your details and the HAWEE team will reach out with sponsorship package guidance within 24 hours.',
    name: 'Full Name *',
    company: 'Company Name *',
    packageLabel: 'Sponsorship Package of Interest *',
    phone: 'Phone Number *',
    email: 'Email *',
    error: 'Your registration could not be sent. Please try again or contact HAWEE directly via Zalo/Hotline.',
    sending: 'Sending...',
    submit: 'Register As A Sponsor',
    recaptcha: 'This site is protected by reCAPTCHA and the Google',
    privacyPolicy: 'Privacy Policy',
    and: 'and',
    termsOfService: 'Terms of Service',
    ofGoogle: 'apply.',
  },
}

export default function SponsorCTA() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { lang } = useLanguage()
  const c = copy[lang]
  const packageOptions = buildPackageOptions(lang)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const form = e.target
    const data = new FormData(form)
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID
    const appsScriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL

    const results = await Promise.allSettled([
      formspreeId
        ? fetch(`https://formspree.io/f/${formspreeId}`, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' },
          })
        : Promise.reject(new Error('VITE_FORMSPREE_ID chưa được cấu hình')),
      // Ghi vào sheet "Đăng ký tài trợ" — xem google-apps-script/README.md
      appsScriptUrl ? postToAppsScript(appsScriptUrl, form) : Promise.reject(new Error('VITE_APPS_SCRIPT_URL chưa được cấu hình')),
    ])

    const formspreeOk = results[0].status === 'fulfilled' && results[0].value.ok
    const appsScriptOk = results[1].status === 'fulfilled'
    const anyOk = formspreeOk || appsScriptOk

    setLoading(false)
    if (anyOk) {
      setSent(true)
    } else {
      setError(true)
    }
  }

  return (
    <FadeUp className="mt-10">
      <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-rose-100/50 to-primary/5 border border-primary/25 p-6 sm:p-8">
        {sent ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-semibold text-dark mb-1">{c.sentTitle}</h3>
            <p className="text-muted text-sm">{c.sentDesc}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 justify-center mb-1.5">
              <Handshake size={18} className="text-primary" />
              <p className="text-base md:text-lg font-bold text-primary">{c.heading}</p>
            </div>
            <p className="text-muted text-sm text-center mb-6">{c.sub}</p>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3">
              <input type="hidden" name="form_source" value="Đăng ký tài trợ" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="contact_name" required placeholder={c.name} className={fieldClass()} />
                <input name="company" required placeholder={c.company} className={fieldClass()} />
              </div>
              <select name="sponsor_package" required className={`${fieldClass()} text-gray-500`}>
                <option value="">{c.packageLabel}</option>
                {packageOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="phone" required placeholder={c.phone} className={fieldClass()} />
                <input name="email" type="email" required placeholder={c.email} className={fieldClass()} />
              </div>

              {error && (
                <p className="text-xs text-center text-red-600 bg-red-50 border border-red-100 rounded-lg py-2.5 px-3">
                  {c.error}
                </p>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-50">
                {loading ? c.sending : c.submit}
              </button>
              <p className="text-muted text-[12px] text-center">
                {c.recaptcha}{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">
                  {c.privacyPolicy}
                </a>{' '}
                {c.and}{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline">
                  {c.termsOfService}
                </a>{' '}
                {c.ofGoogle}
              </p>
            </form>
          </>
        )}
      </div>
    </FadeUp>
  )
}
