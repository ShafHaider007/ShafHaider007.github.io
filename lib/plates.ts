import type { StaticImageData } from 'next/image'
import skardu from '@/public/media/skardu.jpg'
import galiyat from '@/public/media/galiyat.jpg'
import galiyatNdvi from '@/public/media/galiyat_ndvi.jpg'
import cholistan from '@/public/media/cholistan.jpg'
import changamanga from '@/public/media/changamanga.jpg'
import punjab from '@/public/media/punjab.jpg'
import punjabNdvi from '@/public/media/punjab_ndvi.jpg'
import islamabad from '@/public/media/islamabad.jpg'
import islamabadNdvi from '@/public/media/islamabad_ndvi.jpg'
import lahore from '@/public/media/lahore.jpg'
import lagos from '@/public/media/lagos.jpg'

// Every plate is a Sentinel-2 L2A crop rendered from the AWS open-data archive.
// bounds are [west, south, east, north] in degrees.
export type Plate = {
  src: StaticImageData
  ndvi?: StaticImageData
  place: string
  region: string
  date: string
  scene: string
  bounds: [number, number, number, number]
}

export const plates = {
  skardu: {
    src: skardu,
    place: 'Indus River at Skardu',
    region: 'Gilgit-Baltistan',
    date: '13 Oct 2024',
    scene: 'S2A_43SEV_20241013_0_L2A',
    bounds: [75.4065, 35.2459, 75.6935, 35.3676],
  },
  galiyat: {
    src: galiyat,
    ndvi: galiyatNdvi,
    place: 'Galiyat hill forests',
    region: 'Khyber Pakhtunkhwa',
    date: '26 Oct 2024',
    scene: 'S2A_43SCT_20241026_0_L2A',
    bounds: [73.3239, 34.0195, 73.4761, 34.1005],
  },
  cholistan: {
    src: cholistan,
    place: 'Cholistan desert margin',
    region: 'Punjab',
    date: '5 Nov 2024',
    scene: 'S2A_42RYT_20241105_0_L2A',
    bounds: [71.7073, 29.0005, 71.8927, 29.0995],
  },
  changamanga: {
    src: changamanga,
    place: 'Changa Manga plantation forest',
    region: 'Punjab',
    date: '13 Oct 2024',
    scene: 'S2A_43RDQ_20241013_0_L2A',
    bounds: [73.9666, 31.044, 74.1034, 31.116],
  },
  punjab: {
    src: punjab,
    ndvi: punjabNdvi,
    place: 'Irrigated fields near Sahiwal',
    region: 'Punjab',
    date: '27 Mar 2025',
    scene: 'S2A_43RCQ_20250327_1_L2A',
    bounds: [73.0266, 30.7617, 73.1734, 30.8383],
  },
  islamabad: {
    src: islamabad,
    ndvi: islamabadNdvi,
    place: 'Islamabad and the Margalla foothills',
    region: 'Islamabad Capital Territory',
    date: '26 Oct 2024',
    scene: 'S2A_43SCT_20241026_0_L2A',
    bounds: [72.9834, 33.655, 73.1566, 33.745],
  },
  lahore: {
    src: lahore,
    place: 'Eastern Lahore and DHA',
    region: 'Punjab',
    date: '27 Mar 2025',
    scene: 'S2B_43RDQ_20250327_0_L2A',
    bounds: [74.3772, 31.443, 74.4828, 31.497],
  },
  lagos: {
    src: lagos,
    place: 'Lagos Lagoon',
    region: 'Lagos State, Nigeria',
    date: '20 Dec 2024',
    scene: 'S2A_31NEH_20241220_0_L2A',
    bounds: [3.3184, 6.4205, 3.4816, 6.5195],
  },
} satisfies Record<string, Plate>

export type PlateKey = keyof typeof plates

export function plateCentre(p: Plate) {
  const [w, s, e, n] = p.bounds
  return { lon: (w + e) / 2, lat: (s + n) / 2 }
}

export function plateWidthKm(p: Plate) {
  const [w, s, e, n] = p.bounds
  return (e - w) * 111.32 * Math.cos((((s + n) / 2) * Math.PI) / 180)
}

export function formatDeg(v: number, axis: 'lat' | 'lon') {
  const hemi = axis === 'lat' ? (v >= 0 ? 'N' : 'S') : v >= 0 ? 'E' : 'W'
  const a = Math.abs(v)
  const d = Math.floor(a)
  const m = Math.round((a - d) * 60)
  return m === 60 ? `${d + 1}°00′${hemi}` : `${d}°${String(m).padStart(2, '0')}′${hemi}`
}
