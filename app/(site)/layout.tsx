import type { ReactNode } from 'react'
import { SiteShell } from '@/components/animations/SiteShell'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
