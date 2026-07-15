interface NavigatorUserAgentData {
  readonly brands?: readonly { readonly brand: string; readonly version: string }[]
  readonly mobile?: boolean
  readonly platform?: string
}

const MOBILE_USER_AGENT = /Android|iPhone|iPad|iPod|Mobile|Tablet|Silk|Kindle/i
const CHROMIUM_USER_AGENT = /Chrome|Chromium/i
const CHROMIUM_BRAND = /Chromium|Google Chrome/i

function userAgentData(): NavigatorUserAgentData | undefined {
  return (navigator as Navigator & { readonly userAgentData?: NavigatorUserAgentData })
    .userAgentData
}

export function isDesktopChromium(): boolean {
  const data = userAgentData()
  const chromium = data?.brands?.some(({ brand }) => CHROMIUM_BRAND.test(brand))
    ?? CHROMIUM_USER_AGENT.test(navigator.userAgent)
  const mobile = data?.mobile ?? MOBILE_USER_AGENT.test(navigator.userAgent)
  const platform = data?.platform ?? navigator.platform
  const ipadInDesktopMode = /mac/i.test(platform) && navigator.maxTouchPoints > 1

  return chromium && !mobile && !ipadInDesktopMode && !/Android/i.test(platform)
}

export function showDesktopChromiumGate(parent: HTMLElement): void {
  const gate = document.createElement('main')
  gate.className = 'browser-gate'
  gate.setAttribute('aria-labelledby', 'browser-gate-title')
  gate.innerHTML = `
    <div class="browser-gate-content">
      <p class="browser-gate-eyebrow">海底皇家游乐苑</p>
      <h1 id="browser-gate-title">明珠</h1>
      <div class="browser-gate-rule" aria-hidden="true"></div>
      <p class="browser-gate-notice">
        <strong>仅限桌面版 Chromium 浏览器入场</strong>
        <span>请在桌面版 Chromium 内核浏览器（如 Chrome、Edge）中开启本体验。</span>
      </p>
    </div>
  `
  parent.replaceChildren(gate)
}
