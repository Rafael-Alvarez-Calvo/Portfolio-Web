import { vi } from 'vitest'

type IntersectionCallback = (entries: Array<{ isIntersecting: boolean }>) => void

export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []
  callback: IntersectionCallback
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()

  constructor(callback: IntersectionCallback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }

  triggerIntersection(isIntersecting: boolean) {
    this.callback([{ isIntersecting }])
  }
}

export function installIntersectionObserverMock() {
  MockIntersectionObserver.instances = []
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
}

export function getLatestIntersectionObserver(): MockIntersectionObserver {
  const instances = MockIntersectionObserver.instances
  const latestObserver = instances[instances.length - 1]
  if (!latestObserver) throw new Error('No IntersectionObserver instance was created')
  return latestObserver
}

export function getAllIntersectionObservers(): MockIntersectionObserver[] {
  return MockIntersectionObserver.instances
}

export function revealAllIntersectionObservers() {
  for (const observer of MockIntersectionObserver.instances) {
    observer.triggerIntersection(true)
  }
}
