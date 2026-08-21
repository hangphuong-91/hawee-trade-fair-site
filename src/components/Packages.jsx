import { Fragment } from 'react'
import { Check, X, Flame, Gift, BookOpen, Package, Award } from 'lucide-react'
import FadeUp from './FadeUp'
import EarlyBirdCountdown from './EarlyBirdCountdown'
import SponsorCTA from './SponsorCTA'
import { tickets, trainingProgram, cashSponsorships, sponsorBenefitTable, inKindSponsorships, discountPercent } from '../data/packages'
import { useFlashSale } from '../lib/useFlashSale'
import { useEarlyBird } from '../lib/useEarlyBird'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    flashLabel: 'Giờ Vàng (đến 26/7)',
    earlyBirdLabel: 'Early Bird (đến 31/7)',
    standardLabel: 'Giá chuẩn (sau 31/7)',
    holdTicket: (code) => `Giữ vé ${code} ngay`,
    soldOutBadge: 'Đã Hết Vé',
    soldOutCta: 'Ticket A Đã Hết Chỗ',
    limitedBadge: 'Số lượng có hạn — sắp hết chỗ',
    ticketsTag: 'Vé tham gia',
    ticketsTitle: 'Combo Vé HAWEE Pavillon',
    ticketsSub: 'Ticket A (Vị trí Vàng) đã hết chỗ. Ticket B chỉ còn số lượng giới hạn — giữ vé ngay trước khi hết!',
    demoAlt: 'Demo Gian hàng Ticket A — HAWEE International Trade Fair',
    demoCaption: 'Demo Gian hàng Ticket A — mỗi vé đều được dựng backdrop riêng theo bộ nhận diện HAWEE.',
    giftRibbon: 'TẶNG KÈM',
    giftTag: 'Quà tặng đặc biệt cho mọi vé',
    giftTitle: (
      <>
        Chương trình đào tạo <span className="text-primary">MIỄN PHÍ 100%</span>
      </>
    ),
    giftValue: (value) => (
      <>
        Trị giá <span className="line-through">{value}đ</span>{' '}
        <span className="font-bold text-[#D98A2B]">— đài thọ toàn bộ khi giữ vé Ticket A/B</span>
      </>
    ),
    sponsorTag: 'Tài trợ hiện kim',
    sponsorTitle: 'Đồng Hành Cùng HAWEE Trade Fair',
    tableHeaders: ['Quyền lợi', '💎 Kim Cương', '🟡 Vàng', '⚪ Bạc'],
    inKindTag: 'Tài trợ hiện vật',
    inKindTitle: 'Quyền Lợi Tài Trợ Hiện Vật',
  },
  en: {
    flashLabel: 'Flash Hour (thru Jul 26)',
    earlyBirdLabel: 'Early Bird (thru Jul 31)',
    standardLabel: 'Standard (after Jul 31)',
    holdTicket: (code) => `Reserve ${code} Now`,
    soldOutBadge: 'Sold Out',
    soldOutCta: 'Ticket A Sold Out',
    limitedBadge: 'Limited spots left — almost full',
    ticketsTag: 'Booth Tickets',
    ticketsTitle: 'HAWEE Pavillon Booth Combos',
    ticketsSub: 'Ticket A (Gold Position) is sold out. Ticket B has only a limited number of spots left — reserve yours before they run out!',
    demoAlt: 'Ticket A Booth Demo — HAWEE International Trade Fair',
    demoCaption: 'Ticket A booth demo — every ticket comes with its own backdrop under the HAWEE brand identity.',
    giftRibbon: 'BONUS',
    giftTag: 'A special gift with every ticket',
    giftTitle: (
      <>
        <span className="text-primary">100% FREE</span> training program
      </>
    ),
    giftValue: (value) => (
      <>
        Valued at <span className="line-through">{value}đ</span>{' '}
        <span className="font-bold text-[#D98A2B]">— fully covered with any Ticket A/B</span>
      </>
    ),
    sponsorTag: 'Cash Sponsorship',
    sponsorTitle: 'Partner With HAWEE Trade Fair',
    tableHeaders: ['Benefits', '💎 Diamond', '🟡 Gold', '⚪ Silver'],
    inKindTag: 'In-Kind Sponsorship',
    inKindTitle: 'In-Kind Sponsorship Benefits',
  },
}

