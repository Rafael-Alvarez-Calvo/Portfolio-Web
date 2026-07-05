import { describe, it, expect, vi } from 'vitest'
import { screen, act, fireEvent } from '@testing-library/react'
import { renderWithLanguageProvider } from '../../test/render'
import { revealAllIntersectionObservers } from '../../test/intersection-observer'

vi.mock('../../i18n/translations', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../i18n/translations')>()
  const extraJob = {
    date: 'Jan 2020 — Feb 2021',
    company: 'Sixth Company',
    role: 'Developer',
    current: false,
    desc: 'A sixth job with no matching company logo.',
    tech: ['React'],
  }
  return {
    ...actual,
    translations: {
      es: {
        ...actual.translations.es,
        experience: {
          ...actual.translations.es.experience,
          jobs: [...actual.translations.es.experience.jobs, extraJob],
        },
      },
      en: {
        ...actual.translations.en,
        experience: {
          ...actual.translations.en.experience,
          jobs: [...actual.translations.en.experience.jobs, extraJob],
        },
      },
    },
  }
})

const { Experience } = await import('./Experience')

describe('Experience', () => {
  it('renders the header and every timeline entry, including the current-job badge', () => {
    renderWithLanguageProvider(<Experience />)

    expect(screen.getByText('profesional')).toBeInTheDocument()
    expect(screen.getByText('CaixaBank Tech')).toBeInTheDocument()
    expect(screen.getByText('MentorUP')).toBeInTheDocument()
    expect(screen.getByText('Sixth Company')).toBeInTheDocument()
    expect(screen.getByText('Trabajo actual')).toBeInTheDocument()
  })

  it('does not render a logo for a job with no matching company key', () => {
    renderWithLanguageProvider(<Experience />)
    const sixthJobRole = screen.getByText('Developer')
    const sixthJobContainer = sixthJobRole.closest('.timeline-item')
    expect(sixthJobContainer?.querySelector('img, svg')).toBeNull()
  })

  it('triggers the fallback onError handlers for the external Habitatsoft and Pisos.com logos', () => {
    renderWithLanguageProvider(<Experience />)
    const habitatsoftLogo = screen.getByAltText('Habitatsoft') as HTMLImageElement
    const pisosLogo = screen.getByAltText('Pisos.com') as HTMLImageElement

    expect(habitatsoftLogo.style.display).not.toBe('none')
    fireEvent.error(habitatsoftLogo)
    expect(habitatsoftLogo.style.display).toBe('none')

    expect(pisosLogo.style.display).not.toBe('none')
    fireEvent.error(pisosLogo)
    expect(pisosLogo.style.display).toBe('none')
  })

  it('reveals the header and each timeline item once they intersect the viewport', () => {
    renderWithLanguageProvider(<Experience />)
    act(() => {
      revealAllIntersectionObservers()
    })
    expect(screen.getByText('profesional').closest('.reveal')?.className).toContain('visible')
  })
})
