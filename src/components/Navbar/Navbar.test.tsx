import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithLanguageProvider } from '../../test/render'
import { Navbar } from './Navbar'

describe('Navbar', () => {
  it('renders the logo and the desktop navigation links', () => {
    renderWithLanguageProvider(<Navbar />)
    expect(screen.getAllByText('Rafael').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Sobre mí' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Servicios' })).toBeInTheDocument()
  })

  it('applies the scrolled background once the page scrolls past 50px', () => {
    renderWithLanguageProvider(<Navbar />)
    const nav = screen.getByRole('navigation')
    expect(nav.className).not.toContain('backdrop-blur-xl')

    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true })
    fireEvent.scroll(window)
    expect(nav.className).toContain('backdrop-blur-xl')

    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
    fireEvent.scroll(window)
    expect(nav.className).not.toContain('backdrop-blur-xl')
  })

  it('toggles the language via the desktop button in both directions', async () => {
    const user = userEvent.setup()
    renderWithLanguageProvider(<Navbar />)

    const toggleButton = screen.getByRole('button', { name: 'ES' })
    expect(toggleButton).toHaveAttribute('title', 'Switch to English')

    await user.click(toggleButton)
    const toggledButton = screen.getByRole('button', { name: 'EN' })
    expect(toggledButton).toHaveAttribute('title', 'Cambiar a Español')

    await user.click(toggledButton)
    expect(screen.getByRole('button', { name: 'ES' })).toBeInTheDocument()
  })

  it('opens the CV dropdown, keeps it open on an inside click, and closes it on an outside click', async () => {
    const user = userEvent.setup()
    renderWithLanguageProvider(<Navbar />)

    await user.click(screen.getByRole('button', { name: /Descargar CV/ }))
    const spanishCvLink = screen.getByRole('link', { name: /CV en Español/ })
    expect(spanishCvLink).toBeInTheDocument()

    fireEvent.mouseDown(spanishCvLink)
    expect(screen.getByRole('link', { name: /CV en Español/ })).toBeInTheDocument()

    fireEvent.mouseDown(document.body)
    expect(screen.queryByRole('link', { name: /CV en Español/ })).not.toBeInTheDocument()
  })

  it('opens and closes the mobile menu, and toggles language from within it', async () => {
    const user = userEvent.setup()
    renderWithLanguageProvider(<Navbar />)

    const hamburgerButton = screen.getAllByRole('button').find((button) => !button.textContent)
    if (!hamburgerButton) throw new Error('hamburger button not found')

    await user.click(hamburgerButton)
    const mobileLangButtons = screen.getAllByRole('button', { name: 'ES' })
    expect(mobileLangButtons.length).toBe(2)

    await user.click(mobileLangButtons[1])
    const englishButtons = screen.getAllByRole('button', { name: 'EN' })
    expect(englishButtons.length).toBeGreaterThan(0)

    await user.click(englishButtons[englishButtons.length - 1])
    expect(screen.getAllByRole('button', { name: 'ES' }).length).toBeGreaterThan(0)

    await user.click(hamburgerButton)
    expect(screen.getAllByRole('button', { name: 'ES' }).length).toBe(1)
  })

  it('closes the mobile menu when a navigation link is clicked', async () => {
    const user = userEvent.setup()
    renderWithLanguageProvider(<Navbar />)

    const hamburgerButton = screen.getAllByRole('button').find((button) => !button.textContent)
    if (!hamburgerButton) throw new Error('hamburger button not found')
    await user.click(hamburgerButton)

    const links = screen.getAllByRole('link', { name: 'Sobre mí' })
    expect(links.length).toBe(2)
    await user.click(links[links.length - 1])

    expect(screen.getAllByRole('link', { name: 'Sobre mí' }).length).toBe(1)
  })

  it('closes the mobile menu when the contact link is clicked', async () => {
    const user = userEvent.setup()
    renderWithLanguageProvider(<Navbar />)

    const hamburgerButton = screen.getAllByRole('button').find((button) => !button.textContent)
    if (!hamburgerButton) throw new Error('hamburger button not found')
    await user.click(hamburgerButton)

    const contactLinks = screen.getAllByRole('link', { name: 'Contacto' })
    await user.click(contactLinks[contactLinks.length - 1])

    expect(screen.getAllByRole('link', { name: 'Contacto' }).length).toBe(1)
  })

  it('removes its scroll and click listeners on unmount', () => {
    const { unmount } = renderWithLanguageProvider(<Navbar />)
    expect(() => unmount()).not.toThrow()
  })
})
