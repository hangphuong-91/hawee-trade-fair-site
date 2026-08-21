import { useEffect, useState } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  vi: {
    tagline: 'International Trade Fair',
    links: [
      { href: '#doanh-nghiep', label: 'Doanh nghiệp tham gia' },
      { href: '#lich-trinh', label: 'Lịch trình' },
      { href: '#goi-tham-gia', label: 'Gói tham gia' },
      { href: '#tai-tro', label: 'Đơn vị Tài trợ' },
      { href: '#dang-ky', label: 'Đăng ký' },
    ],
    cta: 'Giữ chỗ gian hàng',
    menuLabel: 'Mở menu',
  },
  en: {
    tagline: 'International Trade Fair',
    links: [
      { href: '#doanh-nghiep', label: 'Exhibitors' },
      { href: '#lich-trinh', label: 'Schedule' },
      { href: '#goi-tham-gia', label: 'Booth Packages' },
      { href: '#tai-tro', label: 'Sponsors' },
      { href: '#dang-ky', label: 'Register' },
    ],
    cta: 'Reserve a Booth',
    menuLabel: 'Open menu',
  },
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, toggleLang } = useLanguage()
  const c = copy[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-2">
          <img
            src={scrolled ? '/hawee-logo.png' : '/hawee-logo-white.png'}
            alt="HAWEE"
            className="hidden sm:block h-9 w-auto"
          />
          <span className={`font-semibold text-sm hidden sm:inline ${scrolled ? 'text-dark' : 'text-white'}`}>
            {c.tagline}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {c.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? 'text-dark hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggleLang}
            className={`flex items-center gap-1.5 text-sm font-semibold rounded-full px-3.5 py-2 border transition-colors ${
              scrolled
                ? 'border-gray-200 text-dark hover:border-primary hover:text-primary'
                : 'border-white/30 text-white hover:border-white hover:bg-white/10'
            }`}
            aria-label={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
          >
            <Globe size={14} />
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>
          <a href="#dang-ky" className="btn-primary text-sm py-2.5 px-5">
            {c.cta}
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleLang}
            className={`flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1.5 border ${
              scrolled ? 'border-gray-200 text-dark' : 'border-white/30 text-white'
            }`}
            aria-label={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
          >
            <Globe size={12} />
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>
          <button
            className={scrolled ? 'text-dark' : 'text-white'}
            onClick={() => setOpen((v) => !v)}
            aria-label={c.menuLabel}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-3">
          {c.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-dark hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a href="#dang-ky" onClick={() => setOpen(false)} className="btn-primary block text-center text-sm py-2.5">
            {c.cta}
          </a>
        </div>
      )}
    </header>
  )
}
