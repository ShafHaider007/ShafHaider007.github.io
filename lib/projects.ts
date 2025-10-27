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
    slug: 'shortest-route-intelligence',
    title: 'Shortest Route Intelligence',
    category: 'Routing toolkit',
    blurb: 'Turns raw street data into lightweight routing helpers for field crews.',
    summary:
      'Reusable Next.js mapping shells and automated OSM ingestion pipelines make it simple for field teams to dispatch updated routes.',
    results: ['Automates OSM ingestion', 'Exports clean GeoJSON routes'],
    tech: ['Python', 'NetworkX', 'PostGIS', 'Next.js'],
    problem:
      'Field teams needed to ingest ever-changing OSM data and build trustworthy routes without waiting on central analysts.',
    approach:
      'I built reproducible notebooks to clean networks, wired QA checks to flag topology breaks, and surfaced everything in a headless Next.js shell for planners.',
    outcome:
      'Crews export GeoJSON bundles within minutes, cutting manual prep work while keeping decision data versioned and auditable.',
    metrics: [
      { label: 'Cities mapped', value: '6' },
      { label: 'Route updates / week', value: '24' },
      { label: 'Data freshness SLA', value: '< 12h' },
    ],
    gallery: [
      {
        id: 'network-flows',
        title: 'Network flows dashboard',
        description: 'Deck.gl layers visualise congested segments while field teams preview alternative paths.',
      },
      {
        id: 'qa-suite',
        title: 'Automated QA snapshots',
        description: 'Notebook-driven QA surfaces geometry gaps and metadata drifts before handoff.',
      },
      {
        id: 'handoff',
        title: 'Route export workspace',
        description: 'GeoJSON packages and PDF dispatch sheets ship together for crews on limited bandwidth.',
      },
    ],
  },
  {
    slug: 'incident-reporting-atlas',
    title: 'Incident Reporting Atlas',
    category: 'Civic reporting',
    blurb: 'Maps citizen reports with clustering so responders can triage faster.',
    summary:
      'Clustering, moderation views, and priority queues help civic responders balance accuracy with speed across fast-moving incidents.',
    results: ['Live moderation views', 'Priority queues for planners'],
    tech: ['Django', 'Leaflet', 'PostgreSQL', 'TypeScript'],
    problem:
      'City teams juggled fragmented reports and could not spot hotspots without manually stitching spreadsheets.',
    approach:
      'Partnered with planners to define triage states, then implemented Leaflet dashboards with role-aware filters and analytics overlays.',
    outcome:
      'Moderators track incidents in real time while planners prioritise interventions based on data everyone trusts.',
    metrics: [
      { label: 'Incidents triaged', value: '1800+' },
      { label: 'Time saved / week', value: '18h' },
      { label: 'Moderation SLA', value: '< 2h' },
    ],
    gallery: [
      {
        id: 'moderation',
        title: 'Moderation overview',
        description: 'Clustered pins and filters steer moderators to urgent categories in seconds.',
      },
      {
        id: 'analytics',
        title: 'Analytics overlays',
        description: 'Trend charts and heatmaps highlight patterns for weekly planning sessions.',
      },
      {
        id: 'handoff',
        title: 'Planner workspace',
        description: 'Action lists sync with municipal workflows so field crews receive precise directives.',
      },
    ],
  },
]

export const explorations = [
  {
    title: 'Land cover intelligence',
    description: 'Deep learning workflows that classify Sentinel-2 imagery to monitor peri-urban expansion.',
    tech: 'PyTorch · Rasterio · FastAPI',
  },
  {
    title: 'Augmented reality for wayfinding',
    description: 'AR prototypes guiding commuters through multi-modal journeys using location anchors.',
    tech: 'Unity · AR Foundation',
  },
]
