import { describe, it, expect } from 'vitest'
import { screen, act } from '@testing-library/react'
import { renderWithLanguageProvider } from '../../test/render'
import { revealAllIntersectionObservers } from '../../test/intersection-observer'
import { Services } from './Services'

describe('Services', () => {
  it('renders the header and every service row, including the AI badge only on the AI service', () => {
    renderWithLanguageProvider(<Services />)

    expect(screen.getByText('por tu negocio?')).toBeInTheDocument()
    expect(screen.getByText('Página Web Profesional')).toBeInTheDocument()
    expect(screen.getByText('Tienda Online (E-commerce)')).toBeInTheDocument()
    expect(screen.getByText('Soluciones con Inteligencia Artificial')).toBeInTheDocument()
    expect(screen.getByText('CRM & Aplicaciones a Medida')).toBeInTheDocument()
    expect(screen.getByText('Mejora y Migración Web')).toBeInTheDocument()
    expect(screen.getByText('Integraciones y APIs')).toBeInTheDocument()

    expect(screen.getByText('✨ Más demandado')).toBeInTheDocument()
    expect(screen.getAllByText('Solicitar presupuesto')).toHaveLength(6)
  })

  it('reveals the header and each service row once they intersect the viewport', () => {
    renderWithLanguageProvider(<Services />)
    act(() => {
      revealAllIntersectionObservers()
    })
    expect(screen.getByText('por tu negocio?').closest('.reveal')?.className).toContain('visible')
    expect(screen.getByText('Página Web Profesional').closest('.reveal')?.className).toContain('visible')
  })
})
