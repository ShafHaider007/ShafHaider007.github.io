/** @type {import('next').NextConfig} */
module.exports = {
  // IMPORTANT: do NOT set `output: 'export'`
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/about', destination: '/#experience', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
    ]
  },
}
