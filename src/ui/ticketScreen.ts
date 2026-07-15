/**
 * The ticket screen — entry overlay, loading progress, and the WebGPU-required
 * notice. The only full-screen UI in the game.
 */
export const TICKET_REVEAL_SECONDS = 1.6

export interface TicketScreen {
  setProgress(label: string, fraction: number): void
  /** Swap progress for the enter button; resolves when the guest clicks. */
  showEnter(): Promise<void>
  showError(title: string, body: string): void
  hide(): void
}

export function createTicketScreen(parent: HTMLElement): TicketScreen {
  const root = document.createElement('div')
  root.className = 'ticket'
  root.innerHTML = `
    <div class="ticket-card">
      <div class="ticket-eyebrow">海底皇家游乐苑</div>
      <h1 class="ticket-title">明珠</h1>
      <div class="ticket-sub">凭票一人入场 · 一号金票 · 预展日</div>
      <div class="ticket-rule"></div>
      <div class="ticket-status">
        <div class="ticket-progress-label">正在唤醒机械……</div>
        <div class="ticket-progress"><i></i></div>
      </div>
    </div>
  `
  parent.appendChild(root)
  root.style.setProperty('--ticket-reveal-duration', `${TICKET_REVEAL_SECONDS}s`)

  const status = root.querySelector<HTMLElement>('.ticket-status')!
  // Re-pointed when the guest clicks Enter: the button is swapped for a fresh
  // progress read so the post-click warmup wait stays legible.
  let label = root.querySelector<HTMLElement>('.ticket-progress-label')!
  let bar = root.querySelector<HTMLElement>('.ticket-progress > i')!
  let lastFraction = 0

  const labels: Record<string, string> = {
    'render-pipeline': '擦亮镜片',
    'quality-benchmark': '校量机械',
    'ocean-sky': '描绘午后天光',
    'ocean-surface': '抚平水面',
    'arrival-pavilion': '系好浮标',
    'dev-orbit': '架稳三脚架',
    'sea-medium': '放入光线',
    seabed: '耙平细沙',
    flora: '栽种花园',
    physics: '上紧齿轮',
    player: '压印你的门票',
    'pause-card': '印制门票背面',
    interaction: '擦亮拉杆',
    teleport: '勾勒潮汐航线',
    'held-items': '为门票镶金',
    materials: '调配漆料',
    atrium: '竖起列柱',
    park: '开启园门',
    'descent-bell': '为绞盘上油',
    'pearl-line': '架设缆索',
    'great-wheel': '转动大转轮',
    carousel: '上紧八音盒',
    torrent: '为激流蓄势',
    scheduler: '拨定时刻表',
    wildlife: '唤醒海中生灵',
    'bubble-fountain': '教泡泡起舞',
    'schedule-boards': '摆好演出告示牌',
    audio: '调准八音盒',
    'debug-overlay': '挂上仪表',
    'test-gallery': '布置展廊',
    prewarm: '点亮巨型灯笼',
    ready: '就绪',
  }

  return {
    setProgress(key, fraction) {
      label.textContent = labels[key] ?? key.replace(/-/g, ' ')
      // 'ready' is a sentinel that the Enter button is live, not a real warmup
      // fraction; letting it pin the carried progress to 100% would make the
      // post-click "铺展乐园" bar jump backwards when the real warm resumes.
      if (key !== 'ready') lastFraction = Math.min(1, Math.max(0, fraction))
      bar.style.width = `${Math.round(lastFraction * 100)}%`
    },

    showEnter() {
      return new Promise((resolve) => {
        status.innerHTML = ''
        const button = document.createElement('button')
        button.className = 'ticket-enter'
        button.textContent = '步入乐园'
        status.appendChild(button)
        button.addEventListener(
          'click',
          () => {
            // Entering isn't instant — shader warmup may still be finishing, and
            // the live loop only starts once it does. Swap the button for a live
            // progress read (carrying the last known fraction so it never flashes
            // to zero) so the click is never mistaken for an unresponsive gate.
            status.innerHTML = `
              <div class="ticket-progress-label">正在铺展乐园……</div>
              <div class="ticket-progress"><i></i></div>
            `
            label = status.querySelector<HTMLElement>('.ticket-progress-label')!
            bar = status.querySelector<HTMLElement>('.ticket-progress > i')!
            bar.style.width = `${Math.round(lastFraction * 100)}%`
            resolve()
          },
          { once: true },
        )
        button.focus()
      })
    },

    showError(title, body) {
      status.innerHTML = ''
      const el = document.createElement('div')
      el.className = 'ticket-error'
      const strong = document.createElement('strong')
      strong.textContent = title
      el.appendChild(strong)
      el.appendChild(document.createTextNode(body))
      status.appendChild(el)
    },

    hide() {
      root.classList.add('is-hidden')
      window.setTimeout(() => root.remove(), 1800)
    },
  }
}
