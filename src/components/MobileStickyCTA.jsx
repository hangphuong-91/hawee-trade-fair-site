import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: 'Giữ chỗ gian hàng ngay',
  en: 'Reserve Your Booth Now',
}

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)
  const { lang } = useLanguage()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-rose-100 px-4 py-3 sticky-cta-shadow">
      <a href="#dang-ky" className="btn-primary w-full text-center block py-3">
        {copy[lang]}
      </a>
    </div>
  )
}
