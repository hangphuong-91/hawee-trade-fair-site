import { useState } from 'react'

const FIELDS = [
  { name: 'contact_name', label: 'Họ và tên', type: 'text', autoComplete: 'name' },
  { name: 'job_title', label: 'Chức vụ', type: 'text', autoComplete: 'organization-title' },
  { name: 'company', label: 'Công ty', type: 'text', autoComplete: 'organization' },
  { name: 'phone', label: 'Số điện thoại', type: 'tel', autoComplete: 'tel', inputMode: 'tel' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', inputMode: 'email' },
]

const PHONE_RE = /^(0|\+?84)\d{9}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v) {
  const errors = {}
  FIELDS.forEach((f) => {
    if (!v[f.name]?.trim()) errors[f.name] = 'Vui lòng nhập thông tin này'
  })
  if (!errors.phone && !PHONE_RE.test(v.phone.replace(/[\s.-]/g, ''))) errors.phone = 'Số điện thoại chưa đúng định dạng'
  if (!errors.email && !EMAIL_RE.test(v.email.trim())) errors.email = 'Email chưa đúng định dạng'
  return errors
}

export default function DrawForm({ onSubmit, busy, errorMessage }) {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [agree, setAgree] = useState(true)

  const handle = (e) => {
    e.preventDefault()
    // Honeypot: bot điền field ẩn này thì bỏ qua âm thầm.
    if (new FormData(e.target).get('company_website_2')) return
    const errs = validate(values)
    if (!agree) errs.agree = 'Vui lòng đồng ý để tham gia'
    setErrors(errs)
    if (Object.keys(errs).length) return
    onSubmit({
      ...Object.fromEntries(FIELDS.map((f) => [f.name, values[f.name].trim()])),
      phone: values.phone.replace(/[\s.-]/g, ''),
    })
  }

  return (
    <form onSubmit={handle} noValidate className="mx-auto w-full max-w-md space-y-4 text-left">
      {FIELDS.map((f) => (
        <label key={f.name} className="block">
          <span className="mb-1 block text-sm font-semibold text-[#FFD4E5]">{f.label}</span>
          <input
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            inputMode={f.inputMode}
            value={values[f.name] ?? ''}
            onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white outline-none focus:border-[#FEB12E]"
          />
          {errors[f.name] && <span className="mt-1 block text-xs text-[#FEB12E]">{errors[f.name]}</span>}
        </label>
      ))}
      <input
        type="text"
        name="company_website_2"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
      />
      <label className="flex items-start gap-3 text-xs text-white/70">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#C9187F]" />
        <span>Tôi đồng ý để HAWEE lưu thông tin này nhằm trao quà và liên hệ gửi mã ưu đãi.</span>
      </label>
      {errors.agree && <p className="text-xs text-[#FEB12E]">{errors.agree}</p>}
      {errorMessage && <p className="rounded-lg bg-black/30 p-3 text-sm text-[#FEB12E]">{errorMessage}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-full bg-gradient-to-r from-[#FEB12E] to-[#E8593A] py-4 text-lg font-bold text-[#50002F] shadow-lg transition active:scale-95 disabled:opacity-60"
      >
        {busy ? 'Đang xử lý…' : 'Quay ngay'}
      </button>
    </form>
  )
}
