// Prefix for files in /public, which next/link and next/image don't rewrite for basePath.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shafhaider007.github.io/v0-portfolio'

export function asset(path: string) {
  return `${basePath}${path}`
}
