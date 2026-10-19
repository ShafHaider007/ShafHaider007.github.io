import { profile } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="page flex flex-col gap-3 py-8 text-[13px] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p className="max-w-xl sm:text-right">
          Satellite plates contain modified Copernicus Sentinel data (2024–2025), rendered from the Sentinel-2 L2A open archive on AWS.
        </p>
      </div>
    </footer>
  )
}
