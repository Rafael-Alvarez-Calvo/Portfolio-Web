import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { translations, Lang } from '../i18n/translations'

type Translations = typeof translations

interface LanguageContextType {
  lang: Lang
  setLang: (nextLang: Lang) => void
  translations: Translations[Lang]
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const DOCUMENT_TITLE_BY_LANG: Record<Lang, string> = {
  es: 'Rafael Álvarez Calvo | Desarrollador Frontend en Madrid',
  en: 'Rafael Álvarez Calvo | Frontend Developer in Madrid',
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('es')
  const activeTranslations = translations[lang] as Translations[Lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = DOCUMENT_TITLE_BY_LANG[lang]
  }, [lang])

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
