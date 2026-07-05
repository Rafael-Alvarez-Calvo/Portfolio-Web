import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from './App'

vi.mock('@emailjs/browser', () => ({
  default: { send: vi.fn() },
}))

describe('App', () => {
  it('composes every section under a single LanguageProvider without crashing', () => {
    render(<App />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Álvarez Calvo')).toBeInTheDocument()
    expect(screen.getAllByText(/Rafael Álvarez Calvo/).length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: 'ES' })).toBeInTheDocument()
  })
})
