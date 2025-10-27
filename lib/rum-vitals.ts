import type { NextWebVitalsMetric } from 'next/app'

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (typeof window === 'undefined') return

  const payload = {
    id: metric.id,
    name: metric.name,
    label: metric.label,
    value: Math.round(metric.value * 100) / 100,
  }

  if (process.env.NODE_ENV === 'development') {
    console.info('[web-vitals]', payload)
  } else if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/rum', JSON.stringify(payload))
  }
}
