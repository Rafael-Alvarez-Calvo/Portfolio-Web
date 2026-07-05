import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, act, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { renderWithLanguageProvider } from '../../test/render'
import { revealAllIntersectionObservers } from '../../test/intersection-observer'
import { LanguageProvider, useLang } from '../../contexts/LanguageContext'
import { Contact } from './Contact'

function ContactWithLanguageToggle() {
  const { setLang } = useLang()
  return (
    <>
      <button onClick={() => setLang('en')}>switch to english</button>
      <Contact />
    </>
  )
}

const sendMock = vi.fn()
vi.mock('@emailjs/browser', () => ({
  default: { send: (...args: unknown[]) => sendMock(...args) },
}))

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText('Tu nombre'), 'Ada Lovelace')
  await user.type(screen.getByPlaceholderText('tu@email.com'), 'ada@example.com')
  await user.selectOptions(screen.getByRole('combobox'), 'Página web profesional')
  await user.type(
    screen.getByPlaceholderText('Describe brevemente qué necesitas para tu negocio...'),
    'Necesito una web nueva.',
  )
}

describe('Contact', () => {
  beforeEach(() => {
    sendMock.mockReset()
    delete (window as { turnstile?: unknown }).turnstile
  })

  it('renders every contact link, both internal and external', () => {
    renderWithLanguageProvider(<Contact />)
    expect(screen.getByText('rafael.alvarez@hotmail.es')).toBeInTheDocument()
    expect(screen.getByText('linkedin.com/in/rafael-ac').closest('a')).toHaveAttribute('target', '_blank')
    expect(screen.getByText('+34 610 385 927').closest('a')).not.toHaveAttribute('target')
  })

  it('reveals the header and both columns once they intersect the viewport', () => {
    renderWithLanguageProvider(<Contact />)
    act(() => {
      revealAllIntersectionObservers()
    })
    expect(screen.getByText('en mente?').closest('.reveal')?.className).toContain('visible')
  })

  it('shows the captcha reminder and blocks submission until Turnstile verifies', async () => {
    const user = userEvent.setup()
    renderWithLanguageProvider(<Contact />)
    await fillRequiredFields(user)

    expect(screen.getAllByText(/verificación requerida/)).toHaveLength(1)
    expect(screen.getByRole('button', { name: /Enviar mensaje/ })).toBeDisabled()

    // The submit button is disabled with no token, but the form could still be
    // submitted another way (e.g. pressing Enter) — the handler's own guard is
    // what actually blocks it, so fire the submit event directly to exercise it.
    fireEvent.submit(screen.getByRole('button', { name: /Enviar mensaje/ }).closest('form')!)

    // Once blocked, both the static hint and the newly-set error message share the same text.
    expect(screen.getAllByText(/verificación requerida/)).toHaveLength(2)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('shows the verified message once Turnstile calls the global verify callback, and resets on expiry', async () => {
    renderWithLanguageProvider(<Contact />)

    act(() => {
      window.onTurnstileVerify('fake-token')
    })
    expect(screen.getByText('✓ verificación completada')).toBeInTheDocument()

    act(() => {
      window.onTurnstileExpire()
    })
    expect(screen.getByText(/verificación requerida/)).toBeInTheDocument()
  })

  it('submits successfully, shows the loading state, then resets back to idle', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const user = userEvent.setup({ delay: null })
    window.turnstile = { reset: vi.fn(), remove: vi.fn() }
    let resolveSend: (value: unknown) => void = () => {}
    sendMock.mockReturnValue(new Promise((resolve) => { resolveSend = resolve }))

    renderWithLanguageProvider(<Contact />)
    await fillRequiredFields(user)
    act(() => {
      window.onTurnstileVerify('fake-token')
    })

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/ }))

    expect(screen.getByText('Enviando...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enviando...' })).toBeDisabled()

    await act(async () => {
      resolveSend(undefined)
      await Promise.resolve()
    })

    expect(screen.getByText('✓ ¡Mensaje enviado!')).toBeInTheDocument()
    expect(window.turnstile?.reset).toHaveBeenCalledTimes(1)

    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(screen.getByText('Enviar mensaje →')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('shows an error message when the email fails to send, then resets back to idle', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const user = userEvent.setup({ delay: null })
    sendMock.mockRejectedValue(new Error('network down'))

    renderWithLanguageProvider(<Contact />)
    await fillRequiredFields(user)
    act(() => {
      window.onTurnstileVerify('fake-token')
    })

    await user.click(screen.getByRole('button', { name: /Enviar mensaje/ }))

    await waitFor(() => {
      expect(screen.getByText(/Algo salió mal/)).toBeInTheDocument()
    })
    expect(screen.getByText('✗ Reintentar')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(6000)
    })
    expect(screen.getByText('Enviar mensaje →')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('does not throw when the component unmounts while a submission is still in flight', async () => {
    const user = userEvent.setup()
    let resolveSend: (value: unknown) => void = () => {}
    sendMock.mockReturnValue(new Promise((resolve) => { resolveSend = resolve }))

    const { unmount } = renderWithLanguageProvider(<Contact />)
    await fillRequiredFields(user)
    act(() => {
      window.onTurnstileVerify('fake-token')
    })
    await user.click(screen.getByRole('button', { name: /Enviar mensaje/ }))

    unmount()

    await act(async () => {
      resolveSend(undefined)
      await Promise.resolve()
    })
  })

  it('uses the English locale for the submission timestamp when the language is English', async () => {
    const user = userEvent.setup()
    sendMock.mockResolvedValue(undefined)
    render(
      <LanguageProvider>
        <ContactWithLanguageToggle />
      </LanguageProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'switch to english' }))

    await user.type(screen.getByPlaceholderText('Your name'), 'Ada Lovelace')
    await user.type(screen.getByPlaceholderText('you@email.com'), 'ada@example.com')
    await user.selectOptions(screen.getByRole('combobox'), 'Professional website')
    await user.type(
      screen.getByPlaceholderText('Briefly describe what you need for your business...'),
      'I need a new website.',
    )
    act(() => {
      window.onTurnstileVerify('fake-token')
    })
    await user.click(screen.getByRole('button', { name: /Send message/ }))

    await waitFor(() => expect(sendMock).toHaveBeenCalledTimes(1))
    const [, , templateParams] = sendMock.mock.calls[0]
    expect(typeof templateParams.time).toBe('string')
  })
})
