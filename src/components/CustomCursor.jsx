import { useEffect, useRef } from 'react'

/* ------------------------------------------------------------------ */
/*  HAKIRUSH 3D sports cursor                                           */
/*                                                                      */
/*  • A real 3D ball: the seam is a 3D curve on a sphere, rotated with  */
/*    a rolling-ball model, so it ROLLS in the direction you move.      */
/*  • Lit like an object: fixed key light + specular highlight, limb    */
/*    darkening and a rim light, so the seam turns under the light.     */
/*  • Floats above the page with its own shadow; clicking squashes it   */
/*    and it bounces back up like a ball hitting the turf.              */
/*  • Over links/buttons, gold-red corner brackets fly over and lock    */
/*    onto the element (the same corner marks as the cards) and the     */
/*    ball is gently pulled toward it.                                  */
/*  • Switch sport per section:  <section data-cursor-ball="tennis">    */
/*    → cricket (default) · tennis · basketball                         */
/*  • Mouse/trackpad only; touch screens keep normal taps. Respects     */
/*    reduced-motion. Self-contained: no CSS file needed.               */
/* ------------------------------------------------------------------ */

const RADIUS = 11 // ball radius in px
const HOVER_TARGETS = 'a, button, [role="button"], label, select, summary, [data-cursor-hover]'
const TEXT_TARGETS =
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]'
const LOCK_MAX_W = 520 // larger hover targets (whole cards) get a ring instead of brackets
const LOCK_MAX_H = 260
const TAU = Math.PI * 2

/* ---------------- 3D helpers (3×3 row-major matrices) ---------------- */

const IDENTITY = [1, 0, 0, 0, 1, 0, 0, 0, 1]

const rotAxis = (ax, ay, az, a) => {
  const c = Math.cos(a)
  const s = Math.sin(a)
  const t = 1 - c
  return [
    t * ax * ax + c, t * ax * ay - s * az, t * ax * az + s * ay,
    t * ax * ay + s * az, t * ay * ay + c, t * ay * az - s * ax,
    t * ax * az - s * ay, t * ay * az + s * ax, t * az * az + c,
  ]
}

const mul = (a, b) => {
  const r = new Array(9)
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) r[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j]
  return r
}

// keeps the matrix a clean rotation after thousands of frames
const orthonormalize = (m) => {
  let [a0, a1, a2] = [m[0], m[1], m[2]]
  let n = Math.hypot(a0, a1, a2)
  a0 /= n; a1 /= n; a2 /= n
  let [b0, b1, b2] = [m[3], m[4], m[5]]
  const d = a0 * b0 + a1 * b1 + a2 * b2
  b0 -= d * a0; b1 -= d * a1; b2 -= d * a2
  n = Math.hypot(b0, b1, b2)
  b0 /= n; b1 /= n; b2 /= n
  return [a0, a1, a2, b0, b1, b2, a1 * b2 - a2 * b1, a2 * b0 - a0 * b2, a0 * b1 - a1 * b0]
}

const apply = (m, p) => [
  m[0] * p[0] + m[1] * p[1] + m[2] * p[2],
  m[3] * p[0] + m[4] * p[1] + m[5] * p[2],
  m[6] * p[0] + m[7] * p[1] + m[8] * p[2],
]

/* ---------------- ball designs: 3D curves on a unit sphere ---------------- */

const curve = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn((i / n) * TAU))

const cricketBall = (() => {
  const off = 0.085
  const lines = [-off, off].map((phi) =>
    curve(72, (t) => [Math.sin(phi), Math.cos(phi) * Math.cos(t), Math.cos(phi) * Math.sin(t)]),
  )
  const ticks = []
  for (let k = 0; k < 36; k++) {
    const t = (k / 36) * TAU
    for (const sgn of [-1, 1]) {
      const p = (phi) => [Math.sin(phi), Math.cos(phi) * Math.cos(t), Math.cos(phi) * Math.sin(t)]
      ticks.push([p(sgn * off), p(sgn * 0.2)])
    }
  }
  return {
    light: '#FF7A7A', mid: '#C8102E', dark: '#4E050D',
    line: '#FBE6C2', lw: 1.1, lines, ticks,
    trail: [229, 9, 20], glow: 'rgba(229,9,20,0.55)',
  }
})()

