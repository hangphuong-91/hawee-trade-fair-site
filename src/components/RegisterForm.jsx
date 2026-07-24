import { useRef, useState } from 'react'
import { Check, Building2, UserRound, Ticket as TicketIcon, CheckCircle2 } from 'lucide-react'
import FadeUp from './FadeUp'
import { tickets } from '../data/packages'
import { criteria } from '../data/criteria'
import { postToAppsScript } from '../lib/appsScript'
import { useFlashSale } from '../lib/useFlashSale'
import { useLanguage } from '../context/LanguageContext'

// `value` giữ nguyên tiếng Việt ở cả 2 ngôn ngữ — đây là dữ liệu ghi vào Google Sheet,
// không nên đổi theo ngôn ngữ hiển thị để tránh lệch dữ liệu giữa các lượt đăng ký.
const industryOptions = [
  {
    value: 'Nông sản, Lương thực, Thực phẩm',
    label: 'Nhóm Ngành Nông sản, Lương thực, Thực phẩm / Agriculture, Food, and Beverage Industry Group',
  },
  {
    value: 'Thiết bị Công nghệ, Đóng gói, Bao bì, Nhãn mác, In ấn',
    label:
      'Nhóm Ngành Thiết bị Công nghệ, Đóng gói, Bao Bì, Nhãn mác, In ấn,... / Technology, Packaging, Labeling, and Printing Industry Group',
  },
  {
    value: 'Dệt May, Da Giày, Thủ công mỹ nghệ',
    label:
      'Nhóm Hàng xuất khẩu truyền thống: Dệt May, Da Giày, Thủ công mỹ nghệ,... / Traditional Export Goods Group: Textiles, Leather Footwear, Handicrafts',
  },
  {
    value: 'Dịch vụ hỗ trợ xuất khẩu (Logistics, bảo hiểm, tài chính)',
    label:
      'Nhóm Ngành Sản phẩm, Dịch vụ hỗ trợ xuất khẩu (Logistic, bảo hiểm, tài chính,...) / Supporting Industries and Services for Export (Logistics, Insurance, Finance, etc)',
  },
  { value: 'Khác', label: 'Khác / Other' },
]

const memberStatusOptions = [
  { value: 'Chi Hội Tình Thân', labelVi: 'Chi Hội Tình Thân', labelEn: 'Chi Hội Tình Thân' },
  { value: 'Chi Hội Kết Nối', labelVi: 'Chi Hội Kết Nối', labelEn: 'Chi Hội Kết Nối' },
  { value: 'Chi Hội Yêu Thương', labelVi: 'Chi Hội Yêu Thương', labelEn: 'Chi Hội Yêu Thương' },
  { value: 'Chi Hội Phát Triển', labelVi: 'Chi Hội Phát Triển', labelEn: 'Chi Hội Phát Triển' },
  { value: 'Chi Hội Tỏa Sáng', labelVi: 'Chi Hội Tỏa Sáng', labelEn: 'Chi Hội Tỏa Sáng' },
  { value: 'Chi Hội Bình Dương', labelVi: 'Chi Hội Bình Dương', labelEn: 'Chi Hội Bình Dương' },
  { value: 'Chi Hội Vũng Tàu', labelVi: 'Chi Hội Vũng Tàu', labelEn: 'Chi Hội Vũng Tàu' },
  { value: 'Chưa phải Hội viên', labelVi: 'Chưa phải Hội viên', labelEn: 'Not a HAWEE Member Yet' },
]

// Nguồn giá vé duy nhất là `src/data/packages.js` (tickets) — không khai báo lại số liệu ở đây
// để tránh lệch thông tin với section "Combo vé đăng ký hội chợ". "Quan tâm trở thành Nhà Tài trợ"
// được gộp làm 1 lựa chọn ngay trong box này (thay vì hỏi riêng) — xem SPONSOR_VALUE bên dưới.
const SPONSOR_VALUE = 'Quan tâm trở thành Nhà Tài trợ'
const SPONSOR_LABEL = { vi: SPONSOR_VALUE, en: 'I am interested in becoming a Sponsor' }
const MAX_TICKET_SELECTION = 2

function buildTicketOptions(flashActive, lang) {
  const options = tickets.map((t) => ({
    value: t.code,
    name: `${t.code} — ${lang === 'en' ? t.tagEn : t.tag} — ${lang === 'en' ? 'from' : 'từ'} ${flashActive ? t.flashSale : t.earlyBird}đ`,
    duration: lang === 'en' ? `Only ${t.slots} slots` : `Chỉ ${t.slots} suất`,
  }))
  options.push({ value: SPONSOR_VALUE, name: SPONSOR_LABEL[lang], duration: null })
  return options
}

