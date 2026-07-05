import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { LanguageProvider } from '../contexts/LanguageContext'

export function renderWithLanguageProvider(ui: ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

export * from '@testing-library/react'
