import { ProjectGallery } from '@/components/ProjectGallery'

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif-display font-bold text-primary mb-6">
              Selected Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              A collection of geospatial platforms and digital cartography projects that bridge the gap between data and decision-making.
            </p>
          </div>

          <div className="hidden md:block w-32 h-px bg-border my-6" />
        </div>

        <ProjectGallery />
      </div>
    </section>
  )
}