function TicketCard({ t, i, lang, c }) {
  const { active: flashActive } = useFlashSale()
  const earlyBirdActive = useEarlyBird()

  return (
    <FadeUp delay={i * 0.1}>
      <div className={`ticket-card flex flex-col sm:flex-row card-hover ${t.highlight ? 'bg-gradient-hawee text-white' : 'bg-white border border-rose-50'} ${t.soldOut ? 'opacity-75 saturate-[0.4]' : ''}`}>
        <div className="flex-1 p-7 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 ${t.highlight ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
              {t.code}
            </span>
            {t.soldOut && (
              <span className="text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 bg-gray-700 text-white">
                {c.soldOutBadge}
              </span>
            )}
            {!t.soldOut && (
              <span className="fomo-badge inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest rounded-full px-3 py-1 bg-[#E8593A] text-white">
                <Flame size={12} className="shrink-0" />
                {c.limitedBadge}
              </span>
            )}
          </div>
          <h3 className={`text-xl font-semibold mb-1 ${t.highlight ? 'text-white' : 'text-dark'}`}>
            {lang === 'en' ? t.tagEn : t.tag}
          </h3>
          <p className={`text-sm mb-5 ${t.highlight ? 'text-white/85' : 'text-muted'}`}>
            {lang === 'en' ? t.areaEn : t.area}
          </p>
          <ul className={`space-y-2 text-sm ${t.highlight ? 'text-white/90' : 'text-muted'}`}>
            {(lang === 'en' ? t.benefitsEn : t.benefits).map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check size={15} className={`shrink-0 mt-0.5 ${t.highlight ? 'text-white' : 'text-primary'}`} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ticket-seam-h ticket-seam-v" />

        <div className="ticket-stub sm:w-60 shrink-0 p-7 sm:p-8 flex flex-col items-center justify-center gap-4 text-center">
          {t.soldOut ? (
            <p className={`text-sm font-semibold leading-relaxed ${t.highlight ? 'text-white/90' : 'text-muted'}`}>
              {c.soldOutCta}
            </p>
          ) : (
          <>
          <div className="w-full space-y-2.5">
            {flashActive && (
              <div>
                <p className={`text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-1 ${t.highlight ? 'text-white' : 'text-primary'}`}>
                  <Flame size={13} className="shrink-0" />
                  {c.flashLabel}
                </p>
                <p className="flex items-baseline justify-center gap-2 mt-1">
                  <span className={`text-3xl sm:text-4xl font-black ${t.highlight ? 'text-white' : 'text-primary'}`}>{t.flashSale}đ</span>
                  <span className="text-xs font-bold text-white bg-[#E8593A] rounded-full px-2 py-0.5">
                    -{discountPercent(t.flashSale, t.standard)}%
                  </span>
                </p>
              </div>
            )}
            {earlyBirdActive && (
              <div className={flashActive ? 'opacity-50' : ''}>
                <p className={`text-xs uppercase tracking-wide ${flashActive ? 'font-medium' : 'font-bold'} ${t.highlight ? 'text-white/85' : 'text-muted'}`}>
                  {c.earlyBirdLabel}
                </p>
                <p className="flex items-baseline justify-center gap-2 mt-1">
                  <span className={`font-black ${flashActive ? 'text-base line-through' : 'text-3xl sm:text-4xl'} ${t.highlight ? 'text-white' : 'text-primary'}`}>
                    {t.earlyBird}đ
                  </span>
                  {!flashActive && (
                    <span className="text-xs font-bold text-white bg-[#E8593A] rounded-full px-2 py-0.5">
                      -{discountPercent(t.earlyBird, t.standard)}%
                    </span>
                  )}
                </p>
              </div>
            )}
            <div className={earlyBirdActive ? 'opacity-45' : ''}>
              <p className={`text-xs uppercase tracking-wide ${earlyBirdActive ? '' : 'font-bold'} ${t.highlight ? 'text-white/85' : 'text-muted'}`}>
                {c.standardLabel}
              </p>
              {earlyBirdActive ? (
                <p className={`text-sm line-through mt-0.5 ${t.highlight ? 'text-white/70' : 'text-gray-400'}`}>{t.standard}đ</p>
              ) : (
                <p className={`text-3xl sm:text-4xl font-black mt-1 ${t.highlight ? 'text-white' : 'text-primary'}`}>{t.standard}đ</p>
              )}
            </div>
          </div>
          <a
            href="#dang-ky"
            className={`shrink-0 text-center rounded-full py-2.5 px-6 text-sm font-semibold transition-all whitespace-nowrap ${
              t.highlight ? 'bg-white text-primary hover:shadow-lg' : 'btn-outline'
            }`}
          >
            {c.holdTicket(t.code)}
          </a>
          </>
          )}
        </div>
      </div>
    </FadeUp>
  )
}

function SponsorMark({ v }) {
  if (v === true) return <Check size={16} className="text-primary mx-auto" />
  if (!v) return <X size={16} className="text-gray-300 mx-auto" />
  return <span className="text-dark text-xs font-medium">{v}</span>
}

// Gói tài trợ giờ được gom vào 1 câu hỏi "Quan tâm trở thành NTT?" ngay trong RegisterForm —
// tạm ẩn cả section này (không xoá) để dễ bật lại nếu HAWEE cần trình bày riêng gói tài trợ sau này.
const SHOW_SPONSOR_SECTION = false

export default function Packages() {
  const { lang } = useLanguage()
  const c = copy[lang]
  return (
    <section id="goi-tham-gia" className="py-12 md:py-16">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl stats-night p-5 sm:p-8 md:p-10 mb-16">
          <FadeUp className="text-center max-w-2xl mx-auto mb-6">
            <p className="text-rose-200 label-tag mb-3">{c.ticketsTag}</p>
            <h2 className="section-title text-white text-2xl md:text-4xl whitespace-normal text-balance">{c.ticketsTitle}</h2>
            <p className="text-rose-100/80 text-sm mt-2">{c.ticketsSub}</p>
          </FadeUp>

          <FadeUp className="text-center mb-10">
            <EarlyBirdCountdown dark />
          </FadeUp>

          <FadeUp className="mb-10">
            <div className="rounded-3xl overflow-hidden corner-brackets text-rose-300 card-hover bg-white">
              <img
                src="/concept/demo-ticket-a.png"
                alt={c.demoAlt}
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-rose-200/70 text-xs text-center mt-3">{c.demoCaption}</p>
          </FadeUp>

          <div className="space-y-6 max-w-3xl mx-auto">
            {tickets.map((t, i) => (
              <TicketCard key={t.code} t={t} i={i} lang={lang} c={c} />
            ))}
          </div>
        </div>

        <FadeUp className="max-w-3xl mx-auto mb-16">
          <div className="gift-card rounded-3xl p-8 sm:p-10 text-center">
            <div className="gift-ribbon">{c.giftRibbon}</div>
            <div className="relative z-[1] flex flex-col items-center">
              <span className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D98A2B] to-[#E8593A] flex items-center justify-center gift-icon-glow mb-5">
                <Gift className="text-white" size={30} />
              </span>
              <p className="label-tag text-base md:text-lg mb-3" style={{ color: '#D98A2B' }}>
                {c.giftTag}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-dark mb-3">{c.giftTitle}</h3>
              <p className="text-muted text-base md:text-lg mb-8">{c.giftValue(trainingProgram.value)}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {trainingProgram.modules.map((m, i) => {
                  const Icon = [BookOpen, Package, Award][i]
                  return (
                    <div key={m.title} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-left card-hover">
                      <Icon className="text-primary mb-3" size={22} />
                      <p className="text-dark text-base md:text-lg font-semibold leading-snug mb-2">
                        {lang === 'en' ? m.titleEn : m.title}
                      </p>
                      <span className="inline-block text-[12px] font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-1">
                        {lang === 'en' ? m.durationEn : m.duration}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </FadeUp>

        {SHOW_SPONSOR_SECTION && (
          <>
            <FadeUp className="text-center max-w-2xl mx-auto mb-10">
              <p className="label-tag mb-3">{c.sponsorTag}</p>
              <h2 className="section-title text-2xl md:text-4xl whitespace-normal text-balance">{c.sponsorTitle}</h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {cashSponsorships.map((s, i) => (
                <FadeUp key={s.tier} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-7 border border-rose-50 card-hover h-full">
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <h3 className="font-semibold text-dark">{lang === 'en' ? s.tierEn : s.tier}</h3>
                    <p className="text-2xl font-semibold text-primary mb-2">{lang === 'en' ? s.priceEn : s.price}</p>
                    <p className="text-primary text-xs font-semibold uppercase tracking-wide mb-3">
                      {lang === 'en' ? s.labelEn : s.label}
                    </p>
                    <p className="text-muted text-xs leading-relaxed">{lang === 'en' ? s.descEn : s.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp className="mb-14 overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[560px]">
                <thead>
                  <tr className="border-b border-rose-100">
                    <th className="text-left py-3 pr-4 text-dark font-semibold">{c.tableHeaders[0]}</th>
                    <th className="py-3 px-3 text-primary font-semibold">{c.tableHeaders[1]}</th>
                    <th className="py-3 px-3 text-dark font-semibold">{c.tableHeaders[2]}</th>
                    <th className="py-3 px-3 text-muted font-semibold">{c.tableHeaders[3]}</th>
                  </tr>
                </thead>
                <tbody>
                  {sponsorBenefitTable.map((group) => (
                    <Fragment key={group.group}>
                      <tr className="bg-rose-50">
                        <td colSpan={4} className="py-2 px-4 text-xs font-semibold text-dark uppercase tracking-wide">
                          {lang === 'en' ? group.groupEn : group.group}
                        </td>
                      </tr>
                      {group.rows.map((r) => (
                        <tr key={r.label} className="border-b border-gray-100">
                          <td className="py-3 pr-4 text-muted">{lang === 'en' ? r.labelEn : r.label}</td>
                          <td className="py-3 px-3 text-center">
                            <SponsorMark v={lang === 'en' && r.diamondEn ? r.diamondEn : r.diamond} />
                          </td>
                          <td className="py-3 px-3 text-center">
                            <SponsorMark v={lang === 'en' && r.goldEn ? r.goldEn : r.gold} />
                          </td>
                          <td className="py-3 px-3 text-center">
                            <SponsorMark v={lang === 'en' && r.silverEn ? r.silverEn : r.silver} />
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </FadeUp>

            <FadeUp className="text-center max-w-2xl mx-auto mb-8">
              <p className="label-tag mb-3">{c.inKindTag}</p>
              <h2 className="section-title text-2xl md:text-3xl whitespace-normal text-balance">{c.inKindTitle}</h2>
            </FadeUp>

            <FadeUp>
              <div className="bg-white rounded-2xl border border-rose-50 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {inKindSponsorships.map((k) => (
                    <div key={k.group} className="px-7 py-5 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                      <span className="font-semibold text-dark text-sm sm:w-52 shrink-0">
                        {lang === 'en' ? k.groupEn : k.group}
                      </span>
                      <div>
                        <p className="text-muted text-xs mb-1">{lang === 'en' ? k.roleEn : k.role}</p>
                        <p className="text-primary text-xs font-medium">{lang === 'en' ? k.rewardEn : k.reward}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <SponsorCTA />
          </>
        )}
      </div>
    </section>
  )
}
