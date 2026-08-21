import FadeUp from './FadeUp'
import { useLanguage } from '../context/LanguageContext'

// Nhà tài trợ chính thức đã xác nhận (khác với các gói tài trợ đang chào bán trong Packages.jsx).
const silverSponsors = [
  { name: 'Công ty Cổ Phần Quốc Tế Hoa Doanh', logo: '/logos/sponsors/hoa-doanh.jpg' },
]

// Đối tác triển khai vận hành sự kiện (không phải nhà tài trợ tài chính).
const implementationPartners = [
  { name: 'Công ty TNHH Apex Media', logo: '/logos/apex-logo.png' },
  { name: 'Công ty Cổ Phần BambuUP', logo: '/logos/bambuup-logo.png' },
]

const copy = {
  vi: {
    tag: 'Đơn Vị Tài Trợ',
    title: 'Đồng Hành Cùng HAWEE International Trade Fair 2026',
    silverBadge: 'Nhà Tài Trợ Bạc',
    implementTitle: 'Đối Tác Triển Khai',
  },
  en: {
    tag: 'Sponsors',
    title: 'Proudly Supported By',
    silverBadge: 'Silver Sponsor',
    implementTitle: 'Implementation Partners',
  },
}

export default function Sponsors() {
  const { lang } = useLanguage()
  const c = copy[lang]

  return (
    <section id="tai-tro" className="py-14 md:py-20 stats-night relative overflow-hidden">
      {/* Đường phân cách gợn sóng thay viền thẳng ở đầu section — 1 đường cong duy nhất, biên độ nhẹ,
          bất đối xứng cho cảm giác thanh lịch, kèm 1 sợi chỉ vàng mảnh dọc theo đường cong. Cuối section
          (giáp báo chí) để phẳng, không viền — tránh 2 đường sóng liên tiếp gây rối mắt. */}
      <svg
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-8 md:h-12 pointer-events-none"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path fill="#FFFAF9" d="M0,0 L1440,0 L1440,18 C1100,52 340,-4 0,26 Z" />
        <path
          d="M0,26 C340,-4 1100,52 1440,18"
          fill="none"
          stroke="#FEB12E"
          strokeOpacity="0.4"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Spotlight vàng phía sau card Nhà Tài Trợ Bạc — kéo trọng tâm thị giác về section này */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(254,177,46,0.22) 0%, rgba(254,177,46,0) 70%)' }}
      />

      <div className="container-custom relative z-10">
        <FadeUp className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-rose-200 font-semibold text-sm md:text-base uppercase tracking-widest mb-3">{c.tag}</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white whitespace-normal text-balance">{c.title}</h2>
        </FadeUp>

        <FadeUp className="flex flex-wrap justify-center gap-5 mb-10">
          {silverSponsors.map((s) => (
            <div
              key={s.name}
              className="p-[3px] rounded-2xl bg-gradient-to-br from-slate-200 via-white to-slate-400 shadow-[0_0_45px_rgba(254,177,46,0.35)] max-w-[230px] w-full card-hover"
            >
              <div className="relative bg-white rounded-2xl px-5 pt-6 pb-4 flex flex-col items-center h-full">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold uppercase tracking-wide text-white bg-gradient-to-r from-slate-400 to-slate-500 rounded-full px-4 py-1 shadow">
                  {c.silverBadge}
                </span>
                <img src={s.logo} alt={s.name} className="h-[120px] w-[120px] object-contain mt-2 mb-2.5" />
                <p className="text-dark text-sm font-semibold text-center leading-snug">{s.name}</p>
              </div>
            </div>
          ))}
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-center text-rose-100/70 text-[12px] font-semibold uppercase tracking-widest mb-5">
            {c.implementTitle}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {implementationPartners.map((p) => (
              <div
                key={p.name}
                className="max-w-[230px] w-full rounded-2xl bg-white shadow-sm border border-rose-100 flex flex-col items-center p-5 card-hover"
              >
                <img src={p.logo} alt={p.name} className="h-[120px] w-[120px] object-contain mb-2.5" />
                <p className="text-dark text-sm font-semibold text-center leading-snug">{p.name}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
