import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, List, Sparkles } from 'lucide-react'
import FadeUp from './FadeUp'
import { getExhibitors } from '../services/notion'
import { useLanguage } from '../context/LanguageContext'

const FEATURED_COUNT = 8

const copy = {
  vi: {
    tag: 'Doanh nghiệp tham gia',
    title: 'Gian Hàng HAWEE Pavillon',
    subHas: 'Nhấn vào từng gian hàng để gặp gỡ doanh nghiệp trước khi hội chợ diễn ra.',
    subEmpty: 'Danh sách doanh nghiệp tham gia đang được cập nhật — mời quay lại sớm.',
    viewDetail: 'Xem chi tiết →',
    close: 'Đóng',
    listTitle: (n) => `Danh sách doanh nghiệp tham gia (${n})`,
    joinClosing: 'Cùng toả sáng trong danh sách này — giữ chỗ gian hàng của bạn.',
    listBtn: 'Xem danh sách doanh nghiệp tham gia',
    joinCta: 'Cùng góp mặt tại HAWEE Pavillon',
    emptyTitle: 'Đang cập nhật danh sách doanh nghiệp',
    emptyDesc: 'Gian hàng HAWEE Pavillon sẽ sớm được lấp đầy — hãy là một trong những doanh nghiệp đầu tiên góp mặt.',
    emptyCta: 'Đăng ký gian hàng ngay',
  },
  en: {
    tag: 'Exhibitors',
    title: 'HAWEE Pavillon Booths',
    subHas: 'Click on each booth to meet the business before the fair takes place.',
    subEmpty: 'The exhibitor list is being updated — please check back soon.',
    viewDetail: 'View details →',
    close: 'Close',
    listTitle: (n) => `Exhibitor list (${n})`,
    joinClosing: 'Shine alongside them — reserve your booth today.',
    listBtn: 'View Exhibitor List',
    joinCta: 'Join HAWEE Pavillon',
    emptyTitle: 'Exhibitor List Coming Soon',
    emptyDesc: 'HAWEE Pavillon booths will fill up fast — be one of the first businesses on board.',
    emptyCta: 'Reserve Your Booth Now',
  },
}

function LogoOrInitial({ name, logo, size = 64 }) {
  const [broken, setBroken] = useState(false)
  if (logo && !broken) {
    return (
      <img
        src={logo}
        alt={name}
        onError={() => setBroken(true)}
        style={{ width: size, height: size }}
        className="object-contain"
      />
    )
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-white shadow-sm flex items-center justify-center text-primary font-semibold text-xl"
    >
      {name.charAt(0)}
    </div>
  )
}

// Mã gian hàng chỉ mang tính trang trí (theo dạng sơ đồ A/B trong tài liệu), không phải vị trí thật.
function boothCode(index) {
  const zone = index % 2 === 0 ? 'A' : 'B'
  const num = Math.floor(index / 2) + 1
  return `${zone}-${String(num).padStart(2, '0')}`
}

function ExhibitorCard({ exhibitor, index, onOpen, c }) {
  return (
    <button onClick={() => onOpen(exhibitor)} className="booth-card text-left card-hover border border-rose-100 w-full h-full flex flex-col">
      <div className="booth-awning" />
      <div className="booth-signage relative px-5 pt-7 pb-5 flex flex-col items-center text-center">
        <span className="booth-number">{boothCode(index)}</span>
        <LogoOrInitial name={exhibitor.name} logo={exhibitor.logo} />
        <p className="label-tag mt-3">{exhibitor.industry}</p>
      </div>
      <div className="booth-floor px-5 py-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-dark mb-2 line-clamp-2">{exhibitor.name}</h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-2">{exhibitor.description}</p>
        <span className="text-primary text-sm font-medium pt-3 mt-auto inline-block">{c.viewDetail}</span>
      </div>
    </button>
  )
}

