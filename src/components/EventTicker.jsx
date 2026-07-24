import { useLanguage } from '../context/LanguageContext'

// Đơn vị đồng hành (theo brochure "ĐƠN VỊ ĐỒNG HÀNH") — đặt trước logo HAWEE.
const partnerLogos = [
  { src: '/logos/partners/capa.png', alt: 'CAPA' },
  { src: '/logos/partners/ffa.png', alt: 'FFA' },
  { src: '/logos/partners/hamee.png', alt: 'HAMEE' },
  { src: '/logos/partners/haua.png', alt: 'HAuA' },
  { src: '/logos/partners/vpa.png', alt: 'Vietnam Plastics Association' },
  { src: '/logos/partners/sla.png', alt: 'Hội Da Giày TP.HCM' },
  { src: '/logos/partners/rupa.png', alt: 'RUPA' },
  { src: '/logos/partners/becamex.png', alt: 'Becamex Group' },
  { src: '/logos/partners/amazon.png', alt: 'Amazon Global Selling' },
  { src: '/logos/partners/osb.png', alt: 'OSB' },
  { src: '/logos/partners/vspa.png', alt: 'Vietnam - Saigon Plastic Association' },
]

const logos = [
  { src: '/logos/so-cong-thuong-seal.jpg', alt: 'HCMC Department of Industry and Trade' },
  ...partnerLogos,
  { src: '/hawee-logo.png', alt: 'HAWEE' },
  { src: '/logos/apex-logo.png', alt: 'APEX Event' },
  { src: '/logos/bambuup-logo.png', alt: 'BambuUP' },
]

const copy = {
  vi: 'Đơn vị chỉ đạo · tổ chức · đồng hành — Hội Chợ Hàng Việt Nam Tiêu Biểu Xuất Khẩu 2026',
  en: 'Directed by · Organized by · Co-hosted by — Vietnam Typical Export Products Fair 2026',
}

export default function EventTicker() {
  const { lang } = useLanguage()
  const loop = [...logos, ...logos, ...logos, ...logos]
  return (
    <div className="bg-rose-50 overflow-hidden py-5 border-y border-rose-100">
      <p className="text-center text-gov text-[12px] font-bold uppercase tracking-widest mb-3 px-4">
        {copy[lang]}
      </p>
      <div className="flex whitespace-nowrap ticker-track w-max items-center">
        {loop.map((l, i) => (
          <span key={i} className="flex items-center gap-8 px-8 shrink-0">
            <div className="w-24 h-24 rounded-xl bg-white shadow-sm flex items-center justify-center p-1.5 shrink-0">
              <img src={l.src} alt={l.alt} className="max-w-full max-h-full object-contain" />
            </div>
            <span className="text-primary/30 text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
