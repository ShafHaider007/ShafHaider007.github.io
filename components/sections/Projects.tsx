import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Route, Shield, Satellite, ExternalLink, Github } from 'lucide-react'
import SplitText from '@/components/SplitText'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'
import GradualBlur from '@/components/GradualBlur'

export function Projects() {
  const projects = [
    {
      title: "Shortest Route Finder using Dijkstra's Algorithm",
      description: "Developed a shortest route finder using Dijkstra's Algorithm, integrating geospatial data. Automated vector file downloads, graph creation, and route calculation based on user provided latitudes and longitudes.",
      technologies: ["Python", "Dijkstra Algorithm", "Geospatial Data", "Graph Theory"],
      category: "Algorithm & GIS",
      icon: Route
    },
    {
      title: "Incident Reporting System with GIS",
      description: "Designed a platform for residents to report incidents and visualize clusters on a map, supporting data-driven community safety initiatives. Built with Django framework.",
      technologies: ["Django", "PostgreSQL", "Leaflet", "Geospatial Analysis"],
      category: "Web GIS Application",
      icon: Shield
    },
    {
      title: "Land Use and Land Cover Classification Using Deep Learning",
      description: "Implemented a CNN-based solution to classify Sentinel-2 imagery into land cover classes, achieving high accuracy with multispectral data.",
      technologies: ["Python", "PyTorch", "CNN", "Sentinel-2", "Remote Sensing"],
      category: "Machine Learning & Remote Sensing",
      icon: Satellite
    }
  ]

  return (
    <section id="projects" className="relative py-16 px-4 bg-slate-800 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <SplitText
            text="Semester Projects"
            className="text-4xl font-bold text-white mb-4"
            splitType="chars"
            delay={0.2}
            duration={0.6}
            ease="power3.out"
            from={{ opacity: 0, y: 40, scale: 0.8 }}
            to={{ opacity: 1, y: 0, scale: 1 }}
            trigger="#projects"
          />
          <SplitText
            text="Hands-on projects demonstrating practical application of geoinformatics concepts and technologies"
            className="text-xl text-slate-300 max-w-3xl mx-auto"
            splitType="words"
            delay={0.8}
            duration={0.5}
            ease="power2.out"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            trigger="#projects"
          />
        </div>

        {/* ScrollStack for Projects */}
        <div className="relative" style={{ height: '600px', overflow: 'hidden' }}>
          <ScrollStack
            useWindowScroll={true}
            itemDistance={80}
            itemScale={0.05}
            itemStackDistance={40}
            stackPosition="30%"
            scaleEndPosition="15%"
            baseScale={0.9}
            rotationAmount={2}
            blurAmount={0.5}
          >
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <ScrollStackItem key={index} itemClassName="bg-gradient-to-br from-slate-700/80 to-slate-600/80 border-slate-500/50">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-6">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 bg-slate-600/50 text-slate-300 rounded-full text-sm font-medium border border-slate-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="lg" className="border-slate-400 text-slate-300 hover:bg-slate-600 px-6">
                      <Github className="w-5 h-5 mr-2" />
                      Code
                    </Button>
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
          
          {/* Gradual Blur Effect */}
          <GradualBlur
            target="parent"
            position="bottom"
            height="8rem"
            strength={3}
            divCount={6}
            curve="bezier"
            exponential={true}
            opacity={0.8}
          />
        </div>

        {/* Project Statistics */}
        <div className="mt-16">
          <Card className="p-8 bg-gradient-to-r from-slate-700/50 to-slate-600/50 border-slate-600">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Project Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">3+</div>
                <div className="text-slate-300">Major Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">5+</div>
                <div className="text-slate-300">Technologies Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
                <div className="text-slate-300">Practical Application</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