function ExhibitorModal({ exhibitor, index, onClose, c }) {
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
        <div className="booth-awning" />
        <div className="booth-signage relative px-8 pt-8 pb-6 flex flex-col items-center text-center">
          <span className="booth-number">{boothCode(index)}</span>
          <button
            onClick={onClose}
            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center"
            aria-label={c.close}
          >
            <X size={18} />
          </button>
          <LogoOrInitial name={exhibitor.name} logo={exhibitor.logo} size={72} />
          <p className="label-tag mt-4">{exhibitor.industry}</p>
        </div>
        <div className="booth-floor px-8 py-6">
          <h3 className="text-2xl font-semibold text-dark mb-3">{exhibitor.name}</h3>
          <p className="text-muted text-sm leading-relaxed">{exhibitor.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ExhibitorListModal({ exhibitors, onClose, onSelect, c }) {
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
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl max-h-[80vh] flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-100 shrink-0">
          <h3 className="font-semibold text-dark">{c.listTitle(exhibitors.length)}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-rose-50 flex items-center justify-center"
            aria-label={c.close}
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto divide-y divide-gray-100">
          {exhibitors.map((ex, i) => (
            <button
              key={ex.name}
              onClick={() => onSelect(i)}
              className="w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-rose-50 transition-colors"
            >
              <LogoOrInitial name={ex.name} logo={ex.logo} size={36} />
              <div className="flex-1 min-w-0">
                <p className="text-dark text-sm font-medium truncate">{ex.name}</p>
                <p className="text-muted text-xs truncate">{ex.industry}</p>
              </div>
              <span className="text-[12px] font-semibold text-white bg-dark/60 rounded px-2 py-1 shrink-0">
                {boothCode(i)}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Exhibitors() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [listOpen, setListOpen] = useState(false)
  const [exhibitors, setExhibitors] = useState([])
  const { lang } = useLanguage()
  const c = copy[lang]

  useEffect(() => {
    getExhibitors()
      .then((list) => {
        if (list.length > 0) setExhibitors(list)
      })
      .catch(() => {
        // Notion chưa cấu hình hoặc lỗi mạng — giữ trạng thái "đang cập nhật"
      })
  }, [])

  const active = activeIndex === null ? null : exhibitors[activeIndex]
  const featured = exhibitors.slice(0, FEATURED_COUNT)
  const hasExhibitors = featured.length > 0

  return (
    <section id="doanh-nghiep" className="py-12 md:py-16">
      <div className="container-custom">
        <FadeUp className="text-center max-w-2xl mx-auto mb-10">
          <p className="label-tag mb-3">{c.tag}</p>
          <h2 className="section-title text-2xl md:text-4xl whitespace-normal text-balance">{c.title}</h2>
          <p className="text-muted text-sm">{hasExhibitors ? c.subHas : c.subEmpty}</p>
        </FadeUp>

        {hasExhibitors ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((ex, i) => (
                <FadeUp key={ex.name} delay={i * 0.05} className="h-full">
                  <ExhibitorCard exhibitor={ex} index={i} onOpen={() => setActiveIndex(i)} c={c} />
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.15} className="text-center mt-10">
              <p className="text-muted text-sm mb-4">{c.joinClosing}</p>
              <div className="flex flex-wrap gap-4 justify-center items-center">
                <button onClick={() => setListOpen(true)} className="btn-outline flex items-center gap-2">
                  <List size={16} />
                  {c.listBtn}
                </button>
                <a href="#dang-ky" className="btn-primary">
                  {c.joinCta}
                </a>
              </div>
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
        {active && <ExhibitorModal exhibitor={active} index={activeIndex} onClose={() => setActiveIndex(null)} c={c} />}
        {listOpen && (
          <ExhibitorListModal
            exhibitors={exhibitors}
            onClose={() => setListOpen(false)}
            onSelect={(i) => {
              setListOpen(false)
              setActiveIndex(i)
            }}
            c={c}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
