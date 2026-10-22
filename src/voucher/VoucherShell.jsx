import '@fontsource/be-vietnam-pro/500.css'
import '@fontsource/be-vietnam-pro/700.css'
import '@fontsource/be-vietnam-pro/800.css'
import '@fontsource/be-vietnam-pro/900.css'
import './voucher.css'

// Dải ribbon hồng → cam → vàng uốn lượn, lấy từ banner "Cùng đi hội chợ" (HIF_Banner Treo 4mx2m).
function Ribbon({ className, flip }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <defs>
        <linearGradient id={`vc-rib-${flip ? 'b' : 't'}`} x1="0" x2="1">
          <stop offset="0" stopColor="#FF2E93" />
          <stop offset="0.55" stopColor="#D6237F" />
          <stop offset="0.8" stopColor="#FF7A3D" />
          <stop offset="1" stopColor="#FFC83D" />
        </linearGradient>
      </defs>
      <path d="M0 70 C 90 20, 170 115, 260 62 S 370 30, 400 52 L400 84 C 360 64, 320 100, 250 96 S 90 60, 0 104 Z" fill={`url(#vc-rib-${flip ? 'b' : 't'})`} opacity="0.9" />
      <path d="M0 58 C 100 10, 180 100, 270 50 S 370 18, 400 40" stroke="#FFC83D" strokeWidth="1.5" fill="none" opacity="0.8" />
    </svg>
  )
}

// Khung chung cho 2 trang voucher — mood & tone theo banner HAWEE Pavilion: nền xanh tím than, quầng hồng,
// ribbon hồng–cam, viền vàng, chữ trắng đậm. `hero` = khối nội dung lớn phía trên (chỉ trang khách dùng).
export default function VoucherShell({ eyebrow, title, subtitle, hero, children }) {
  return (
    <main className="vc-page relative min-h-screen overflow-hidden px-4 pb-36 pt-6 text-white">
      <div className="vc-dots pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
      <Ribbon className="pointer-events-none absolute -left-10 top-[300px] h-28 w-[140%] opacity-80" />
      <Ribbon className="pointer-events-none absolute -right-10 bottom-0 h-32 w-[140%]" flip />

      <div className="relative z-10 mx-auto w-full max-w-md">
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-white px-2 py-1.5 shadow-lg">
              <img src="/voucher/expo-logo.png" alt="HCM City Export 2026" className="h-8 w-auto" />
            </span>
            <span className="rounded-xl bg-white px-3 py-2 shadow-lg">
              <img src="/hawee-logo-final.png" alt="HAWEE" className="h-6 w-auto" />
            </span>
          </div>
          <img src="/voucher/dawn-of-trade.png" alt="Leading the Dawn of Trade" className="h-12 w-auto" />
        </header>

        {hero || (
          <div className="mt-8 text-center">
            {eyebrow && <p className="vc-chip mx-auto w-fit">{eyebrow}</p>}
            <h1 className="vc-display mt-4 text-[32px] leading-tight">{title}</h1>
            {subtitle && <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-white/85">{subtitle}</p>}
          </div>
        )}

        <div className="mt-7">{children}</div>
      </div>
    </main>
  )
}

export const panel = 'vc-card p-5'

// 14:32, 23/10/2026 — luôn theo giờ Việt Nam dù điện thoại đặt múi giờ khác.
export function formatTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const time = d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' })
  const date = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })
  return `${time}, ${date}`
}
