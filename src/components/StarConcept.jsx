import FadeUp from './FadeUp'
import { useLanguage } from '../context/LanguageContext'

const twinkleStars = [
  { top: '8%', left: '12%', size: 3, delay: 0, duration: 2.6 },
  { top: '15%', left: '28%', size: 2, delay: 0.6, duration: 3.2 },
  { top: '22%', left: '6%', size: 2, delay: 1.4, duration: 2.8 },
  { top: '10%', left: '48%', size: 2, delay: 2.1, duration: 3.6 },
  { top: '30%', left: '38%', size: 3, delay: 0.3, duration: 3 },
  { top: '5%', left: '68%', size: 2, delay: 1.8, duration: 2.4 },
  { top: '18%', left: '82%', size: 3, delay: 0.9, duration: 3.4 },
  { top: '38%', left: '18%', size: 2, delay: 2.5, duration: 2.9 },
  { top: '45%', left: '58%', size: 2, delay: 1.1, duration: 3.1 },
  { top: '55%', left: '10%', size: 3, delay: 0.4, duration: 2.7 },
  { top: '62%', left: '32%', size: 2, delay: 1.6, duration: 3.3 },
  { top: '70%', left: '48%', size: 2, delay: 2.3, duration: 2.5 },
  { top: '25%', left: '92%', size: 2, delay: 0.7, duration: 3.5 },
  { top: '48%', left: '78%', size: 3, delay: 1.9, duration: 2.6 },
  { top: '80%', left: '20%', size: 2, delay: 0.2, duration: 3.2 },
  { top: '85%', left: '62%', size: 2, delay: 1.3, duration: 2.8 },
  { top: '58%', left: '90%', size: 3, delay: 2.7, duration: 3 },
  { top: '35%', left: '70%', size: 2, delay: 0.5, duration: 3.4 },
]

const copy = {
  vi: {
    quote: (
      <>
        Ngôi sao mai xuất hiện sớm nhất trên bầu trời, báo hiệu một ngày mới bắt đầu. Với{' '}
        <span className="gradient-text-night">HAWEE International Trade Fair 2026</span>, đó cũng là hình ảnh khởi
        xướng cho một hành trình mới của doanh nghiệp Việt.
      </>
    ),
    attribution: '— Thông điệp dẫn dắt từ HAWEE —',
    imgAlt: 'Gian hàng HAWEE tại hội chợ — khởi đầu hành trình mới của doanh nghiệp Việt',
  },
  en: {
    quote: (
      <>
        The morning star is the first light in the sky, announcing a new day. For{' '}
        <span className="gradient-text-night">HAWEE International Trade Fair 2026</span>, it is the same image that
        marks the start of a new export journey for Vietnamese businesses.
      </>
    ),
    attribution: '— A guiding message from HAWEE —',
    imgAlt: 'HAWEE booth at the fair — the start of a new journey for Vietnamese businesses',
  },
}

export default function StarConcept() {
  const { lang } = useLanguage()
  const c = copy[lang]
  return (
    <section className="relative overflow-hidden star-sky py-14 md:py-20">
      <div className="star-field" />
      {twinkleStars.map((s, i) => (
        <span
          key={i}
          className="star-twinkle-dot"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: `0 0 ${s.size * 2}px ${s.size / 2}px rgba(255,255,255,0.85)`,
          }}
        />
      ))}
      <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10">
        <FadeUp>
          <span className="star-quote-mark">"</span>
          <p className="text-white text-xl md:text-3xl font-medium leading-relaxed md:leading-relaxed max-w-xl">
            {c.quote}
          </p>
          <p className="text-rose-200/80 text-sm uppercase tracking-widest font-semibold mt-6">{c.attribution}</p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="relative flex items-center justify-center">
            <div className="star-glow" />
            <img
              src="/concept/gian-hang-hawee.jpg"
              alt={c.imgAlt}
              className="relative z-10 w-full max-w-lg rounded-3xl star-image-mask"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
