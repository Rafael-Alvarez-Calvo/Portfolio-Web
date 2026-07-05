import { describe, it, expect } from 'vitest'
import { screen, act } from '@testing-library/react'
import { renderWithLanguageProvider } from '../../test/render'
import { revealAllIntersectionObservers } from '../../test/intersection-observer'
import { Certifications } from './Certifications'

describe('Certifications', () => {
  it('renders the bootcamp info and every certification card', () => {
    renderWithLanguageProvider(<Certifications />)

    expect(screen.getByText('Sep 2020 — Jan 2021')).toBeInTheDocument()
    expect(screen.getByText('The Bridge | Digital Talent Accelerator')).toBeInTheDocument()
    expect(screen.getByText('React Testing Library & Jest')).toBeInTheDocument()
    expect(screen.getByText('Microfrontends with React')).toBeInTheDocument()
    expect(screen.getByText('Principios SOLID y Clean Code')).toBeInTheDocument()
    expect(screen.getByText('Advanced React for Enterprise')).toBeInTheDocument()
    expect(screen.getByText('React y TypeScript — Guía Completa')).toBeInTheDocument()
    expect(screen.getByText('React Testing')).toBeInTheDocument()
  })

  it('reveals the header, education card and certification cards on intersection', () => {
    renderWithLanguageProvider(<Certifications />)
    act(() => {
      revealAllIntersectionObservers()
    })
    expect(screen.getByText('The Bridge | Digital Talent Accelerator').closest('.reveal')?.className).toContain('visible')
    expect(screen.getByText('React Testing Library & Jest').closest('.reveal')?.className).toContain('visible')
  })
})
