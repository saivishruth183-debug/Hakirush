import { useEffect, useRef } from 'react'

/* ------------------------------------------------------------------ */
/*  Sports cursor — a spinning cricket ball with a red flight trail.   */
/*  • follows the mouse with a little weight                           */
/*  • spins in the direction it travels, faster when you move faster   */
/*  • a target ring locks on over links and buttons                     */
/*  • clicking squashes the ball and sends out an impact ring           */
/*  Only runs on devices with a mouse; touch screens keep normal taps. */
/*  Self-contained: no CSS file needed.                                 */
/* ------------------------------------------------------------------ */

const RED = '#D7192D'
const BALL = 18 // ball diameter in px
const HOVER_TARGETS = 'a, button, [role="button"], label, select, summary, [data-cursor-hover]'
const TEXT_TARGETS = 'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]'

export default function CustomCursor() {
  const rootRef = useRef(null)
  const ballRef = useRef(null)
  const spinRef = useRef(null)
  const ringRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const root = rootRef.current
    const ball = ballRef.current
    const spin = spinRef.current
    const ring = ringRef.current
    const canvas = canvasRef.current
    if (!root || !ball || !spin || !ring || !canvas) return
    const ctx = canvas.getContext('2d')

    // hide the system cursor everywhere except text fields
    const style = document.createElement('style')
    style.setAttribute('data-sports-cursor', '')
    style.textContent = `
      html.has-sports-cursor, html.has-sports-cursor * { cursor: none !important; }
      html.has-sports-cursor ${TEXT_TARGETS.split(', ').join(', html.has-sports-cursor ')} { cursor: text !important; }
    `
    document.head.appendChild(style)
    document.documentElement.classList.add('has-sports-cursor')

    // ---- state ----
    const mouse = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let angle = 0
    let visible = false
    let hovering = false
    let overText = false
    let pressed = false
    let squash = 0
    const trail = [] // {x, y, life}
    const bursts = [] // {x, y, t}
    let raf

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // ---- events ----
    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!visible) {
        pos.x = mouse.x
        pos.y = mouse.y
        visible = true
      }
      const t = e.target
      hovering = !!(t && t.closest && t.closest(HOVER_TARGETS))
      overText = !!(t && t.closest && t.closest(TEXT_TARGETS))
    }
    const onDown = () => {
      pressed = true
      squash = 1
      if (!reduce) bursts.push({ x: mouse.x, y: mouse.y, t: 0 })
    }
    const onUp = () => (pressed = false)
    const onLeave = () => {
      visible = false
      trail.length = 0
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('blur', onLeave)
    document.addEventListener('mouseleave', onLeave)

    // ---- frame loop ----
    const tick = () => {
      // follow with a little weight (instant when reduced motion)
      const k = reduce ? 1 : 0.32
      const dx = mouse.x - pos.x
      const dy = mouse.y - pos.y
      pos.x += dx * k
      pos.y += dy * k
      const speed = Math.hypot(dx, dy)

      // spin in the direction of travel
      if (!reduce) angle += (dx >= 0 ? 1 : -1) * Math.min(speed, 60) * 2.2
      squash *= 0.82

      const show = visible && !overText
      root.style.opacity = show ? '1' : '0'

      const ballScale = (hovering ? 0.7 : 1) * (pressed ? 0.85 : 1)
      const sx = 1 + squash * 0.35
      const sy = 1 - squash * 0.25
      ball.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${ballScale * sx}, ${ballScale * sy})`
      spin.style.transform = `rotate(${angle}deg)`

      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1 : 0.4}) rotate(${hovering && !reduce ? angle * 0.15 : 0}deg)`
      ring.style.opacity = show && hovering ? '1' : '0'

      // ---- trail + impact rings ----
      ctx.clearRect(0, 0, innerWidth, innerHeight)

      if (!reduce && show && speed > 1.2) trail.push({ x: pos.x, y: pos.y, life: 1 })
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].life -= 0.07
        if (trail[i].life <= 0) trail.splice(i, 1)
      }
      if (trail.length > 28) trail.splice(0, trail.length - 28)

      // tapered streak: thick and bright near the ball, thin and fading behind
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1]
        const b = trail[i]
        const f = i / trail.length
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(215, 25, 45, ${0.55 * f * b.life})`
        ctx.lineWidth = Math.max(1, (BALL * 0.7) * f * b.life)
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      for (let i = bursts.length - 1; i >= 0; i--) {
        const p = bursts[i]
        p.t += 0.05
        if (p.t >= 1) {
          bursts.splice(i, 1)
          continue
        }
        const r = 10 + p.t * 34
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(215, 25, 45, ${0.7 * (1 - p.t)})`
        ctx.lineWidth = 2.5 * (1 - p.t) + 0.5
        ctx.stroke()
        // little speed lines
        for (let j = 0; j < 6; j++) {
          const th = (j / 6) * Math.PI * 2 + 0.3
          ctx.beginPath()
          ctx.moveTo(p.x + Math.cos(th) * (r + 3), p.y + Math.sin(th) * (r + 3))
          ctx.lineTo(p.x + Math.cos(th) * (r + 9), p.y + Math.sin(th) * (r + 9))
          ctx.strokeStyle = `rgba(251, 247, 242, ${0.6 * (1 - p.t)})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('blur', onLeave)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-sports-cursor')
      style.remove()
    }
  }, [])

  const fixed = { position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }

  return (
    <div ref={rootRef} aria-hidden="true" style={{ ...fixed, inset: 0, zIndex: 2147483000, opacity: 0, transition: 'opacity .2s' }}>
      <canvas ref={canvasRef} style={{ ...fixed }} />

      {/* target ring (shows over links and buttons) */}
      <div
        ref={ringRef}
        style={{
          ...fixed,
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '2px solid #FBF7F2',
          boxShadow: `0 0 0 1px rgba(0,0,0,0.35), 0 0 16px ${RED}aa, inset 0 0 0 1px rgba(0,0,0,0.25)`,
          opacity: 0,
          transition: 'opacity .2s',
          willChange: 'transform',
        }}
      >
        {/* crosshair ticks */}
        {[0, 90, 180, 270].map((d) => (
          <span
            key={d}
            style={{
              position: 'absolute',
              left: '50%',
              top: -7,
              width: 2,
              height: 7,
              marginLeft: -1,
              background: '#FBF7F2',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.3)',
              transformOrigin: '1px 29px',
              transform: `rotate(${d}deg)`,
            }}
          />
        ))}
      </div>

      {/* the ball */}
      <div ref={ballRef} style={{ ...fixed, width: BALL, height: BALL, willChange: 'transform' }}>
        <div
          ref={spinRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle at 32% 30%, #ff7a7a 0%, ${RED} 38%, #7a0a16 100%)`,
            boxShadow: `0 0 0 1.5px rgba(251,247,242,0.9), 0 2px 6px rgba(0,0,0,0.5), 0 0 10px ${RED}66`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* stitched seam */}
          <svg viewBox="0 0 20 20" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <path d="M10 0 C 6 6, 6 14, 10 20" stroke="#fde8c8" strokeWidth="1.1" fill="none" />
            <path d="M10 0 C 14 6, 14 14, 10 20" stroke="#fde8c8" strokeWidth="1.1" fill="none" />
            <path d="M8.6 3 l -1.6 .4 M7.4 6.5 l -1.7 .2 M7 10 l -1.8 0 M7.4 13.5 l -1.7 -.2 M8.6 17 l -1.6 -.4" stroke="#fde8c8" strokeWidth=".6" />
            <path d="M11.4 3 l 1.6 .4 M12.6 6.5 l 1.7 .2 M13 10 l 1.8 0 M12.6 13.5 l 1.7 -.2 M11.4 17 l 1.6 -.4" stroke="#fde8c8" strokeWidth=".6" />
          </svg>
        </div>
      </div>
    </div>
  )
}