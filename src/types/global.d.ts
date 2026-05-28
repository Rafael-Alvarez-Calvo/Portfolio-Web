// Cloudflare Turnstile global callback
interface Window {
  onTurnstileVerify: (token: string) => void
  onTurnstileExpire: () => void
  turnstile?: {
    reset: (widgetId?: string) => void
    remove: (widgetId?: string) => void
  }
}
