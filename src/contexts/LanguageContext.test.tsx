import { describe, it, expect, vi } from 'vitest'
import { render, screen, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider, useLang } from './LanguageContext'

function LanguageConsumer() {
  const { lang, setLang, translations } = useLang()
  return (
    <div>
      <span data-testid="current-lang">{lang}</span>
      <span data-testid="nav-about">{translations.nav.about}</span>
      <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')}>toggle</button>
    </div>
  )
}

describe('LanguageProvider', () => {
  it('defaults to Spanish translations', () => {
    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('current-lang')).toHaveTextContent('es')
    expect(screen.getByTestId('nav-about')).toHaveTextContent('Sobre mí')
    expect(document.documentElement.lang).toBe('es')
    expect(document.title).toBe('Rafael Álvarez Calvo | Desarrollador Frontend en Madrid')
  })

  it('switches translations when setLang is called', async () => {
    const user = userEvent.setup()
    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'toggle' }))

    expect(screen.getByTestId('current-lang')).toHaveTextContent('en')
    expect(screen.getByTestId('nav-about')).toHaveTextContent('About')
    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toBe('Rafael Álvarez Calvo | Frontend Developer in Madrid')
  })
})

describe('useLang', () => {
  it('throws when used outside a LanguageProvider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      expect(() => renderHook(() => useLang())).toThrow(
        'useLang must be used inside LanguageProvider',
      )
    } finally {
      errorSpy.mockRestore()
    }
  })
})
