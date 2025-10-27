'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/Navigation'
import { TopProgress } from './TopProgress'

interface SiteShellProps {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TopProgress />
      <Navigation />
      <div className="relative min-h-screen bg-background text-foreground antialiased">
        {children}
      </div>
    </ThemeProvider>
  )
}