const tennisBall = (() => {
  // classic tennis-seam curve; |p| = 1 exactly when a + b = 1
  const a = 0.7
  const b = 0.3
  const c = 2 * Math.sqrt(a * b)
  return {
    light: '#F6FF9A', mid: '#CFE02A', dark: '#5E6A06',
    line: '#FFFFFF', lw: 1.7,
    lines: [curve(140, (t) => [a * Math.cos(t) + b * Math.cos(3 * t), a * Math.sin(t) - b * Math.sin(3 * t), c * Math.sin(2 * t)])],
    ticks: [],
    trail: [207, 224, 42], glow: 'rgba(207,224,42,0.5)',
  }
})()

const basketBall = (() => {
  const k = 0.56
  const rr = Math.sqrt(1 - k * k)
  return {
    light: '#FFB874', mid: '#E8701A', dark: '#6A2A04',
    line: '#2B1205', lw: 1.25,
    lines: [
      curve(72, (t) => [Math.cos(t), Math.sin(t), 0]),
      curve(72, (t) => [0, Math.cos(t), Math.sin(t)]),
      curve(72, (t) => [k, rr * Math.cos(t), rr * Math.sin(t)]),
      curve(72, (t) => [-k, rr * Math.cos(t), rr * Math.sin(t)]),
    ],
    ticks: [],
    trail: [232, 112, 26], glow: 'rgba(232,112,26,0.5)',
  }
})()

const BALLS = { cricket: cricketBall, tennis: tennisBall, basketball: basketBall }

/* ---------------- drawing ---------------- */

const strokeOnSphere = (ctx, R, r, a, b, lw) => {
  const p = apply(R, a)
  const q = apply(R, b)
  const z = (p[2] + q[2]) / 2
  if (z <= 0) return // back of the ball
  ctx.globalAlpha = Math.min(1, z * 2.4) // fades toward the edge, like a real seam turning away
  ctx.lineWidth = lw * (0.4 + 0.6 * z) // foreshortening
  ctx.beginPath()
  ctx.moveTo(p[0] * r, p[1] * r)
  ctx.lineTo(q[0] * r, q[1] * r)
  ctx.stroke()
}

const drawBall = (ctx, def, R, r) => {
  // glow + base sphere with a fixed key light (top-left)
  ctx.shadowColor = def.glow
  ctx.shadowBlur = 14
  const base = ctx.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.08, 0, 0, r)
  base.addColorStop(0, def.light)
  base.addColorStop(0.45, def.mid)
  base.addColorStop(1, def.dark)
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, TAU)
  ctx.fillStyle = base
  ctx.fill()
  ctx.shadowBlur = 0

  ctx.save()
  ctx.clip()

  // seams — the actual 3D part
  ctx.strokeStyle = def.line
  ctx.lineCap = 'round'
  for (const line of def.lines) for (let i = 0; i < line.length - 1; i++) strokeOnSphere(ctx, R, r, line[i], line[i + 1], def.lw)
  for (const [a, b] of def.ticks) strokeOnSphere(ctx, R, r, a, b, def.lw * 0.6)
  ctx.globalAlpha = 1

  // limb darkening — sells the curvature
  const limb = ctx.createRadialGradient(0, 0, r * 0.45, 0, 0, r)
  limb.addColorStop(0, 'rgba(0,0,0,0)')
  limb.addColorStop(1, 'rgba(0,0,0,0.42)')
  ctx.fillStyle = limb
  ctx.fillRect(-r, -r, r * 2, r * 2)

  // specular highlight stays put while the ball rolls under it
  const spec = ctx.createRadialGradient(-r * 0.38, -r * 0.42, 0, -r * 0.38, -r * 0.42, r * 0.55)
  spec.addColorStop(0, 'rgba(255,255,255,0.8)')
  spec.addColorStop(0.35, 'rgba(255,255,255,0.22)')
  spec.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = spec
  ctx.fillRect(-r, -r, r * 2, r * 2)

  ctx.restore()

  // rim light (lower-right) + chalk outline for contrast on any background
  ctx.beginPath()
  ctx.arc(0, 0, r - 0.9, Math.PI * 0.05, Math.PI * 0.6)
  ctx.strokeStyle = 'rgba(255,255,255,0.35)'
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, r + 0.6, 0, TAU)
  ctx.strokeStyle = 'rgba(251,247,242,0.75)'
  ctx.lineWidth = 1.1
  ctx.stroke()
}

