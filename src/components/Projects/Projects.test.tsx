import { describe, it, expect } from 'vitest'
import { screen, act } from '@testing-library/react'
import { renderWithLanguageProvider } from '../../test/render'
import { revealAllIntersectionObservers } from '../../test/intersection-observer'
import { Projects } from './Projects'

describe('Projects', () => {
  it('renders the header and every project card', () => {
    renderWithLanguageProvider(<Projects />)

    expect(screen.getByText('destacados')).toBeInTheDocument()
    expect(screen.getByText('INCO Estudio Técnico')).toBeInTheDocument()
    expect(screen.getByText('Clínica Pal Dental')).toBeInTheDocument()
    expect(screen.getByText('Cotizador de Criptomonedas')).toBeInTheDocument()
    expect(screen.getByText('Buscador del Clima')).toBeInTheDocument()
    expect(screen.getByText('Seguimiento de Pacientes')).toBeInTheDocument()
    expect(screen.getByText('Control de Presupuesto')).toBeInTheDocument()
    expect(screen.getByText('GuitarLA — Tienda Online')).toBeInTheDocument()
    expect(screen.getByText('Ver más proyectos en GitHub →')).toBeInTheDocument()
  })

  it('reveals the header and every project card once they intersect the viewport', () => {
    renderWithLanguageProvider(<Projects />)
    act(() => {
      revealAllIntersectionObservers()
    })
    expect(screen.getByText('destacados').closest('.reveal')?.className).toContain('visible')
    expect(screen.getByText('INCO Estudio Técnico').closest('.reveal')?.className).toContain('visible')
  })
})
