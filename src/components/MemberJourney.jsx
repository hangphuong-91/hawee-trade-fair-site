import { Rocket, PartyPopper, Handshake, ChevronRight } from 'lucide-react'
import FadeUp from './FadeUp'
import { memberJourney } from '../data/journey'
import { useLanguage } from '../context/LanguageContext'

const phaseIcons = [Rocket, PartyPopper, Handshake]

const copy = {
  vi: {
    tag: 'Hành trình đồng hành',
    title: 'Trước - Trong - Sau Sự Kiện',
    sub: 'Dành riêng cho hội viên HAWEE đăng ký gian hàng tại HAWEE Pavillon — mỗi giai đoạn đều có đội ngũ HAWEE đồng hành sát cánh.',
    cta: 'Xem bảng giá & quyền lợi',
  },
  en: {
    tag: 'The Journey Together',
    title: 'Before – During – After The Event',
    sub: 'Exclusive to HAWEE members who reserve a booth at HAWEE Pavillon — the HAWEE team stands alongside you at every phase.',
    cta: 'View Pricing & Benefits',
  },
}

export default function MemberJourney() {
  const { lang } = useLanguage()
  const c = copy[lang]
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <img
        src="/journey-social.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 top-0 w-full h-auto opacity-[0.12] sm:opacity-15 md:opacity-20 z-0"
      />
      <div className="container-custom relative z-10">
        <FadeUp className="text-center max-w-2xl mx-auto mb-4">
          <p className="label-tag mb-3">{c.tag}</p>
          <h2 className="section-title text-2xl md:text-4xl whitespace-normal text-balance">{c.title}</h2>
          <p className="text-muted text-sm">{c.sub}</p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 relative">
          {memberJourney.map((phase, i) => {
            const Icon = phaseIcons[i]
            return (
              <FadeUp key={phase.phase} delay={i * 0.1} className="relative">
                {i < memberJourney.length - 1 && (
                  <ChevronRight
                    size={22}
                    strokeWidth={2.5}
                    className="hidden lg:block text-primary/30 absolute top-8 -right-5 z-10"
                  />
                )}
                <div className="rounded-2xl bg-white h-full overflow-hidden card-hover">
                  <div className={`h-1.5 bg-gradient-to-r ${phase.theme}`} />
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-11 h-11 rounded-xl bg-gradient-to-br ${phase.theme} flex items-center justify-center shrink-0`}>
                        <Icon className="text-white" size={20} />
                      </span>
                      <div>
                        <p className="label-tag">
                          {lang === 'en' ? phase.phaseEn : phase.phase} · {lang === 'en' && phase.datesEn ? phase.datesEn : phase.dates}
                        </p>
                        <h3 className="font-semibold text-dark text-lg">{lang === 'en' ? phase.titleEn : phase.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted text-xs italic leading-relaxed mb-5">
                      {lang === 'en' ? phase.goalEn : phase.goal}
                    </p>
                    <ul className="space-y-3.5">
                      {phase.items.map((it) => (
                        <li key={it.title} className="border-l-2 border-rose-100 pl-3.5">
                          <p className="text-dark text-sm font-semibold leading-snug">
                            {lang === 'en' ? it.titleEn : it.title}
                          </p>
                          <p className="text-muted text-xs leading-relaxed mt-0.5">
                            {lang === 'en' ? it.descEn : it.desc}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>

        <FadeUp delay={0.2} className="text-center mt-10">
          <a href="#goi-tham-gia" className="btn-primary">
            {c.cta}
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