const drawBrackets = (ctx, x, y, w, h, alpha, glow) => {
  const len = Math.max(6, Math.min(14, w / 3, h / 3))
  ctx.save()
  ctx.globalAlpha = alpha

  // faint lock-on fill
  ctx.fillStyle = 'rgba(229,9,20,0.06)'
  ctx.beginPath()
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, 10)
  else ctx.rect(x, y, w, h)
  ctx.fill()

  ctx.lineCap = 'round'
  ctx.lineWidth = 2
  ctx.shadowColor = glow
  ctx.shadowBlur = 10
  const corners = [
    [x, y, 1, 1, '#FBF7F2'],
    [x + w, y, -1, 1, '#D4AF37'],
    [x, y + h, 1, -1, '#D4AF37'],
    [x + w, y + h, -1, -1, '#E50914'],
  ]
  for (const [cx, cy, dx, dy, col] of corners) {
    ctx.strokeStyle = col
    ctx.beginPath()
    ctx.moveTo(cx, cy + dy * len)
    ctx.lineTo(cx, cy)
    ctx.lineTo(cx + dx * len, cy)
    ctx.stroke()
  }
  ctx.restore()
}

const drawRing = (ctx, x, y, radius, alpha, spin) => {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.translate(x, y)
  ctx.rotate(spin)
  ctx.shadowColor = 'rgba(229,9,20,0.7)'
  ctx.shadowBlur = 12
  ctx.strokeStyle = '#FBF7F2'
  ctx.lineWidth = 1.6
  // broken ring: four arcs with gaps, like a scope
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.arc(0, 0, radius, i * (TAU / 4) + 0.22, (i + 1) * (TAU / 4) - 0.22)
    ctx.stroke()
  }
  ctx.strokeStyle = '#D4AF37'
  for (let i = 0; i < 4; i++) {
    const a = i * (TAU / 4)
    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * (radius + 3), Math.sin(a) * (radius + 3))
    ctx.lineTo(Math.cos(a) * (radius + 8), Math.sin(a) * (radius + 8))
    ctx.stroke()
  }
  ctx.restore()
}

/* ---------------- component ---------------- */

