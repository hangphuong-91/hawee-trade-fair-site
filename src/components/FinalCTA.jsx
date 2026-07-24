import FadeUp from './FadeUp'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    title: 'Ngôi Sao Mai Không Chờ Đợi Ai',
    body: 'Ngôi sao mai chỉ xuất hiện một lần mỗi ngày — cơ hội Early Bird của HAWEE International Trade Fair 2026 cũng vậy. Giữ chỗ hôm nay để cùng hàng trăm doanh nghiệp Việt bước vào hành trình xuất khẩu mới tại WTC Expo.',
    ctaPrimary: 'Giữ chỗ Early Bird ngay',
    ctaSecondary: 'Xem bảng giá & quyền lợi',
  },
  en: {
    title: 'The Morning Star Waits For No One',
    body: 'The morning star appears only once a day — so does the Early Bird opportunity at HAWEE International Trade Fair 2026. Reserve your spot today and join hundreds of Vietnamese businesses on a new export journey at WTC Expo.',
    ctaPrimary: 'Claim Early Bird Now',
    ctaSecondary: 'View Pricing & Benefits',
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
            <a href="#dang-ky" className="btn-white">
              {c.ctaPrimary}
            </a>
            <a href="#goi-tham-gia" className="btn-ghost-white">
              {c.ctaSecondary}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
