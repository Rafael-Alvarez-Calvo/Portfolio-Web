import { describe, it, expect } from 'vitest'
import { screen, act } from '@testing-library/react'
import { renderWithLanguageProvider } from '../../test/render'
import { revealAllIntersectionObservers } from '../../test/intersection-observer'
import { About } from './About'

describe('About', () => {
  it('renders the intro paragraphs and the fake code snippet', () => {
    renderWithLanguageProvider(<About />)

    expect(screen.getByText(/Soy desarrollador Front-End/)).toBeInTheDocument()
    expect(screen.getByText('CaixaBank Tech')).toBeInTheDocument()
    expect(screen.getByText('Pisos.com')).toBeInTheDocument()
    expect(screen.getByText('negocios como el tuyo')).toBeInTheDocument()

    expect(screen.getByText('"Rafael Álvarez Calvo"')).toBeInTheDocument()
    expect(screen.getByText('"Frontend Developer"')).toBeInTheDocument()
    expect(screen.getByText('"Madrid, España"')).toBeInTheDocument()
    expect(screen.getByText('"Microfrontends"')).toBeInTheDocument()
    expect(screen.getByText('"AI Solutions"')).toBeInTheDocument()
    expect(screen.getByText('"Clean Code + SOLID"')).toBeInTheDocument()
    expect(screen.getByText('"Testing (Jest / RTL)"')).toBeInTheDocument()
    expect(screen.getByText('true')).toBeInTheDocument()

    expect(screen.getByText('GitHub', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('LinkedIn', { exact: false })).toBeInTheDocument()
  })

  it('reveals both columns once they intersect the viewport', () => {
    renderWithLanguageProvider(<About />)
    act(() => {
      revealAllIntersectionObservers()
    })
    expect(screen.getByText(/Soy desarrollador Front-End/).closest('div')?.className).toContain('visible')
  })
})