function fieldClass() {
  return 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm'
}

const copy = {
  vi: {
    tag: 'Đăng ký tham gia',
    title: 'Đăng Ký Vé Tham Gia',
    criteriaTag: 'Tiêu chí lựa chọn doanh nghiệp',
    criteriaTitle: 'Áp dụng cho Hội viên HAWEE và Mở rộng',
    criteriaDesc:
      'Trước khi điền thông tin, doanh nghiệp bạn có thể đối chiếu nhanh với các tiêu chí bên dưới để chuẩn bị hồ sơ phù hợp nhất.',
    sentTitle: 'Thông tin đăng ký đã được gửi đi!',
    sentDesc: 'Đội ngũ HAWEE sẽ liên hệ quý Anh/ Chị trong vòng 24 giờ để hoàn tất việc đăng ký và chuẩn bị tham gia Hội chợ.',
    step1: 'Thông tin doanh nghiệp',
    companyName: 'Tên doanh nghiệp *',
    taxCode: 'Mã số thuế doanh nghiệp *',
    website: 'Website / Facebook *',
    address: 'Địa chỉ trụ sở chính *',
    exportMarkets: 'Đã xuất khẩu đến thị trường VD: Mỹ, EU, Nhật Bản, Hàn Quốc... *',
    step2: 'Thông tin người đại diện',
    contactName: 'Họ & Tên *',
    jobTitle: 'Chức vụ *',
    email: 'Email *',
    phone: 'Số điện thoại *',
    invoiceEmail: 'Email nhận Phiếu thu / Hợp đồng *',
    selectChapter: 'Chọn Chi hội',
    selectIndustry: 'Chọn lĩnh vực',
    step3: 'Chọn vé tham gia',
    ticketHint: (max) => `Chọn 1 hoặc ${max} lựa chọn (có thể chọn kèm "${SPONSOR_LABEL.vi}"). *`,
    ticketError: 'Vui lòng chọn ít nhất 1 lựa chọn ở mục trên.',
    exhibitProducts: 'Sản phẩm trưng bày tại Triển lãm (mô tả ngắn) *',
    step4: 'Xác nhận đăng ký',
    confirmNote:
      'Sau khi gửi đăng ký, đội ngũ HAWEE sẽ liên hệ để xác nhận việc đăng ký và hướng dẫn thanh toán theo thông tin anh/chị đã cung cấp.',
    consent: 'Tôi đồng ý cho HAWEE liên hệ tư vấn về thông tin đã cung cấp.',
    submitError: 'Gửi đăng ký chưa thành công, vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo/Hotline HAWEE.',
    sending: 'Đang gửi...',
    submit: 'Xác nhận đăng ký',
    freeNote: 'Đăng ký giữ chỗ miễn phí — đội ngũ HAWEE phản hồi trong 24h, không phát sinh chi phí nếu bạn thay đổi ý định.',
    recaptcha: 'Trang này được bảo vệ bởi reCAPTCHA và có áp dụng',
    privacyPolicy: 'Chính sách quyền riêng tư',
    and: 'và',
    termsOfService: 'Điều khoản dịch vụ',
    ofGoogle: 'của Google.',
  },
  en: {
    tag: 'Registration',
    title: 'Register For Your Ticket',
    criteriaTag: 'Exhibitor Selection Criteria',
    criteriaTitle: 'Open To HAWEE Members And Beyond',
    criteriaDesc:
      'Before filling out the form, quickly check your business against the criteria below to prepare the strongest application.',
    sentTitle: 'Your registration has been submitted!',
    sentDesc: 'The HAWEE team will contact you within 24 hours to complete your registration and prepare for the fair.',
    step1: 'Company Information',
    companyName: 'Company Name *',
    taxCode: 'Tax Code / Business Registration No. *',
    website: 'Website / Facebook *',
    address: 'Headquarters Address *',
    exportMarkets: 'Export Markets, e.g. US, EU, Japan, Korea... *',
    step2: 'Representative Information',
    contactName: 'Full Name *',
    jobTitle: 'Job Title *',
    email: 'Email *',
    phone: 'Phone Number *',
    invoiceEmail: 'Email For Invoice / Contract *',
    selectChapter: 'Select HAWEE Chapter',
    selectIndustry: 'Select Industry',
    step3: 'Select Your Ticket',
    ticketHint: (max) => `Choose 1 or ${max} options (you may also select "${SPONSOR_LABEL.en}"). *`,
    ticketError: 'Please select at least one option above.',
    exhibitProducts: 'Products To Exhibit (brief description) *',
    step4: 'Confirm Registration',
    confirmNote:
      'After you submit, the HAWEE team will contact you to confirm your registration and guide you through payment.',
    consent: 'I agree to be contacted by HAWEE regarding the information provided.',
    submitError: 'Your registration could not be sent. Please try again or contact HAWEE directly via Zalo/Hotline.',
    sending: 'Sending...',
    submit: 'Confirm Registration',
    freeNote: "Reserving your spot is free — the HAWEE team replies within 24 hours, at no cost if you change your mind.",
    recaptcha: 'This site is protected by reCAPTCHA and the Google',
    privacyPolicy: 'Privacy Policy',
    and: 'and',
    termsOfService: 'Terms of Service',
    ofGoogle: 'apply.',
  },
}

