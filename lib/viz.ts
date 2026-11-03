import { asset } from '@/lib/paths'

export const viz = (path: string) => asset(`/viz/${path}`)

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
/** Map t from [a,b] to [0,1], clamped. */
export const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a))
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export const fmt = (n: number, digits = 0) =>
  n.toLocaleString('en-GB', { minimumFractionDigits: digits, maximumFractionDigits: digits })
