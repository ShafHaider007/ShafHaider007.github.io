'use client'

import dynamic from 'next/dynamic'

const loading = () => <div className="h-[70vh] animate-pulse border border-line bg-surface" />

// Each story is its own chunk, so a project page only loads its own visual.
const STORIES = {
  'forest-carbon-activity-data': dynamic(() => import('./JfrelStory').then((m) => m.JfrelStory), { loading }),
  'unccd-2026-national-reporting': dynamic(() => import('./UnccdStory').then((m) => m.UnccdStory), { loading }),
  'national-forest-monitoring-system': dynamic(() => import('./NfmsStory').then((m) => m.NfmsStory), { loading }),
  geofasal: dynamic(() => import('./GeoFasalStory').then((m) => m.GeoFasalStory), { loading }),
  'move-smart': dynamic(() => import('./MoveSmartStory').then((m) => m.MoveSmartStory), { loading }),
  'mottainai-recycling': dynamic(() => import('./MottainaiStory').then((m) => m.MottainaiStory), { loading }),
  'dha-property-webgis': dynamic(() => import('./DhaStory').then((m) => m.DhaStory), { loading }),
} as const

export function Story({ slug }: { slug: string }) {
  const C = STORIES[slug as keyof typeof STORIES]
  return C ? <C /> : null
}
