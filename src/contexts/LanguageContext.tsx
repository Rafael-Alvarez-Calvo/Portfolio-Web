import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, Lang } from '../i18n/translations'

type Translations = typeof translations

interface LanguageContextType {
  lang: Lang
  setLang: (nextLang: Lang) => void
  translations: Translations[Lang]
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('es')
  const activeTranslations = translations[lang] as Translations[Lang]
  return (
    <LanguageContext.Provider value={{ lang, setLang, translations: activeTranslations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLang must be used inside LanguageProvider')
  return context
}
