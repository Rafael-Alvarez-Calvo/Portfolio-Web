import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, Lang } from '../i18n/translations'

type Translations = typeof translations

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations[Lang]
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  const t = translations[lang] as Translations[Lang]
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
