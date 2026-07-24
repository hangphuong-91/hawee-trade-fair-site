import { Phone, MapPin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const Facebook = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)
const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)
const ZaloIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zm4.5 13.75H9.25l4.25-6.25H9.25V8h7.25l-4.25 6.25H16.5v1.5z" />
  </svg>
)

const copy = {
  vi: {
    links: [
      { label: 'Doanh nghiệp tham gia', href: '#doanh-nghiep' },
      { label: 'Chuỗi hoạt động', href: '#lich-trinh' },
      { label: 'Gói tham gia & vé', href: '#goi-tham-gia' },
      { label: 'Đăng ký gian hàng', href: '#dang-ky' },
    ],
    desc: 'HAWEE International Trade Fair 2026 — nền tảng giao thương, kết nối và tạo ra hợp tác thực tế cho doanh nghiệp xuất khẩu Việt Nam.',
    sub: 'Là khu Pavillon riêng của HAWEE trong khuôn khổ "Hội chợ hàng Việt Nam tiêu biểu xuất khẩu 2026" — hội chợ quy mô lớn, tổ chức thường niên, do Sở Công Thương TP.HCM chỉ đạo và Trung tâm CSED thực hiện.',
    linksHeading: 'Liên kết',
    contactHeading: 'Liên hệ',
    address: 'Trung tâm Triển lãm Quốc tế WTC Expo, Bình Dương, TP. Hồ Chí Minh',
    copyright: (year) => `© ${year} HAWEE — Hội Nữ Doanh Nhân TP. Hồ Chí Minh. Bảo lưu mọi quyền.`,
    tagline: 'HAWEE International Trade Fair 2026',
  },
  en: {
    links: [
      { label: 'Exhibitors', href: '#doanh-nghiep' },
      { label: 'Schedule', href: '#lich-trinh' },
      { label: 'Packages & Tickets', href: '#goi-tham-gia' },
      { label: 'Reserve a Booth', href: '#dang-ky' },
    ],
    desc: 'HAWEE International Trade Fair 2026 — a trade platform that connects and creates real partnerships for Vietnamese exporters.',
    sub: 'HAWEE\'s dedicated pavillon within the "Vietnam Typical Export Products Fair 2026" — a large-scale annual fair directed by the HCMC Department of Industry and Trade and organized by CSED Center.',
    linksHeading: 'Links',
    contactHeading: 'Contact',
    address: 'WTC Expo International Exhibition Center, Binh Duong, Ho Chi Minh City',
    copyright: (year) => `© ${year} HAWEE — Ho Chi Minh City Women Entrepreneurs Association. All rights reserved.`,
    tagline: 'HAWEE International Trade Fair 2026',
  },
}

export default function Footer() {
  const { lang } = useLanguage()
  const c = copy[lang]
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-rose-500" />
      <div className="aura-blob w-[500px] h-[500px] bg-rose-300/25 -top-40 -right-20" />
      <div className="aura-blob w-[300px] h-[300px] bg-rose-200/30 bottom-0 left-1/3" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 container-custom py-16 pb-28 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <img src="/hawee-logo-white.png" alt="HAWEE" className="h-11 w-auto mb-5" />
            <p className="text-white/85 text-sm leading-relaxed max-w-md mb-2">{c.desc}</p>
            <p className="text-white/60 text-xs mb-6">{c.sub}</p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/HAWEE.VN"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-primary transition-all flex items-center justify-center backdrop-blur-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/hawee/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-primary transition-all flex items-center justify-center backdrop-blur-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://zalo.me/s/2428341045638114126/"
                target="_blank"
                rel="noreferrer"
                title="Zalo OA HAWEE"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-primary transition-all flex items-center justify-center backdrop-blur-sm"
              >
                <ZaloIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-white/70">{c.linksHeading}</h4>
            <ul className="space-y-2.5">
              {c.links.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-white/80 hover:text-white text-sm transition-colors flex items-center gap-1 hover:gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/60" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-white/70">{c.contactHeading}</h4>
            <ul className="space-y-3 text-sm text-white/85">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-white/70 flex-shrink-0 mt-0.5" />
                <a href="tel:0919479955" className="hover:text-white transition-colors">
                  0919 479 955
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/70 flex-shrink-0 mt-0.5" />
                <span>{c.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/70 text-xs">{c.copyright(new Date().getFullYear())}</p>
          <p className="text-white/60 text-xs">{c.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
