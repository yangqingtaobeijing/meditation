import { createContext, useContext, useState, useEffect } from 'react'
import { zh } from '../i18n/zh'
import { en } from '../i18n/en'

const LanguageContext = createContext()

const translations = { zh, en }

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'zh'
    }
    return 'zh'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => setLang(prev => prev === 'zh' ? 'en' : 'zh')

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[lang]
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
