import { Globe2, Handshake, Store, CalendarDays, Building2, Mic2 } from 'lucide-react'
import FadeUp from './FadeUp'
import AnimatedCounter from './AnimatedCounter'
import { useLanguage } from '../context/LanguageContext'

const buyerBrands = ['Walmart', 'IKEA', 'Decathlon', 'Columbia', 'REI', 'Global Sources']

const copy = {
  vi: {
    headline: [
      { label: 'Quy mô', value: '13.381', suffix: ' m²' },
      { label: 'Lượt khách', value: '30.000', suffix: '+' },
    ],
    stats: [
      { icon: Building2, value: 700, suffix: '+', label: 'doanh nghiệp xuất khẩu tiêu biểu' },
      { icon: Store, value: 750, suffix: '', label: 'gian hàng đa dạng lĩnh vực' },
      { icon: Globe2, value: 10, suffix: '+', label: 'thị trường trọng điểm có buyer tham gia' },
      { icon: CalendarDays, value: 3, suffix: '', label: 'ngày tấp nập giao thương' },
      { icon: Mic2, value: 8, suffix: '', label: 'chương trình chuyên môn tại 3 đại sảnh' },
      { icon: Handshake, value: 500, suffix: '', label: 'cuộc gặp B2B' },
    ],
    tag: 'Con số ấn tượng',
    title: 'HAWEE Pavillon Cộng Hưởng Sức Mạnh Từ Quy Mô Hội Chợ Hàng Việt Nam Tiêu Biểu Xuất Khẩu 2026',
    intro: (
      <>
        <span className="text-white font-bold">400+ nhà mua hàng</span> từ Mỹ, EU, Nhật, Hàn, Trung Quốc, ASEAN…
        Sự kiện tự hào kết nối trực tiếp cộng đồng quản lý nguồn cung và các văn phòng thu mua hàng đầu thế giới
        như:{' '}
        {buyerBrands.map((b, i) => (
          <span key={b}>
            <span className="text-white font-bold">{b}</span>
            {i < buyerBrands.length - 1 ? ', ' : '…'}
          </span>
        ))}
      </>
    ),
    cta: 'Giữ chỗ gian hàng ngay',
  },
  en: {
    headline: [
      { label: 'Fair Size', value: '13,381', suffix: ' m²' },
      { label: 'Visitors', value: '30,000', suffix: '+' },
    ],
    stats: [
      { icon: Building2, value: 700, suffix: '+', label: 'leading Vietnamese exporters' },
      { icon: Store, value: 750, suffix: '', label: 'booths across diverse industries' },
      { icon: Globe2, value: 10, suffix: '+', label: 'key markets with buyers on-site' },
      { icon: CalendarDays, value: 3, suffix: '', label: 'days of active trade' },
      { icon: Mic2, value: 8, suffix: '', label: 'expert forums across 3 halls' },
      { icon: Handshake, value: 500, suffix: '', label: 'B2B meetings' },
    ],
    tag: 'By The Numbers',
    title: "HAWEE Pavillon Amplifies the Scale of the HO CHI MINH CITY EXPORT 2026 VIETNAM'S OUTSTANDING EXPORT PRODUCTS FAIR",
    intro: (
      <>
        <span className="text-white font-bold">400+ international buyers</span> from the US, EU, Japan, Korea,
        China, ASEAN and beyond. The fair proudly connects directly with global sourcing teams and procurement
        offices, including:{' '}
        {buyerBrands.map((b, i) => (
          <span key={b}>
            <span className="text-white font-bold">{b}</span>
            {i < buyerBrands.length - 1 ? ', ' : '…'}
          </span>
        ))}
      </>
    ),
    cta: 'Reserve Your Booth Now',
  },
}

export default function StatsStrip() {
  const { lang } = useLanguage()
  const c = copy[lang]
  return (
    <section className="relative py-14 md:py-16 overflow-hidden stats-night">
      <div className="container-custom relative z-10">
        <FadeUp className="text-center mb-8">
          <p className="text-rose-200 label-tag mb-2">{c.tag}</p>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold leading-snug text-white whitespace-normal text-balance">
            {c.title}
          </h2>
          <p className="text-rose-100/80 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-4">{c.intro}</p>
        </FadeUp>

        <FadeUp className="flex flex-wrap gap-4 justify-center mb-10">
          {c.headline.map((h) => (
            <div key={h.label} className="stat-tag rounded-2xl px-7 py-3 text-center">
              <p className="text-rose-200 text-xs uppercase tracking-widest">{h.label}</p>
              <p className="text-white text-3xl md:text-4xl font-bold">
                {h.value}
                {h.suffix}
              </p>
            </div>
          ))}
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {c.stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.05}>
              <div className="stat-card rounded-2xl px-5 py-5 flex items-center gap-4 h-full">
                <div className="w-11 h-11 rounded-full bg-gradient-hawee flex items-center justify-center shrink-0 stat-icon-glow">
                  <s.icon className="text-white" size={18} />
                </div>
                <div>
                  <div className="text-white text-2xl md:text-3xl font-bold">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-rose-100/70 text-xs leading-snug">{s.label}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="text-center mt-10">
          <a href="#dang-ky" className="btn-white">
            {c.cta}
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
