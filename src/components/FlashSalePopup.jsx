import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Flame } from 'lucide-react'
import { tickets } from '../data/packages'
import { useFlashSale } from '../lib/useFlashSale'
import { useLanguage } from '../context/LanguageContext'

function pad(n) {
  return String(n).padStart(2, '0')
}

// Khớp tên khu gian hàng trên sơ đồ (Gian A / Gian B) với mã vé — chỉ dùng riêng trong popup này
// để khách đối chiếu trực tiếp với sơ đồ, không đổi tên vé ở các nơi khác trên site.
const ZONE_LABEL = {
  vi: { 'Ticket A': 'Gian A', 'Ticket B': 'Gian B' },
  en: { 'Ticket A': 'Zone A', 'Ticket B': 'Zone B' },
}

const copy = {
  vi: {
    close: 'Đóng',
    flashSale: 'Flash Sale',
    title: 'GIỜ VÀNG CUỐI TUẦN',
    sub: (
      <>
        Nhận ngay <span className="text-white font-semibold">giá siêu ưu đãi</span>, áp dụng đến hết{' '}
        <span className="text-white font-semibold">Chủ Nhật, 26/7/2026</span>.
      </>
    ),
    endsIn: 'Ưu đãi kết thúc sau',
    hours: 'Giờ',
    minutes: 'Phút',
    seconds: 'Giây',
    slotsLeft: (n) => `Chỉ còn ${n} suất`,
    perBooth: '/gian',
    discountBadge: 'ƯU ĐÃI 50%',
    footnote: (a, b) =>
      `Ưu đãi áp dụng đến hết Chủ Nhật, 26/7/2026. Sau mốc này, giá gian hàng trở về mức Early Bird hiện tại (${a}đ/gian · ${b}đ/gian), áp dụng đến hết 31/7/2026.`,
    cta: 'Chốt Gian Ngay — Kẻo Hết Suất!',
  },
  en: {
    close: 'Close',
    flashSale: 'Flash Sale',
    title: 'WEEKEND FLASH HOUR',
    sub: (
      <>
        Get an <span className="text-white font-semibold">exclusive discounted rate</span>, valid through{' '}
        <span className="text-white font-semibold">Sunday, Jul 26, 2026</span>.
      </>
    ),
    endsIn: 'Offer ends in',
    hours: 'Hrs',
    minutes: 'Min',
    seconds: 'Sec',
    slotsLeft: (n) => `Only ${n} slots left`,
    perBooth: '/booth',
    discountBadge: '50% OFF',
    footnote: (a, b) =>
      `Offer valid through Sunday, Jul 26, 2026. After that, booth pricing returns to the current Early Bird rate (${a}đ/booth · ${b}đ/booth), valid through Jul 31, 2026.`,
    cta: 'Reserve Now — Before Slots Run Out!',
  },
}

function DigitBox({ value, label, ticking = false }) {
  return (
    <div className="flash-digit rounded-2xl px-3.5 py-2.5 text-center min-w-[68px] overflow-hidden">
      {ticking ? (
        <AnimatePresence mode="popLayout">
          <motion.p
            key={value}
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 14, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="gradient-text-gold text-2xl font-black leading-none tabular-nums"
          >
            {pad(value)}
          </motion.p>
        </AnimatePresence>
      ) : (
        <p className="gradient-text-gold text-2xl font-black leading-none tabular-nums">{pad(value)}</p>
      )}
      <p className="text-white/50 text-[11px] mt-1.5 uppercase tracking-wide">{label}</p>
    </div>
  )
}

export default function FlashSalePopup() {
  const [dismissed, setDismissed] = useState(false)
  const { active, hours, minutes, seconds } = useFlashSale()
  const [ticketA, ticketB] = tickets
  const { lang } = useLanguage()
  const c = copy[lang]

  return (
    <AnimatePresence>
      {active && !dismissed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="flash-sale-sky relative max-w-md w-full rounded-3xl shadow-2xl"
          >
            <div className="star-field" />
            <span className="star-twinkle-dot" style={{ width: 3, height: 3, top: '10%', left: '12%', animationDuration: '2.4s' }} />
            <span className="star-twinkle-dot" style={{ width: 2, height: 2, top: '20%', right: '18%', animationDuration: '3s', animationDelay: '0.6s' }} />
            <span className="star-twinkle-dot" style={{ width: 3, height: 3, top: '6%', right: '30%', animationDuration: '2.8s', animationDelay: '1.1s' }} />

            <button
              onClick={() => setDismissed(true)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center z-10 transition-colors"
              aria-label={c.close}
            >
              <X size={18} className="text-white" />
            </button>

            <div className="relative z-[1] pt-9 pb-7 px-6 sm:px-7 text-center">
              <span className="fomo-badge inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-widest text-white mb-3">
                <Flame size={13} className="text-[#E8A23A]" />
                {c.flashSale}
              </span>
              <h3 className="gradient-text-gold text-3xl sm:text-4xl font-black tracking-tight">{c.title}</h3>
              <p className="text-white/70 text-sm mt-2 max-w-xs mx-auto">{c.sub}</p>

              <p className="text-white/40 text-[11px] uppercase tracking-widest font-semibold mt-6 mb-2">{c.endsIn}</p>
              <div className="relative flex items-center justify-center gap-2.5 mb-7">
                <div className="flash-glow-orb" />
                <DigitBox value={hours} label={c.hours} />
                <span className="gradient-text-gold text-2xl font-black -mt-4">:</span>
                <DigitBox value={minutes} label={c.minutes} />
                <span className="gradient-text-gold text-2xl font-black -mt-4">:</span>
                <DigitBox value={seconds} label={c.seconds} ticking />
              </div>

              <div className="space-y-3 mb-6 text-left">
                {[ticketA, ticketB].map((t) => (
                  <div
                    key={t.code}
                    className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5"
                  >
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {ZONE_LABEL[lang][t.code]} <span className="text-white/50 font-normal">({t.code})</span>
                      </p>
                      <p className="text-white/50 text-xs mt-0.5">{c.slotsLeft(t.slots)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="gradient-text-gold text-3xl font-black leading-none">
                        {t.flashSale}đ<span className="text-sm font-semibold">{c.perBooth}</span>
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-white bg-[#E8593A] rounded-full px-2 py-0.5">
                        {c.discountBadge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-white/45 text-xs leading-relaxed mb-6">
                {c.footnote(ticketA.earlyBird, ticketB.earlyBird)}
              </p>

              <a
                href="#dang-ky"
                onClick={() => setDismissed(true)}
                className="flash-cta rounded-full py-3.5 w-full text-white font-bold text-center block transition-transform hover:-translate-y-0.5"
              >
                {c.cta}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
