import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'
import FadeUp from './FadeUp'
import { exhibitors } from '../data/exhibitors'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    tag: 'Doanh nghiệp tham gia',
    title: 'Gian Hàng HAWEE Pavillon',
    subHas: (n) => `${n} doanh nghiệp đã giữ chỗ gian hàng — nhấn vào từng gian để xem chi tiết.`,
    subEmpty: 'Danh sách doanh nghiệp tham gia đang được cập nhật — mời quay lại sớm.',
    close: 'Đóng',
    zoneA: 'Ticket A',
    zoneB: 'Ticket B',
    zonePending: 'Đang cập nhật vị trí',
    productsLabel: 'Sản phẩm trưng bày',
    pendingBadge: 'Đang cập nhật',
    filterAll: 'Tất cả lĩnh vực',
    noResult: 'Không có doanh nghiệp nào trong lĩnh vực này.',
    joinClosing: 'Cùng toả sáng trong danh sách này — giữ chỗ gian hàng của bạn.',
    joinCta: 'Cùng góp mặt tại HAWEE Pavillon',
    emptyTitle: 'Đang cập nhật danh sách doanh nghiệp',
    emptyDesc: 'Gian hàng HAWEE Pavillon sẽ sớm được lấp đầy — hãy là một trong những doanh nghiệp đầu tiên góp mặt.',
    emptyCta: 'Đăng ký gian hàng ngay',
  },
  en: {
    tag: 'Exhibitors',
    title: 'HAWEE Pavillon Booths',
    subHas: (n) => `${n} businesses have reserved their booths — click each one for details.`,
    subEmpty: 'The exhibitor list is being updated — please check back soon.',
    close: 'Close',
    zoneA: 'Ticket A',
    zoneB: 'Ticket B',
    zonePending: 'Booth location pending',
    productsLabel: 'Products on display',
    pendingBadge: 'Pending',
    filterAll: 'All industries',
    noResult: 'No exhibitors in this industry.',
    joinClosing: 'Shine alongside them — reserve your booth today.',
    joinCta: 'Join HAWEE Pavillon',
    emptyTitle: 'Exhibitor List Coming Soon',
    emptyDesc: 'HAWEE Pavillon booths will fill up fast — be one of the first businesses on board.',
    emptyCta: 'Reserve Your Booth Now',
  },
}

function InitialBadge({ name, className = 'w-9 h-9 sm:w-10 sm:h-10 text-base sm:text-xl' }) {
  return (
    <div
      className={`rounded-full bg-white shadow-sm flex items-center justify-center text-primary font-semibold shrink-0 ${className}`}
    >
      {name.charAt(0)}
    </div>
  )
}

function zoneOf(booth) {
  if (!booth) return 'pending'
  return booth.startsWith('A') ? 'A' : 'B'
}

// Bỏ tiền tố loại hình pháp lý (Công ty TNHH/Cổ Phần, Hiệp Hội...) khi hiển thị trên gian hàng thu nhỏ,
// giữ lại phần tên thương hiệu thật — vừa ngắn gọn, vừa tránh xuống dòng cắt mất phần tên có nghĩa
// (vd. "Công ty Cổ Phần Hà Mỵ" bị line-clamp cắt mất "Hà Mỵ" nếu giữ nguyên tiền tố).
const NAME_PREFIXES = [
  /^Công ty (Cổ Phần|CP|TNHH SXTM|TNHH SX TM|TNHH)\s+/i,
  /^Công ty\s+/i,
  /^Hiệp Hội\s+/i,
]

function shortName(name) {
  for (const re of NAME_PREFIXES) {
    if (re.test(name)) return name.replace(re, '').trim()
  }
  return name
}

function ExhibitorCard({ exhibitor, onOpen }) {
  const display = shortName(exhibitor.name)
  return (
    <button
      onClick={onOpen}
      title={exhibitor.name}
      className="booth-card text-left card-hover border border-rose-100 w-full h-full flex flex-col"
    >
      <div className="booth-awning w-full" />
      <div className="booth-signage relative w-full px-2 sm:px-2.5 pt-4 sm:pt-5 pb-3 sm:pb-4 flex flex-col items-center text-center flex-1 justify-center">
        <span className="booth-number !text-[9px] !px-1.5 !py-0.5 !top-2 !right-2">{exhibitor.booth ?? '—'}</span>
        <InitialBadge name={display} />
        <h3 className="font-semibold text-dark text-[11px] sm:text-xs leading-snug line-clamp-2 mt-2 break-words hyphens-none w-full">
          {display}
        </h3>
      </div>
    </button>
  )
}

