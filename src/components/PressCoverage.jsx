import { useRef } from 'react'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import FadeUp from './FadeUp'
import { pressArticles } from '../data/press'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    tag: 'Truyền thông',
    title: 'Báo Chí Đưa Tin',
    prev: 'Xem bài trước',
    next: 'Xem bài tiếp theo',
    read: 'Đọc bài viết',
  },
  en: {
    tag: 'Media',
    title: 'Press Coverage',
    prev: 'Previous article',
    next: 'Next article',
    read: 'Read article',
  },
}

export default function PressCoverage() {
  const trackRef = useRef(null)
  const { lang } = useLanguage()
  const c = copy[lang]

  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-press-card]')
    const step = card ? card.offsetWidth + 16 : 280
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="py-8 md:py-10">
      <div className="container-custom">
        <FadeUp className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className="label-tag mb-2">{c.tag}</p>
            <h2 className="text-xl md:text-2xl font-bold text-dark">{c.title}</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label={c.prev}
              className="w-9 h-9 rounded-full border border-rose-200 text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label={c.next}
              className="w-9 h-9 rounded-full border border-rose-200 text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </FadeUp>

        <FadeUp>
          <div ref={trackRef} className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-1">
            {pressArticles.map((a) => (
              <a
                key={a.url}
                data-press-card
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="group shrink-0 snap-start w-[75%] sm:w-[42%] lg:w-[23%] rounded-xl overflow-hidden bg-white card-hover border border-rose-50"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={a.image}
                    alt={lang === 'en' ? a.titleEn : a.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-primary text-[12px] font-semibold uppercase tracking-wide">{a.source}</span>
                    <span className="text-muted text-[12px]">{a.date}</span>
                  </div>
                  <h3 className="font-semibold text-dark text-xs leading-snug mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                    {lang === 'en' ? a.titleEn : a.title}
                  </h3>
                  <span className="text-primary text-[12px] font-medium inline-flex items-center gap-1">
                    {c.read} <ExternalLink size={10} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
