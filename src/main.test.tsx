import { describe, it, expect, vi } from 'vitest'
import { act } from '@testing-library/react'

vi.mock('@emailjs/browser', () => ({
  default: { send: vi.fn() },
}))

describe('main entry point', () => {
  it('mounts the App into the #root element', async () => {
    const rootElement = document.createElement('div')
    rootElement.id = 'root'
    document.body.appendChild(rootElement)

    await act(async () => {
      await import('./main')
    })

    expect(rootElement.innerHTML).not.toBe('')
    expect(rootElement.querySelector('nav')).toBeInTheDocument()
  })
})
