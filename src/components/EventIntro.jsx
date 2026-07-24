import { MapPin, CalendarDays } from 'lucide-react'
import FadeUp from './FadeUp'
import EarlyBirdCountdown from './EarlyBirdCountdown'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    bannerAlt: 'Hội chợ Hàng Việt Nam tiêu biểu xuất khẩu năm 2026',
    heading: (
      <>
        HAWEE International Trade Fair{' '}
        <span className="text-primary">thuộc khuôn khổ</span>{' '}
        <span className="block sm:inline text-[14px] sm:text-lg md:text-2xl">
          "Hội chợ hàng Việt Nam tiêu biểu xuất khẩu 2026"
        </span>
      </>
    ),
    sub: 'Nơi tia sáng đầu tiên của một hành trình xuất khẩu mới bắt đầu — do Sở Công Thương TP.HCM chủ trì.',
    date: '22 – 24/10/2026',
    location: 'WTC Expo, Bình Dương',
    ctaPrimary: 'Giữ chỗ gian hàng ngay',
    ctaSecondary: 'Khám phá doanh nghiệp tham gia',
  },
  en: {
    bannerAlt: 'Vietnam Typical Export Products Fair 2026',
    heading: (
      <>
        HAWEE International Trade Fair{' '}
        <span className="text-primary">held within</span>{' '}
        <span className="block sm:inline text-[14px] sm:text-lg md:text-2xl">
          the "Vietnam Typical Export Products Fair 2026"
        </span>
      </>
    ),
    sub: 'Where the first light of a new export journey begins — hosted by the HCMC Department of Industry and Trade.',
    date: 'Oct 22 – 24, 2026',
    location: 'WTC Expo, Binh Duong',
    ctaPrimary: 'Reserve Your Booth Now',
    ctaSecondary: 'Meet Our Exhibitors',
  },
}

export default function EventIntro() {
  const { lang } = useLanguage()
  const c = copy[lang]
  return (
    <section className="py-5 md:py-7 aura-section">
      <div className="container-custom text-center">
        <FadeUp>
          <div className="rounded-xl md:rounded-2xl border-2 border-gov/15 panel-depth overflow-hidden mb-5">
            <img
              src="/hcm-export-banner.jpg"
              alt={c.bannerAlt}
              className="w-full h-auto block"
            />
          </div>

          <h1 className="text-xl md:text-3xl font-semibold text-dark leading-snug max-w-2xl mx-auto">
            {c.heading}
          </h1>
          <p className="text-muted italic mt-3 mx-auto max-w-xs sm:max-w-xl text-xs sm:text-sm md:text-base text-balance">
            {c.sub}
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="flex flex-wrap gap-3 justify-center mt-5">
            <div className="bg-white shadow-sm rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 text-dark text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <CalendarDays size={15} className="text-primary shrink-0" />
                {c.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <MapPin size={15} className="text-primary shrink-0" />
                {c.location}
              </span>
            </div>
            <EarlyBirdCountdown />
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="flex flex-wrap gap-3 justify-center mt-5">
            <a href="#dang-ky" className="btn-primary">
              {c.ctaPrimary}
            </a>
            <a href="#doanh-nghiep" className="btn-outline">
              {c.ctaSecondary}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
