import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

function getInitialLang() {
  if (typeof window === 'undefined') return 'vi'
  return localStorage.getItem('hawee-tf-lang') === 'en' ? 'en' : 'vi'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    localStorage.setItem('hawee-tf-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => setLang((l) => (l === 'vi' ? 'en' : 'vi'))

  return <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
