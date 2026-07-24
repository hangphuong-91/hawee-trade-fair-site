import { Sparkles } from 'lucide-react'
import FadeUp from './FadeUp'
import { signatureActivities } from '../data/highlights'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    tag: 'HAWEE International Trade Fair',
    title: 'Điểm Nhấn Tại HAWEE Pavillon',
    sub: 'Pavillon tôn vinh và nâng cao năng lực cạnh tranh của doanh nghiệp phụ nữ, hướng đến phát triển bền vững và hội nhập quốc tế.',
    banner: 'Hoạt động điểm nhấn xuyên suốt hành trình',
    cta: 'Giữ chỗ gian hàng ngay',
  },
  en: {
    tag: 'HAWEE International Trade Fair',
    title: 'Highlights At HAWEE Pavillon',
    sub: 'A pavillon that celebrates and strengthens the competitiveness of women-led businesses, driving sustainable growth and international integration.',
    banner: 'Signature Activities Throughout The Journey',
    cta: 'Reserve Your Booth Now',
  },
}

export default function StrategicHighlights() {
  const { lang } = useLanguage()
  const c = copy[lang]
  return (
    <section className="relative py-12 md:py-16 aura-section overflow-hidden">
      <img
        src="/hawee-w-watermark.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-[75%] max-w-2xl h-auto pointer-events-none select-none z-0 opacity-10"
      />
      <div className="container-custom relative z-10">
        <FadeUp className="text-center max-w-2xl mx-auto mb-10">
          <p className="label-tag mb-3">{c.tag}</p>
          <h2 className="section-title text-2xl md:text-4xl whitespace-normal text-balance">{c.title}</h2>
          <p className="text-muted text-sm">{c.sub}</p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-rose-100/50 to-primary/5 border border-primary/25 p-5 md:p-8">
            <div className="relative overflow-hidden rounded-xl -m-1 mb-4 p-1">
              <div className="light-sweep" />
              <span
                className="dawn-sparkle hidden sm:block"
                style={{ top: '4%', left: '10%', width: 5, height: 5, animationDelay: '0.2s', animationDuration: '2.8s' }}
              />
              <span
                className="dawn-sparkle hidden sm:block"
                style={{ top: '10%', right: '14%', width: 4, height: 4, animationDelay: '1.1s', animationDuration: '3.2s' }}
              />
              <span
                className="dawn-sparkle hidden sm:block"
                style={{ bottom: '6%', left: '22%', width: 3, height: 3, animationDelay: '1.8s', animationDuration: '2.5s' }}
              />
              <div className="relative z-10 flex items-center gap-2.5 justify-center py-1">
                <Sparkles size={24} className="dawn-glint text-primary shrink-0" />
                <p className="text-xl md:text-2xl font-bold text-primary whitespace-normal text-balance">
                  {c.banner}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
              {signatureActivities.map((a, i) => {
                const isLast = i === signatureActivities.length - 1
                return (
                  <div
                    key={a.label}
                    className={`bg-white rounded-xl border-2 border-primary/25 hover:border-primary transition-colors p-4 card-hover text-center ${
                      isLast ? 'col-span-2 w-1/2 mx-auto sm:col-span-1 sm:w-auto sm:mx-0' : ''
                    }`}
                  >
                    <p className="text-primary text-sm font-bold mb-1.5 leading-snug">
                      {lang === 'en' ? a.labelEn : a.label}
                    </p>
                    <p className="text-muted text-xs leading-relaxed">{lang === 'en' ? a.descEn : a.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.15} className="text-center mt-10">
          <a href="#dang-ky" className="btn-primary">
            {c.cta}
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
