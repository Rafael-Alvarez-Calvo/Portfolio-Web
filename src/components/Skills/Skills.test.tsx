import { describe, it, expect } from 'vitest'
import { screen, act } from '@testing-library/react'
import { renderWithLanguageProvider } from '../../test/render'
import { revealAllIntersectionObservers } from '../../test/intersection-observer'
import { Skills } from './Skills'

describe('Skills', () => {
  it('renders every group label and pill, covering highlighted, AI and plain pills', () => {
    renderWithLanguageProvider(<Skills />)

    expect(screen.getByText('stack técnico')).toBeInTheDocument()
    expect(screen.getByText('// Frontend Core')).toBeInTheDocument()
    expect(screen.getByText('// IA & Automatización')).toBeInTheDocument()

    // isHighlighted pill
    expect(screen.getByText('React.js')).toBeInTheDocument()
    // plain pill (neither highlighted nor AI-related)
    expect(screen.getByText('HTML5')).toBeInTheDocument()
    // isAiRelated pill
    expect(screen.getByText('Chatbots con IA')).toBeInTheDocument()
  })

  it('reveals the header and each group once they intersect the viewport', () => {
    renderWithLanguageProvider(<Skills />)
    act(() => {
      revealAllIntersectionObservers()
    })
    expect(screen.getByText('stack técnico').closest('.reveal')?.className).toContain('visible')
    expect(screen.getByText('// Frontend Core').closest('.reveal')?.className).toContain('visible')
  })
})
