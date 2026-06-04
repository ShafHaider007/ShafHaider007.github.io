export type Project = {
  slug: string
  title: string
  category: string
  blurb: string
  summary: string
  results: string[]
  tech: string[]
  problem: string
  approach: string
  outcome: string
  metrics: { label: string; value: string }[]
  gallery: { id: string; title: string; description: string }[]
}

export const projects: Project[] = [
  {
    slug: 'sentinel2-ard-pipeline',
    title: 'Sentinel-2 Analysis-Ready Data Pipeline',
    category: 'Data Pipeline',
    blurb:
      'An automated ETL pipeline that turns raw Sentinel-2 scenes into cloud-optimised, analysis-ready data — orchestrated, tested, and reproducible.',
    summary:
      'Designed and built a containerised pipeline that ingests Sentinel-2 imagery, applies cloud masking and reprojection, and publishes cloud-optimised GeoTIFFs and STAC metadata for downstream science teams.',
    results: ['Analysis-ready data in hours, not days', 'Fully reproducible, scheduled runs'],
    tech: ['Python', 'Rasterio', 'GDAL', 'Airflow', 'Docker', 'GCP'],
    problem:
      'Science teams were manually downloading and pre-processing satellite scenes — slow, inconsistent, and impossible to reproduce or audit.',
    approach:
      'Built an orchestrated ETL pipeline in Airflow that ingests scenes from open archives, runs cloud masking and reprojection with Rasterio and GDAL, and writes cloud-optimised GeoTIFFs plus STAC metadata to object storage — all containerised with Docker and deployed on GCP.',
    outcome:
      'Delivered a hands-off, scheduled pipeline producing analysis-ready data with consistent QA, freeing scientists to focus on analysis instead of data wrangling.',
    metrics: [
      { label: 'Processing Time', value: '-80%' },
      { label: 'Scenes / Day', value: '500+' },
      { label: 'Reproducible', value: '100%' },
    ],
    gallery: [
      { id: 'ingest', title: 'Scene Ingestion', description: 'Automated discovery and download of Sentinel-2 tiles from open archives.' },
      { id: 'process', title: 'Cloud Masking & Reprojection', description: 'Per-scene cloud masking and reprojection with Rasterio and GDAL.' },
      { id: 'publish', title: 'Analysis-Ready Output', description: 'Cloud-optimised GeoTIFFs and STAC metadata published to object storage.' },
    ],
  },
  {
    slug: 'biodiversity-change-detection',
    title: 'Biodiversity & Land-Cover Change Detection',
    category: 'Remote Sensing Science',
    blurb:
      'Multi-year remote-sensing analysis quantifying habitat and land-cover change across a portfolio of monitored sites.',
    summary:
      'Used multi-temporal satellite imagery to classify land cover and detect habitat change across a portfolio of sites, producing indicators and a scientific report to inform biodiversity assessments.',
    results: ['Multi-year change indicators', 'Reproducible classification workflow'],
    tech: ['Google Earth Engine', 'Python', 'R', 'GeoPandas', 'QGIS'],
    problem:
      'Assessing biodiversity and land-cover change across many sites by hand was inconsistent and could not scale to a growing portfolio.',
    approach:
      'Built a Google Earth Engine workflow to assemble cloud-free composites, ran supervised land-cover classification, and computed change metrics and spectral indices; analysed and validated results in Python and R, with maps prepared in QGIS.',
    outcome:
      'Produced consistent, reproducible change indicators and a scientific report that supported biodiversity and earth-systems assessments across the site portfolio.',
    metrics: [
      { label: 'Sites Assessed', value: '40+' },
      { label: 'Time Span', value: '8 yrs' },
      { label: 'Land Classes', value: '12' },
    ],
    gallery: [
      { id: 'composite', title: 'Cloud-Free Composites', description: 'Annual median composites built from multi-temporal satellite imagery.' },
      { id: 'classify', title: 'Land-Cover Classification', description: 'Supervised classification into habitat and land-cover classes.' },
      { id: 'change', title: 'Change Detection', description: 'Pixel-level change metrics highlighting habitat gain and loss over time.' },
    ],
  },
  {
    slug: 'postgis-spatial-api',
    title: 'PostGIS Spatial Database & Geospatial API',
    category: 'Spatial Database & API',
    blurb:
      'A clean PostGIS data model and documented FastAPI service serving vector and tile endpoints to a web mapping front end.',
    summary:
      'Modelled a PostGIS spatial database for raster and vector products and built a documented FastAPI service exposing vector features and tiles, tuned with web developers for fast, secure web-map access.',
    results: ['Sub-second spatial queries', 'Documented, versioned API'],
    tech: ['PostGIS', 'PostgreSQL', 'GeoPandas', 'FastAPI', 'Docker'],
    problem:
      'Geospatial data lived in scattered files with no consistent schema, making it slow and risky to serve to web and analytics applications.',
    approach:
      'Designed a normalised PostGIS schema with validated geometries and spatial indexes, wrote ETL to load and clean vector data with GeoPandas, and built a FastAPI service exposing documented vector and tile endpoints — schemas optimised together with web developers.',
    outcome:
      'Delivered a reliable spatial backend with sub-second queries and a documented API, giving the web team a single trustworthy source for map data.',
    metrics: [
      { label: 'Query Latency', value: '<1s' },
      { label: 'API Endpoints', value: '20+' },
      { label: 'Uptime', value: '99.9%' },
    ],
    gallery: [
      { id: 'schema', title: 'Spatial Data Model', description: 'Normalised PostGIS schema with validated geometries and spatial indexes.' },
      { id: 'etl', title: 'Load & Clean', description: 'GeoPandas ETL for loading, validating, and converting vector datasets.' },
      { id: 'api', title: 'Geospatial API', description: 'Documented FastAPI service serving vector features and tiles to the web map.' },
    ],
  },
  {
    slug: 'insar-geotechnical-risk',
    title: 'InSAR Ground-Deformation Risk Screening',
    category: 'Geotechnical / Earth Systems',
    blurb:
      'Satellite radar (InSAR) analysis screening ground deformation and stability risk across a portfolio of assets.',
    summary:
      'Processed Sentinel-1 InSAR time series to measure millimetre-scale ground motion, flagging deformation hotspots to support geotechnical risk assessment of assets and sectors.',
    results: ['mm-scale deformation tracking', 'Portfolio-wide risk screening'],
    tech: ['Sentinel-1', 'Python', 'SNAP', 'PostGIS', 'QGIS'],
    problem:
      'Ground-stability risk across a large asset portfolio was hard to monitor without costly, sparse field surveys.',
    approach:
      'Built a workflow to process Sentinel-1 InSAR time series, derive line-of-sight displacement, and aggregate per-asset deformation rates into PostGIS for screening and reporting.',
    outcome:
      'Enabled portfolio-wide, remote screening of ground-deformation risk, prioritising sites for closer geotechnical investigation.',
    metrics: [
      { label: 'Sensitivity', value: '~mm/yr' },
      { label: 'Assets', value: '200+' },
      { label: 'Revisit', value: '6–12d' },
    ],
    gallery: [
      { id: 'stack', title: 'SAR Time Series', description: 'Co-registered Sentinel-1 stack covering the area of interest.' },
      { id: 'displacement', title: 'Displacement Map', description: 'Line-of-sight ground displacement derived from interferometric processing.' },
      { id: 'risk', title: 'Risk Screening', description: 'Per-asset deformation rates aggregated in PostGIS for prioritisation.' },
    ],
  },
]
