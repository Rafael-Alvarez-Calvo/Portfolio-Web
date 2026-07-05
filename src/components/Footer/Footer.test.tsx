import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithLanguageProvider } from '../../test/render'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders the copyright, role and credit line from translations', () => {
    renderWithLanguageProvider(<Footer />)
    expect(screen.getByText(/Rafael Álvarez Calvo/)).toBeInTheDocument()
    expect(screen.getByText(/Frontend Developer/)).toBeInTheDocument()
    expect(screen.getByText(/Diseñado y desarrollado/)).toBeInTheDocument()
  })
})
