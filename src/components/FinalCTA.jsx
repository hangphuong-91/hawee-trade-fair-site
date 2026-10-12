import FadeUp from './FadeUp'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    title: 'Ngôi Sao Mai Đã Toả Sáng',
    body: 'Hơn 80 doanh nghiệp Việt đã sẵn sàng cho hành trình xuất khẩu mới tại HAWEE International Trade Fair 2026, 22–24/10 tại WTC Expo. Xem hồ sơ từng doanh nghiệp trước khi hội chợ khai mạc.',
    ctaPrimary: 'Xem Hồ Sơ Doanh Nghiệp',
  },
  en: {
    title: 'The Morning Star Has Risen',
    body: 'More than 80 Vietnamese businesses are ready for a new export journey at HAWEE International Trade Fair 2026, Oct 22–24 at WTC Expo. Browse each business profile before the fair opens.',
    ctaPrimary: 'View Business Profiles',
  },
}

export default function FinalCTA() {
  const { lang } = useLanguage()
  const c = copy[lang]
  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-gradient-hawee">
      <div className="absolute inset-0 dot-texture opacity-25" />
      <div className="light-sweep" />
      <div className="container-custom relative z-10 text-center">
        <FadeUp>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 whitespace-normal text-balance">
            {c.title}
          </h2>
          <p className="text-white/85 max-w-xl mx-auto mb-8">{c.body}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/ho-so-doanh-nghiep.html" className="btn-white">
              {c.ctaPrimary}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
