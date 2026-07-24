import { TrendingUp } from 'lucide-react'
import FadeUp from './FadeUp'
import { highlightBlocks, pastResults } from '../data/hcmExportHighlights'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    kicker: 'Hội Chợ Hàng Việt Nam Tiêu Biểu Xuất Khẩu 2026',
    title: 'Điểm Nổi Bật Tại HCMC Export 2026',
    resultsKicker: 'Hội Chợ Hàng Việt Nam Tiêu Biểu Xuất Khẩu',
    resultsTitle: 'Kết Quả Nổi Bật Từ Năm Trước',
  },
  en: {
    kicker: 'Vietnam Typical Export Products Fair 2026',
    title: 'Highlights of HCMC Export 2026',
    resultsKicker: 'Vietnam Typical Export Products Fair',
    resultsTitle: 'Results From The Previous Edition',
  },
}

export default function HcmExportHighlights() {
  const { lang } = useLanguage()
  const c = copy[lang]
  return (
    <section className="py-12 md:py-16 gov-section">
      <div className="container-custom">
        <FadeUp className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-gov font-semibold text-sm md:text-base uppercase tracking-widest mb-3">{c.kicker}</p>
          <h2 className="section-title text-2xl md:text-4xl whitespace-normal text-balance">{c.title}</h2>
        </FadeUp>

        <div className="space-y-10 mb-10">
          {highlightBlocks.map((block, bi) => (
            <FadeUp key={block.n} delay={bi * 0.08}>
              <div className="flex items-start gap-4 mb-5">
                <span className="w-11 h-11 rounded-full bg-gov ring-2 ring-primary/25 flex items-center justify-center text-white font-bold shrink-0">
                  {block.n}
                </span>
                <div>
                  <h3 className="font-semibold text-dark text-lg leading-snug mb-1">
                    {lang === 'en' ? block.titleEn : block.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{lang === 'en' ? block.descEn : block.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {block.photos.map((p) => (
                  <div key={p} className="rounded-xl overflow-hidden card-hover">
                    <img
                      src={`/concept/hcmc-highlights/${p}.jpg`}
                      alt={lang === 'en' ? block.titleEn : block.title}
                      className="w-full h-28 sm:h-36 object-cover"
                    />
                  </div>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gov-deep via-gov to-gov-deep p-7 md:p-10">
            <div className="absolute inset-0 dot-texture opacity-20 pointer-events-none" />
            <TrendingUp
              size={220}
              strokeWidth={1}
              className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none select-none"
            />
            <div className="relative z-10 flex flex-col items-center gap-2 text-center mb-7 md:mb-9">
              <span className="w-12 h-12 rounded-full bg-gov-gold/20 ring-2 ring-gov-gold/60 flex items-center justify-center mb-1">
                <TrendingUp size={22} className="text-gov-gold shrink-0" />
              </span>
              <p className="text-gov-gold text-[12px] md:text-xs font-bold uppercase tracking-[0.2em]">
                {c.resultsKicker}
              </p>
              <h3 className="text-white text-2xl md:text-3xl font-bold whitespace-normal text-balance">
                {c.resultsTitle}
              </h3>
            </div>
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
              {pastResults.map((r) => (
                <div
                  key={r.stat}
                  className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-6 text-center hover:bg-white/15 transition-colors"
                >
                  <p className="text-gov-gold text-3xl md:text-5xl font-black leading-none mb-2.5 tracking-tight">
                    {lang === 'en' ? r.statEn : r.stat}
                  </p>
                  <p className="text-white/85 text-sm md:text-base leading-relaxed">
                    {lang === 'en' ? r.labelEn : r.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