export default function CustomCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // hide the system cursor everywhere except text fields
    const style = document.createElement('style')
    style.setAttribute('data-sports-cursor', '')
    style.textContent = `
      html.has-sports-cursor, html.has-sports-cursor * { cursor: none !important; }
      ${TEXT_TARGETS.split(', ').map((s) => `html.has-sports-cursor ${s}`).join(', ')} { cursor: text !important; }
    `
    document.head.appendChild(style)
    document.documentElement.classList.add('has-sports-cursor')

    /* ---- state ---- */
    const mouse = { x: -200, y: -200 }
    const pos = { x: -200, y: -200 }
    const prev = { x: -200, y: -200 }
    let R = rotAxis(0.6, 0.8, 0, 0.9) // start at a nice 3/4 angle
    let frame = 0
    let visible = false
    let alpha = 0
    let overText = false
    let hoverEl = null
    let pressed = false
    let squash = 0
    let height = 0 // how high the ball floats above the page
    let vHeight = 0
    let ballType = 'cricket'
    let nextType = 'cricket'
    let swap = 1 // shrinks to 0 while switching sports
    let ringR = 8
    let ringA = 0
    let ringSpin = 0
    const lock = { x: 0, y: 0, w: 0, h: 0, a: 0 }
    const trail = []
    const bursts = []
    const dust = []
    let raf
    let last = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const readTarget = (t) => {
      if (!t || !t.closest) {
        hoverEl = null
        overText = false
        return
      }
      hoverEl = t.closest(HOVER_TARGETS)
      overText = !!t.closest(TEXT_TARGETS)
      const host = t.closest('[data-cursor-ball]')
      const want = host ? host.getAttribute('data-cursor-ball') : 'cricket'
      nextType = BALLS[want] ? want : 'cricket'
    }

    /* ---- events ---- */
    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!visible) {
        pos.x = prev.x = mouse.x
        pos.y = prev.y = mouse.y
        visible = true
      }
      readTarget(e.target)
    }
    // content moves under a still mouse while scrolling
    const onScroll = () => {
      if (visible) readTarget(document.elementFromPoint(mouse.x, mouse.y))
    }
    const onDown = () => {
      pressed = true
      squash = 1
      if (!reduce) {
        bursts.push({ x: pos.x, y: pos.y - height, t: 0 })
        const [r, g, b] = BALLS[ballType].trail
        for (let i = 0; i < 12; i++) {
          const a = Math.random() * TAU
          const sp = 1.5 + Math.random() * 3
          dust.push({
            x: pos.x, y: pos.y - height,
            vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1,
            life: 1, size: 1 + Math.random() * 1.8,
            color: i % 3 === 0 ? `${r},${g},${b}` : '251,247,242',
          })
        }
      }
    }
    const onUp = () => {
      pressed = false
      if (!reduce) vHeight = 5.5 // pop up, then bounce on the turf
    }
    const onLeave = () => {
      visible = false
      trail.length = 0
    }
    const onOut = (e) => {
      if (!e.relatedTarget) onLeave() // left the window or entered an iframe
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('blur', onLeave)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseout', onOut)

    /* ---- frame loop ---- */
    const tick = (now) => {
      const dt = Math.min(2.5, (now - last) / 16.67) // frame-rate independent
      last = now
      const ease = (k) => 1 - Math.pow(1 - k, dt)
      frame++

      // hover target: brackets for buttons/links, ring for big things like cards
      let rect = null
      if (hoverEl && hoverEl.isConnected) {
        const r = hoverEl.getBoundingClientRect()
        if (r.width > 0 && r.width <= LOCK_MAX_W && r.height <= LOCK_MAX_H) rect = r
      }
      const bigHover = !!hoverEl && !rect

      // follow with weight; small targets gently pull the ball toward them
      let tx = mouse.x
      let ty = mouse.y
      if (rect && !reduce) {
        tx += (rect.left + rect.width / 2 - mouse.x) * 0.18
        ty += (rect.top + rect.height / 2 - mouse.y) * 0.18
      }
      const k = reduce ? 1 : ease(0.3)
      pos.x += (tx - pos.x) * k
      pos.y += (ty - pos.y) * k

      const vx = pos.x - prev.x
      const vy = pos.y - prev.y
      prev.x = pos.x
      prev.y = pos.y
      const speed = Math.hypot(vx, vy)

      // ---- rolling: axis ⟂ to motion, angle = distance / radius ----
      if (!reduce) {
        if (speed > 0.05) {
          R = mul(rotAxis(-vy / speed, vx / speed, 0, speed / RADIUS), R)
        } else {
          R = mul(rotAxis(0.28, 0.93, 0.24, 0.012 * dt), R) // slow idle spin keeps it alive
        }
        if (frame % 60 === 0) R = orthonormalize(R)
      }

      // ---- float height: hovering lifts the ball; clicks make it bounce ----
      const floatTarget = hoverEl && !reduce ? 7 + Math.sin(now / 260) * 1.5 : 0
      if (!reduce) {
        if (vHeight !== 0 || height > floatTarget + 0.5) {
          vHeight -= 0.75 * dt // gravity
          height += vHeight * dt
          if (height <= floatTarget) {
            height = floatTarget
            if (Math.abs(vHeight) > 1.4) {
              squash = Math.max(squash, Math.min(1, Math.abs(vHeight) / 7))
              vHeight = -vHeight * 0.42 // bounce
            } else vHeight = 0
          }
        } else {
          height += (floatTarget - height) * ease(0.18)
        }
      }
      squash *= Math.pow(0.82, dt)

      // ---- sport switching: shrink → swap → grow, with a spin kick ----
      if (nextType !== ballType) {
        swap -= 0.16 * dt
        if (swap <= 0) {
          swap = 0
          ballType = nextType
          R = mul(rotAxis(0, 1, 0, 1.6), R)
        }
      } else if (swap < 1) swap = Math.min(1, swap + 0.12 * dt)

      const show = visible && !overText
      alpha += ((show ? 1 : 0) - alpha) * ease(0.25)

      ctx.clearRect(0, 0, innerWidth, innerHeight)
      if (alpha < 0.01) {
        raf = requestAnimationFrame(tick)
        return
      }

      const def = BALLS[ballType]
      const [cr, cg, cb] = def.trail
      const bx = pos.x
      const by = pos.y - height

      // ---- lock-on brackets (fly from target to target) ----
      if (rect) {
        const pad = pressed ? 2 : 7
        const target = { x: rect.left - pad, y: rect.top - pad, w: rect.width + pad * 2, h: rect.height + pad * 2 }
        if (lock.a < 0.05) {
          // first lock: start slightly larger so it "closes in"
          Object.assign(lock, { x: target.x - 14, y: target.y - 14, w: target.w + 28, h: target.h + 28 })
        }
        const lk = reduce ? 1 : ease(0.28)
        lock.x += (target.x - lock.x) * lk
        lock.y += (target.y - lock.y) * lk
        lock.w += (target.w - lock.w) * lk
        lock.h += (target.h - lock.h) * lk
        lock.a += (1 - lock.a) * ease(0.25)
      } else {
        lock.a += (0 - lock.a) * ease(0.3)
      }
      if (lock.a > 0.02) drawBrackets(ctx, lock.x, lock.y, lock.w, lock.h, lock.a * alpha, `rgba(${cr},${cg},${cb},0.8)`)

      // ---- scope ring for big hover targets (e.g. whole cards) ----
      ringA += ((bigHover ? 1 : 0) - ringA) * ease(0.22)
      ringR += ((bigHover ? (pressed ? 17 : 22) : 8) - ringR) * ease(0.22)
      if (!reduce) ringSpin += 0.015 * dt
      if (ringA > 0.02) drawRing(ctx, bx, by, ringR, ringA * alpha, ringSpin)

      // ---- flight trail ----
      if (!reduce && show && speed > 1.2) trail.push({ x: bx, y: by, life: 1 })
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].life -= 0.075 * dt
        if (trail[i].life <= 0) trail.splice(i, 1)
      }
      if (trail.length > 26) trail.splice(0, trail.length - 26)
      ctx.lineCap = 'round'
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1]
        const b = trail[i]
        const f = i / trail.length
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${0.5 * f * b.life * alpha})`
        ctx.lineWidth = Math.max(1, RADIUS * 1.3 * f * b.life)
        ctx.stroke()
      }

      // ---- ground shadow: smaller and softer the higher the ball floats ----
      const lift = Math.min(1, height / 30)
      const shadow = ctx.createRadialGradient(pos.x + 2, pos.y + RADIUS * 0.9, 0, pos.x + 2, pos.y + RADIUS * 0.9, RADIUS * (1.1 - lift * 0.3))
      shadow.addColorStop(0, `rgba(0,0,0,${0.32 * (1 - lift * 0.6) * alpha})`)
      shadow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.save()
      ctx.translate(pos.x + 2, pos.y + RADIUS * 0.9)
      ctx.scale(1, 0.38)
      ctx.translate(-(pos.x + 2), -(pos.y + RADIUS * 0.9))
      ctx.fillStyle = shadow
      ctx.beginPath()
      ctx.arc(pos.x + 2, pos.y + RADIUS * 0.9, RADIUS * 1.2, 0, TAU)
      ctx.fill()
      ctx.restore()

      // ---- the ball ----
      const size = RADIUS * (hoverEl ? 0.78 : 1) * (pressed ? 0.9 : 1) * (0.25 + 0.75 * swap)
      const stretch = reduce ? 0 : Math.min(speed / 45, 0.22)
      const heading = Math.atan2(vy, vx)
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(bx, by)
      // motion stretch along the direction of travel
      ctx.rotate(heading)
      ctx.scale(1 + stretch, 1 - stretch * 0.55)
      ctx.rotate(-heading)
      // impact squash (flattens vertically, like landing on turf)
      ctx.scale(1 + squash * 0.32, 1 - squash * 0.24)
      drawBall(ctx, def, R, size)
      ctx.restore()

      // ---- click impact ring + speed ticks ----
      for (let i = bursts.length - 1; i >= 0; i--) {
        const p = bursts[i]
        p.t += 0.05 * dt
        if (p.t >= 1) {
          bursts.splice(i, 1)
          continue
        }
        const r = 10 + p.t * 36
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, TAU)
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${0.7 * (1 - p.t) * alpha})`
        ctx.lineWidth = 2.5 * (1 - p.t) + 0.5
        ctx.stroke()
        for (let j = 0; j < 8; j++) {
          const th = (j / 8) * TAU + 0.2
          ctx.beginPath()
          ctx.moveTo(p.x + Math.cos(th) * (r + 3), p.y + Math.sin(th) * (r + 3))
          ctx.lineTo(p.x + Math.cos(th) * (r + 10), p.y + Math.sin(th) * (r + 10))
          ctx.strokeStyle = `rgba(212,175,55,${0.65 * (1 - p.t) * alpha})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      }

      // ---- turf/chalk dust from clicks ----
      for (let i = dust.length - 1; i >= 0; i--) {
        const d = dust[i]
        d.x += d.vx * dt
        d.y += d.vy * dt
        d.vy += 0.12 * dt
        d.vx *= Math.pow(0.95, dt)
        d.life -= 0.03 * dt
        if (d.life <= 0) {
          dust.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size * d.life, 0, TAU)
        ctx.fillStyle = `rgba(${d.color},${d.life * alpha})`
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll, { capture: true })
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('blur', onLeave)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseout', onOut)
      document.documentElement.classList.remove('has-sports-cursor')
      style.remove()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 2147483000 }}
    />
  )
}