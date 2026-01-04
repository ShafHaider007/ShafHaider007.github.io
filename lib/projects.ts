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
    slug: 'lidar-feature-extraction',
    title: 'Automated LiDAR Feature Extraction',
    category: 'Computer Vision',
    blurb: 'A scalable pipeline for extracting building footprints and vegetation cover from airborne LiDAR point clouds.',
    summary: 'Developed a high-throughput processing pipeline to classify and vectorize urban features from raw point cloud data, enabling city planners to update basemaps automatically.',
    results: ['94% classification accuracy', 'Processed 500km² in <48 hours'],
    tech: ['Python', 'PDAL', 'PyTorch', 'PostGIS'],
    problem: 'Manual digitization of building footprints from aerial imagery was slow, error-prone, and couldn\'t keep up with rapid urban development.',
    approach: 'Implemented a PointNet++ deep learning model for semantic segmentation of point clouds, coupled with a custom voxelization and vectorization algorithm to generate GIS-ready polygons.',
    outcome: 'Reduced map update cycles from months to days, providing municipal authorities with near real-time data for zoning and infrastructure monitoring.',
    metrics: [
      { label: 'Area Processed', value: '500 km²' },
      { label: 'Accuracy', value: '94%' },
      { label: 'Speed', value: '10x Faster' }
    ],
    gallery: [
      { id: 'point-cloud', title: 'Raw Point Cloud', description: 'Original airborne LiDAR data centered on the central business district.' },
      { id: 'classification', title: 'Semantic Segmentation', description: 'Points classified into ground, vegetation, and buildings.' },
      { id: 'vector', title: 'Vector Output', description: 'Final building footprints extracted and simplified for GIS usage.' }
    ]
  },
  {
    slug: 'agri-supply-chain-opt',
    title: 'Agricultural Supply Chain Optimization',
    category: 'Network Analysis',
    blurb: 'Optimizing "first-mile" logistics for perishable crops by modeling road network accessibility.',
    summary: 'A spatial decision support system that identifies optimal locations for cold storage facilities based on harvest yields and road network conditions.',
    results: ['18% reduction in transport costs', 'Serving 12,000+ farmers'],
    tech: ['PostgreSQL', 'pgRouting', 'QGIS', 'FastAPI'],
    problem: 'Post-harvest losses were reaching 40% due to inefficient transport routes and lack of accessible cold storage in rural areas.',
    approach: 'Modeled the entire rural road network using pgRouting, integrating seasonal crop yield data to run multi-criteria location-allocation algorithms for storage siting.',
    outcome: 'Strategic facility placement reduced average travel time for farmers by 2 hours, significantly lowering spoilage rates and improving market access.',
    metrics: [
      { label: 'Cost Reduction', value: '18%' },
      { label: 'Nodes', value: '12k+' },
      { label: 'Spoilage', value: '-25%' }
    ],
    gallery: [
      { id: 'network', title: 'Road Network', description: 'Topologically corrected road graph including unpaved farm tracks.' },
      { id: 'isochrones', title: 'Accessibility Isochrones', description: 'Drive-time analysis showing service coverage of proposed facilities.' },
      { id: 'optimization', title: 'Site Selection', description: 'Final optimal locations maximizing coverage of high-yield clusters.' }
    ]
  },
  {
    slug: 'urban-heat-island-monitoring',
    title: 'Urban Heat Island Monitoring',
    category: 'Remote Sensing',
    blurb: 'Real-time dashboard processing thermal satellite imagery to identify micro-climate hotspots.',
    summary: 'An automated pipeline ingesting Landsat 8 and Sentinel-2 data to compute Land Surface Temperature (LST) and visualize heat islands in dense urban cores.',
    results: ['Daily thermal updates', '30m spatial resolution'],
    tech: ['Google Earth Engine', 'React', 'Mapbox GL JS', 'Docker'],
    problem: 'City officials lacked granular, temporal data to understand the impact of urbanization on local microclimates and verify cooling initiatives.',
    approach: 'Built a serverless pipeline on Google Earth Engine to retrieve, cloud-mask, and compute LST from thermal bands, serving tiles to a performant React/Mapbox dashboard.',
    outcome: 'Empowered urban planners to target tree-planting initiatives in the hottest neighborhoods, lowering peak summer temperatures by an estimated 2°C in pilot zones.',
    metrics: [
      { label: 'Update Freq', value: 'Daily' },
      { label: 'Resolution', value: '30m' },
      { label: 'Latency', value: '<2s' }
    ],
    gallery: [
      { id: 'thermal-raw', title: 'Thermal Band', description: 'Processed thermal infrared data from Landsat 8.' },
      { id: 'lst-map', title: 'LST Computation', description: 'Derived Land Surface Temperature map with urban heat island anomalies highlighted.' },
      { id: 'dashboard', title: 'Analytic Dashboard', description: 'Interactive web interface for temporal analysis of heat trends.' }
    ]
  }
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
