import { Code, Database, Globe, Layers, Map, Monitor } from 'lucide-react'

const skills = [
  {
    title: 'General',
    icon: Globe,
    items: [
      'GIS Developer',
      'Web App Developer',
      'Interactive Map Visualization',
      'Vehicle Routing Problems',
      'Algorithm Development',
      'Data Scraping',
      'AWS Services',
      'API Integration',
    ],
  },
  {
    title: 'Front End',
    icon: Monitor,
    items: ['JavaScript', 'Vue.js', 'Node.js', 'Angular', 'React', 'TypeScript'],
  },
  {
    title: 'Map Visualization',
    icon: Map,
    items: [
      'Mapbox',
      'Leaflet',
      'OSRM',
      'OpenLayers',
      'Google Maps API',
      'ArcGIS API',
      'Map Illustration',
    ],
  },
  {
    title: 'Back End',
    icon: Code,
    items: [
      'Python',
      'C#',
      'PHP',
      'Laravel',
      'CodeIgniter',
      'Google Maps Services',
      'OSRM',
      'Tileserver-GL',
      'Osmium',
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'GPS Data Storage', 'Spatial Databases'],
  },
  {
    title: 'Platform',
    icon: Layers,
    items: ['Web Development', 'Mobile Development', 'Cross-Platform GIS Solutions'],
  },
]

export function Expertise() {
  return (
    <section id="expertise" className="border-t py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 className="text-3xl font-semibold">Expertise</h2>
        <p className="mt-4 text-muted-foreground">
          Full-stack GIS development with expertise across mapping, web technologies, and spatial data systems.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.title} className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <skill.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{skill.title}</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
