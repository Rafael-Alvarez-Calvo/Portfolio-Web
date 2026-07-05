import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithLanguageProvider } from '../../test/render'
import { revealAllIntersectionObservers } from '../../test/intersection-observer'
import { LanguageProvider, useLang } from '../../contexts/LanguageContext'
import { Hero } from './Hero'
import { HERO_TYPEWRITER_ROLES, HERO_TECH_ICONS } from './Hero.constants'

function HeroWithLanguageToggle() {
  const { setLang } = useLang()
  return (
    <>
      <button onClick={() => setLang('en')}>switch to english</button>
      <Hero />
    </>
  )
}

describe('Hero', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the headline, CTAs, stats and tech icons', () => {
    renderWithLanguageProvider(<Hero />)

    expect(screen.getByText('Álvarez Calvo')).toBeInTheDocument()
    expect(screen.getByText('Ver proyectos')).toBeInTheDocument()
    expect(screen.getByText('Hablemos →')).toBeInTheDocument()
    expect(screen.getByText('Años exp.')).toBeInTheDocument()
    expect(screen.getByText('Proyectos')).toBeInTheDocument()
    expect(screen.getByText('Empresas')).toBeInTheDocument()
    expect(screen.getByText('Certs.')).toBeInTheDocument()

    for (const techIcon of HERO_TECH_ICONS) {
      expect(screen.getByText(techIcon.label)).toBeInTheDocument()
    }
  })

  it('reveals the intro text block once it intersects the viewport', () => {
    renderWithLanguageProvider(<Hero />)
    act(() => {
      revealAllIntersectionObservers()
    })
    expect(screen.getByText('Álvarez Calvo').closest('.reveal')?.className).toContain('visible')
  })

  it('types a role, pauses, deletes it, and moves on to the next role', () => {
    vi.useFakeTimers()
    renderWithLanguageProvider(<Hero />)

    const firstRole = HERO_TYPEWRITER_ROLES[0]
    for (let charIndex = 0; charIndex < firstRole.length; charIndex++) {
      act(() => {
        vi.advanceTimersByTime(100)
      })
    }
    expect(screen.getByText(firstRole)).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(2200)
    })

    for (let charIndex = 0; charIndex < firstRole.length; charIndex++) {
      act(() => {
        vi.advanceTimersByTime(45)
      })
    }
    expect(screen.queryByText(firstRole)).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(screen.getByText(HERO_TYPEWRITER_ROLES[1].slice(0, 1))).toBeInTheDocument()
  })

  it('resets the typed text when the language changes', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const user = userEvent.setup({ delay: null })
    render(
      <LanguageProvider>
        <HeroWithLanguageToggle />
      </LanguageProvider>,
    )

    act(() => {
      vi.advanceTimersByTime(300)
    })
    const typedSoFar = screen.getByText('>').nextSibling?.textContent ?? ''
    expect(typedSoFar.length).toBeGreaterThan(0)

    await user.click(screen.getByRole('button', { name: 'switch to english' }))

    const resetText = screen.getByText('>').nextSibling?.textContent ?? ''
    expect(resetText).toBe('')
  })

  it('unmounts cleanly while a typing timeout is pending', () => {
    vi.useFakeTimers()
    const { unmount } = renderWithLanguageProvider(<Hero />)
    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(() => unmount()).not.toThrow()
  })
})
