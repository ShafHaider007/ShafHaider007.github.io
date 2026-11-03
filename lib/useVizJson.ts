'use client'

import { useEffect, useState } from 'react'
import { viz } from '@/lib/viz'

const cache = new Map<string, Promise<unknown>>()

/**
 * Fetch a JSON file from /public/viz once per page load. Returns null while loading. If the request fails the error is
 * thrown during render, so the error boundary around each walk-through can show a message instead of empty figures.
 */
export function useVizJson<T>(path: string): T | null {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    let live = true
    const url = viz(path)
    if (!cache.has(url))
      cache.set(
        url,
        fetch(url).then((r) => {
          if (!r.ok) throw new Error(`${r.status} for ${url}`)
          return r.json()
        }),
      )
    cache
      .get(url)!
      .then((d) => live && setData(d as T))
      .catch((e: unknown) => {
        cache.delete(url)
        if (live) setError(e instanceof Error ? e : new Error(String(e)))
      })
    return () => {
      live = false
    }
  }, [path])
  if (error) throw error
  return data
}
