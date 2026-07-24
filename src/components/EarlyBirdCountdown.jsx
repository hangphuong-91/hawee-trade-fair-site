import { useEffect, useState } from 'react'
import { earlyBirdDeadline } from '../data/packages'
import { useLanguage } from '../context/LanguageContext'

const DEADLINE = new Date(earlyBirdDeadline)

const copy = {
  vi: (days) => `Còn ${days} ngày để nhận giá Early Bird (đăng ký trước 31/7)`,
  en: (days) => `${days} days left to claim the Early Bird rate (register before Jul 31)`,
}

function daysLeft() {
  const diff = DEADLINE.getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default function EarlyBirdCountdown({ className = '', dark = false }) {
  const [days, setDays] = useState(daysLeft())
  const { lang } = useLanguage()

  useEffect(() => {
    const id = setInterval(() => setDays(daysLeft()), 1000 * 60 * 60)
    return () => clearInterval(id)
  }, [])

  if (days <= 0) return null

  return (
    <div
      className={`rounded-full px-5 py-2.5 inline-flex items-center gap-2 text-sm font-semibold ${
        dark ? 'bg-white/10 border border-white/25 text-white backdrop-blur-sm' : 'countdown-chip'
      } ${className}`}
    >
      <span className="countdown-dot" />
      {copy[lang](days)}
    </div>
  )
}
