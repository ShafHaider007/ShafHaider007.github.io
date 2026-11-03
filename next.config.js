/** @type {import('next').NextConfig} */

// GitHub Pages serves the site from /<repo>; the deploy workflow passes that in.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

module.exports = {
  output: 'export',
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
}
