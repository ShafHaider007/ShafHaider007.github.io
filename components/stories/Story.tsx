'use client'

import dynamic from 'next/dynamic'
import { Component, type ReactNode } from 'react'

function Loading() {
  return (
    <div role="status" className="grid h-[60vh] place-items-center border border-line bg-plate px-6 text-center text-[15px] text-ink-2">
      Loading the walk-through figures…
    </div>
  )
}

// Each story is its own chunk, so a project page only loads its own figures.
const STORIES = {
  'forest-carbon-activity-data': dynamic(() => import('./JfrelStory').then((m) => m.JfrelStory), { loading: Loading }),
  'unccd-2026-national-reporting': dynamic(() => import('./UnccdStory').then((m) => m.UnccdStory), { loading: Loading }),
  'national-forest-monitoring-system': dynamic(() => import('./NfmsStory').then((m) => m.NfmsStory), { loading: Loading }),
  geofasal: dynamic(() => import('./GeoFasalStory').then((m) => m.GeoFasalStory), { loading: Loading }),
  'move-smart': dynamic(() => import('./MoveSmartStory').then((m) => m.MoveSmartStory), { loading: Loading }),
  'mottainai-recycling': dynamic(() => import('./MottainaiStory').then((m) => m.MottainaiStory), { loading: Loading }),
  'dha-property-webgis': dynamic(() => import('./DhaStory').then((m) => m.DhaStory), { loading: Loading }),
} as const

/** Shows a message instead of a broken walk-through if its data or code fails to load. */
class StoryBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div role="alert" className="border border-line bg-plate px-5 py-6 text-[15px] leading-relaxed text-ink-2">
        <p className="font-semibold text-ink">The walk-through figures could not be loaded.</p>
        <p className="mt-1">
          The project text above still describes the work. Reload the page to try again; if it keeps failing, the figure files may
          be blocked by your network.
        </p>
      </div>
    )
  }
}

export function Story({ slug }: { slug: string }) {
  const C = STORIES[slug as keyof typeof STORIES]
  return C ? (
    <StoryBoundary>
      <C />
    </StoryBoundary>
  ) : null
}
