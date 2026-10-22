// Khung chung cho 2 trang voucher (khách nhận / gian hàng xác nhận) — cùng tông với trang quay số.
export default function VoucherShell({ eyebrow = 'HAWEE International Trade Fair 2026', title, subtitle, children }) {
  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 pb-12 pt-8 text-white"
      style={{
        background: 'radial-gradient(circle at 50% 0%, #7A1244 0%, #50002F 45%, #2B081F 100%)',
        fontFamily: 'MonaSans, Inter, sans-serif',
      }}
    >
      <header className="mb-6 text-center">
        <div className="mx-auto mb-4 w-fit rounded-2xl bg-white px-5 py-3 shadow-lg">
          <img src="/hawee-logo-final.png" alt="HAWEE — Ho Chi Minh City Association for Women Executives & Entrepreneurs" className="h-12 w-auto" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FEB12E]">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-white/85">{subtitle}</p>}
      </header>
      <div className="mx-auto w-full max-w-md">{children}</div>
    </main>
  )
}

export const panel = 'rounded-3xl border border-white/15 bg-white/[.06] p-5 shadow-2xl backdrop-blur'

// 14:32, 23/10/2026 — luôn theo giờ Việt Nam dù điện thoại đặt múi giờ khác.
export function formatTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const time = d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' })
  const date = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })
  return `${time}, ${date}`
}
