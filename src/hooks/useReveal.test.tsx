import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, renderHook, screen, act } from '@testing-library/react'
import { useRef } from 'react'
import { useReveal, useCounter } from './useReveal'
import { getLatestIntersectionObserver } from '../test/intersection-observer'

function RevealTestComponent({ threshold }: { threshold?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(threshold)
  return (
    <div ref={ref} data-testid="reveal-target">
      {visible ? 'visible' : 'hidden'}
    </div>
  )
}

describe('useReveal', () => {
  it('starts hidden and becomes visible once the element intersects the viewport', () => {
    render(<RevealTestComponent />)
    expect(screen.getByTestId('reveal-target')).toHaveTextContent('hidden')

    const observer = getLatestIntersectionObserver()
    act(() => observer.triggerIntersection(false))
    expect(screen.getByTestId('reveal-target')).toHaveTextContent('hidden')

    act(() => observer.triggerIntersection(true))
    expect(screen.getByTestId('reveal-target')).toHaveTextContent('visible')
    expect(observer.unobserve).toHaveBeenCalledTimes(1)
  })

  it('accepts a custom threshold and passes it to IntersectionObserver', () => {
    render(<RevealTestComponent threshold={0.5} />)
    const observer = getLatestIntersectionObserver()
    expect(observer.observe).toHaveBeenCalledTimes(1)
  })

  it('does nothing when the ref never attaches to an element', () => {
    const { result } = renderHook(() => useReveal())
    expect(result.current.visible).toBe(false)
    expect(getLatestIntersectionObserver).toThrow()
  })

  it('disconnects the observer on unmount', () => {
    const { unmount } = render(<RevealTestComponent />)
    const observer = getLatestIntersectionObserver()
    unmount()
    expect(observer.disconnect).toHaveBeenCalledTimes(1)
  })
})

function CounterTestComponent({ target, duration }: { target: number; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const count = useCounter(target, ref, duration)
  return <div ref={ref} data-testid="counter-target">{count}</div>
}

describe('useCounter', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('does nothing when the ref never attaches to an element', () => {
    const ref = { current: null }
    const { result } = renderHook(() => useCounter(10, ref))
    expect(result.current).toBe(0)
    expect(getLatestIntersectionObserver).toThrow()
  })

  it('stays at 0 while not intersecting', () => {
    render(<CounterTestComponent target={10} />)
    const observer = getLatestIntersectionObserver()
    act(() => observer.triggerIntersection(false))
    expect(screen.getByTestId('counter-target')).toHaveTextContent('0')
  })

  it('animates the count up to the target once visible, then stops', () => {
    vi.useFakeTimers()
    render(<CounterTestComponent target={100} duration={1000} />)
    const observer = getLatestIntersectionObserver()

    act(() => observer.triggerIntersection(true))
    expect(observer.unobserve).toHaveBeenCalledTimes(1)

    act(() => {
      vi.advanceTimersByTime(500)
    })
    const midValue = Number(screen.getByTestId('counter-target').textContent)
    expect(midValue).toBeGreaterThan(0)
    expect(midValue).toBeLessThan(100)

    act(() => {
      vi.advanceTimersByTime(600)
    })
    expect(screen.getByTestId('counter-target')).toHaveTextContent('100')
  })

  it('ignores a second intersection once the animation has already started', () => {
    vi.useFakeTimers()
    render(<CounterTestComponent target={10} duration={100} />)
    const observer = getLatestIntersectionObserver()

    act(() => observer.triggerIntersection(true))
    act(() => observer.triggerIntersection(true))
    expect(observer.unobserve).toHaveBeenCalledTimes(1)

    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(screen.getByTestId('counter-target')).toHaveTextContent('10')
  })

  it('disconnects the observer on unmount', () => {
    const { unmount } = render(<CounterTestComponent target={5} />)
    const observer = getLatestIntersectionObserver()
    unmount()
    expect(observer.disconnect).toHaveBeenCalledTimes(1)
  })
})