// 4 bước phản ánh đúng trình tự thật khi điền form (thông tin → phân loại → chọn vé → xác nhận) —
// đánh số ở đây có ý nghĩa thật (thứ tự thao tác), không phải trang trí.
function StepSection({ n, icon: Icon, title, isLast, children }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0">
        <span className="w-8 h-8 rounded-full bg-gradient-hawee flex items-center justify-center text-white text-xs font-bold shrink-0">
          {n}
        </span>
        {!isLast && <span className="w-px flex-1 bg-rose-100 my-2" />}
      </div>
      <div className={`flex-1 min-w-0 ${isLast ? '' : 'pb-8'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Icon size={16} className="text-primary shrink-0" />
          <h4 className="font-semibold text-dark text-sm uppercase tracking-wide">{title}</h4>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  )
}

function CriteriaPanel({ lang, c }) {
  return (
    <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-rose-50 panel-depth p-7 md:p-8">
      <p className="label-tag mb-3">{c.criteriaTag}</p>
      <h3 className="font-semibold text-dark text-xl md:text-2xl leading-snug mb-2">{c.criteriaTitle}</h3>
      <p className="text-muted text-sm leading-relaxed mb-2">{c.criteriaDesc}</p>

      <div className="divide-y divide-rose-50">
        {criteria.map((cr) => (
          <div key={cr.title} className="flex items-start gap-4 py-5">
            <div className="w-11 h-11 rounded-xl bg-gradient-hawee flex items-center justify-center shrink-0">
              <cr.icon className="text-white" size={19} />
            </div>
            <div>
              <h4 className="font-semibold text-dark text-sm mb-1.5 leading-snug">
                {lang === 'en' ? cr.titleEn : cr.title}
              </h4>
              <p className="text-muted text-xs leading-relaxed">{lang === 'en' ? cr.descEn : cr.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RegisterForm() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [ticketError, setTicketError] = useState(false)
  const ticketSectionRef = useRef(null)
  const { active: flashActive } = useFlashSale()
  const { lang } = useLanguage()
  const c = copy[lang]
  const ticketOptions = buildTicketOptions(flashActive, lang)

  function toggleOption(value) {
    setTicketError(false)
    setSelectedOptions((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value)
      if (prev.length >= MAX_TICKET_SELECTION) return prev
      return [...prev, value]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedOptions.length === 0) {
      setTicketError(true)
      ticketSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
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
      // Ghi vào Google Sheet đăng ký (2 sheet: gian hàng / tài trợ) — xem google-apps-script/README.md
      appsScriptUrl ? postToAppsScript(appsScriptUrl, form) : Promise.reject(new Error('VITE_APPS_SCRIPT_URL chưa được cấu hình')),
    ])

    // Chỉ báo thành công khi ít nhất 1 trong 2 kênh (Formspree hoặc Google Sheet) nhận được —
    // tránh hiển thị "đã gửi" giả khi cả 2 đều thất bại âm thầm (vd. thiếu env var).
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
    <section id="dang-ky" className="py-12 md:py-16">
      <div className="container-custom max-w-6xl">
        <FadeUp className="text-center max-w-2xl mx-auto mb-10">
          <p className="label-tag mb-3">{c.tag}</p>
          <h2 className="section-title text-2xl md:text-4xl whitespace-normal text-balance">{c.title}</h2>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        <FadeUp className="lg:col-span-5 order-2 lg:order-1">
          <CriteriaPanel lang={lang} c={c} />
        </FadeUp>

        <FadeUp className="lg:col-span-7 order-1 lg:order-2">
          {sent ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-rose-50 panel-depth">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-semibold text-dark mb-2">{c.sentTitle}</h3>
              <p className="text-muted text-sm">{c.sentDesc}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-rose-50 panel-depth p-6 md:p-8">
              <input type="hidden" name="form_source" value="Đăng ký gian hàng" />

              <StepSection n={1} icon={Building2} title={c.step1}>
                <input name="company" required placeholder={c.companyName} className={fieldClass()} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="tax_code" required placeholder={c.taxCode} className={fieldClass()} />
                  <input name="website" required placeholder={c.website} className={fieldClass()} />
                </div>
                <input name="address" required placeholder={c.address} className={fieldClass()} />
                <input
                  name="export_markets"
                  required
                  placeholder={c.exportMarkets}
                  className={fieldClass()}
                />
              </StepSection>

              <StepSection n={2} icon={UserRound} title={c.step2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="contact_name" required placeholder={c.contactName} className={fieldClass()} />
                  <input name="job_title" required placeholder={c.jobTitle} className={fieldClass()} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="email" type="email" required placeholder={c.email} className={fieldClass()} />
                  <input name="phone" required placeholder={c.phone} className={fieldClass()} />
                </div>
                <input
                  name="invoice_email"
                  type="email"
                  required
                  placeholder={c.invoiceEmail}
                  className={fieldClass()}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select name="member_status" required className={`${fieldClass()} text-gray-500`}>
                    <option value="">{c.selectChapter}</option>
                    {memberStatusOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {lang === 'en' ? o.labelEn : o.labelVi}
                      </option>
                    ))}
                  </select>
                  <select name="industry_group" required className={`${fieldClass()} text-gray-500`}>
                    <option value="">{c.selectIndustry}</option>
                    {industryOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </StepSection>

              <StepSection n={3} icon={TicketIcon} title={c.step3}>
                <p className="text-muted text-xs">{c.ticketHint(MAX_TICKET_SELECTION)}</p>
                <div
                  ref={ticketSectionRef}
                  className={`space-y-3 rounded-xl ${ticketError ? 'ring-2 ring-red-400 ring-offset-2' : ''}`}
                >
                  {ticketOptions.map((t) => {
                    const checked = selectedOptions.includes(t.value)
                    const disabled = !checked && selectedOptions.length >= MAX_TICKET_SELECTION
                    return (
                      <label
                        key={t.value}
                        className={`block rounded-xl border p-4 transition-colors ${
                          checked
                            ? 'border-primary bg-primary/5 cursor-pointer'
                            : disabled
                              ? 'border-gray-100 opacity-50 cursor-not-allowed'
                              : 'border-gray-200 hover:border-primary/40 cursor-pointer'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={disabled}
                          onChange={() => toggleOption(t.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border-2 ${
                              checked ? 'bg-primary border-primary' : 'border-gray-300'
                            }`}
                          >
                            {checked && <Check size={11} className="text-white" />}
                          </span>
                          <span className="font-semibold text-dark text-sm">{t.name}</span>
                          {t.duration && (
                            <span className="text-[12px] text-primary font-medium bg-primary/10 rounded-full px-2 py-0.5">
                              {t.duration}
                            </span>
                          )}
                        </div>
                      </label>
                    )
                  })}
                </div>
                {ticketError && (
                  <p className="text-xs text-red-600">{c.ticketError}</p>
                )}
                <input
                  type="hidden"
                  name="ticket_type"
                  value={selectedOptions.filter((v) => v !== SPONSOR_VALUE).join(', ')}
                />
                <input
                  type="hidden"
                  name="sponsor_interest"
                  value={selectedOptions.includes(SPONSOR_VALUE) ? 'Có' : ''}
                />

                <textarea
                  name="exhibit_products"
                  required
                  rows={2}
                  placeholder={c.exhibitProducts}
                  className={`${fieldClass()} resize-none`}
                />
              </StepSection>

              <StepSection n={4} icon={CheckCircle2} title={c.step4} isLast>
                <div className="rounded-xl bg-rose-50/60 border border-rose-100 p-5 space-y-4">
                  <p className="text-muted text-xs leading-relaxed">{c.confirmNote}</p>

                  <label className="flex items-start gap-2 text-xs text-muted">
                    <input type="checkbox" name="consent" required className="mt-0.5" />
                    {c.consent}
                  </label>

                  {error && (
                    <p className="text-xs text-center text-red-600 bg-red-50 border border-red-100 rounded-lg py-2.5 px-3">
                      {c.submitError}
                    </p>
                  )}

                  <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-50">
                    {loading ? c.sending : c.submit}
                  </button>
                  <p className="text-muted text-xs text-center">{c.freeNote}</p>
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
                </div>
              </StepSection>
            </form>
          )}
        </FadeUp>
        </div>
      </div>
    </section>
  )
}
