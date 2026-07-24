import { Landmark, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const defaultLabel = {
  vi: { gov: 'Hội Chợ Hàng Việt Nam Tiêu Biểu Xuất Khẩu 2026', hawee: 'HAWEE Pavillon' },
  en: { gov: 'Vietnam Typical Export Products Fair 2026', hawee: 'HAWEE Pavillon' },
}

// Nhãn phân biệt nguồn nội dung: "gov" = thuộc Hội Chợ Hàng Việt Nam Tiêu Biểu
// Xuất Khẩu 2026 (do SCT chủ trì) — "hawee" = riêng của HAWEE Pavillon.
export default function SourceBadge({ variant = 'hawee', label, className = '' }) {
  const { lang } = useLanguage()
  const isGov = variant === 'gov'
  const Icon = isGov ? Landmark : Sparkles
  const text = label || defaultLabel[lang][isGov ? 'gov' : 'hawee']

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-center text-[11px] sm:text-[12px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full ${
        isGov ? 'bg-gov text-white' : 'bg-primary text-white'
      } ${className}`}
    >
      {/* điểm nhấn màu chéo: badge chương trình tổng (navy) điểm nhẹ hồng, badge HAWEE (hồng) điểm nhẹ xanh */}
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isGov ? 'bg-rose-300' : 'bg-sky-300'}`} />
      <Icon size={12} className="shrink-0" />
      {text}
    </span>
  )
}
