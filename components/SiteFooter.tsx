import { profile } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="page flex flex-col gap-3 py-8 text-[13px] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p className="max-w-xl sm:text-right">
          Figures use open data: modified Copernicus Sentinel-2 data (2017–2025), Landsat 8 (USGS), ESA WorldCover, Hansen
          Global Forest Change, the Copernicus DEM and Overture Maps.
        </p>
      </div>
    </footer>
  )
}
