// Returns the colour you'd get from CSS `filter: brightness(f)` on a flat colour.
// Used by the 3D "thickness" stacks: a pre-darkened colour looks identical but avoids a
// filter on every layer (each filtered layer in a 3D scene is expensive to composite).
export const shade = (hex, f) => {
  let h = String(hex).replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const n = parseInt(h.slice(0, 6), 16)
  const ch = (v) => Math.max(0, Math.min(255, Math.round(v * f)))
  return `rgb(${ch((n >> 16) & 255)}, ${ch((n >> 8) & 255)}, ${ch(n & 255)})`
}

// Tailwind v4 `bg-red-900`, as hex, for stacks that used the class
export const RED_900 = '#82181a'