function ExhibitorModal({ exhibitor, onClose, c }) {
  if (!exhibitor) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="booth-card max-w-lg w-full shadow-2xl"
      >
        <div className="booth-awning w-full" />
        <div className="booth-signage relative w-full px-8 pt-8 pb-6 flex flex-col items-center text-center">
          <span className="booth-number">{exhibitor.booth ?? c.pendingBadge}</span>
          <button
            onClick={onClose}
            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center"
            aria-label={c.close}
          >
            <X size={18} />
          </button>
          <InitialBadge name={exhibitor.name} className="w-[72px] h-[72px] text-2xl" />
          <p className="label-tag mt-4">{exhibitor.industry}</p>
        </div>
        <div className="booth-floor px-8 py-6">
          <h3 className="text-2xl font-semibold text-dark mb-3">{exhibitor.name}</h3>
          {exhibitor.products && (
            <>
              <p className="text-dark text-[12px] font-bold uppercase tracking-wide mb-1.5">{c.productsLabel}</p>
              <p className="text-muted text-sm leading-relaxed">{exhibitor.products}</p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ZoneDivider({ label }) {
  return (
    <div className="col-span-3 sm:col-span-4 md:col-span-6 lg:col-span-8 flex items-center gap-3 mt-2 mb-1 first:mt-0">
      <span className="text-primary font-semibold text-sm tracking-wide uppercase shrink-0">{label}</span>
      <div className="h-px flex-1 bg-rose-100" />
    </div>
  )
}

export default function Exhibitors() {
  const [active, setActive] = useState(null)
  const [industryFilter, setIndustryFilter] = useState(null)
  const { lang } = useLanguage()
  const c = copy[lang]
  const hasExhibitors = exhibitors.length > 0

  const industries = useMemo(
    () => [...new Set(exhibitors.map((ex) => ex.industry))].sort((a, b) => a.localeCompare(b, 'vi')),
    []
  )

  const filtered = industryFilter ? exhibitors.filter((ex) => ex.industry === industryFilter) : exhibitors

  const gridItems = []
  let lastZone = null
  filtered.forEach((ex, i) => {
    const zone = zoneOf(ex.booth)
    if (zone !== lastZone) {
      lastZone = zone
      const dividerLabel = zone === 'A' ? c.zoneA : zone === 'B' ? c.zoneB : c.zonePending
      gridItems.push(<ZoneDivider key={`zone-${zone}`} label={dividerLabel} />)
    }
    gridItems.push(
      <FadeUp key={ex.name + ex.booth} delay={Math.min(i, 8) * 0.03} className="h-full">
        <ExhibitorCard exhibitor={ex} onOpen={() => setActive(ex)} />
      </FadeUp>
    )
  })

  return (
    <section id="doanh-nghiep" className="py-12 md:py-16">
      <div className="container-custom">
        <FadeUp className="text-center max-w-2xl mx-auto mb-8">
          <p className="label-tag mb-3">{c.tag}</p>
          <h2 className="section-title text-2xl md:text-4xl whitespace-normal text-balance">{c.title}</h2>
          <p className="text-muted text-sm">{hasExhibitors ? c.subHas(filtered.length) : c.subEmpty}</p>
        </FadeUp>

        {hasExhibitors ? (
          <>
            <FadeUp delay={0.05} className="mb-8">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:overflow-visible">
                <button
                  onClick={() => setIndustryFilter(null)}
                  className={`shrink-0 whitespace-nowrap text-xs font-semibold rounded-full px-3.5 py-1.5 border transition-colors ${
                    industryFilter === null
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white border-rose-200 text-dark hover:border-primary'
                  }`}
                >
                  {c.filterAll}
                </button>
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustryFilter(ind)}
                    className={`shrink-0 whitespace-nowrap text-xs font-semibold rounded-full px-3.5 py-1.5 border transition-colors ${
                      industryFilter === ind
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white border-rose-200 text-dark hover:border-primary'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </FadeUp>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">{gridItems}</div>
            ) : (
              <p className="text-muted text-sm text-center py-10">{c.noResult}</p>
            )}

            <FadeUp delay={0.15} className="text-center mt-10">
              <p className="text-muted text-sm mb-4">{c.joinClosing}</p>
              <a href="#dang-ky" className="btn-primary">
                {c.joinCta}
              </a>
            </FadeUp>
          </>
        ) : (
          <FadeUp className="text-center">
            <div className="booth-card border border-dashed border-rose-200 max-w-md mx-auto px-8 py-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                <Sparkles className="text-primary" size={22} />
              </div>
              <p className="text-dark font-semibold mb-2">{c.emptyTitle}</p>
              <p className="text-muted text-sm leading-relaxed mb-6">{c.emptyDesc}</p>
              <a href="#dang-ky" className="btn-primary">
                {c.emptyCta}
              </a>
            </div>
          </FadeUp>
        )}
      </div>

      <AnimatePresence>
        {active && <ExhibitorModal exhibitor={active} onClose={() => setActive(null)} c={c} />}
      </AnimatePresence>
    </section>
  )
}
