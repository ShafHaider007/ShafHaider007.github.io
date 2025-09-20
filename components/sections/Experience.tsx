"use client";

import { Card } from '@/components/ui/Card'
import { Building, Calendar, MapPin, Globe, Users, Award, TrendingUp, Target, Zap } from 'lucide-react'
import SplitText from '@/components/SplitText'
import PixelTransition from '@/components/PixelTransition'
import GradualBlur from '@/components/GradualBlur'

export function Experience() {
  const experiences = [
    {
      company: "Institute of Geographical Information Systems (IGIS) - NUST",
      position: "Research Intern",
      duration: "July 15 - August 31, 2023",
      location: "NUST (H-12 Campus), Islamabad, Pakistan",
      description: "Worked on the project 'An Autonomous IoT Based Approach Toward Monitoring and Identifying Invasive Dengue/Zika Vectors Prevalence and Possible Dengue Outbreak Areas.'",
      achievements: [
        "Focused on web GIS and computer vision applications",
        "Received weekly training sessions on GeoServer and OpenCV",
        "Completed internship with demonstrated regularity and commitment",
        "Gained hands-on experience in IoT-based monitoring systems"
      ],
      technologies: ["GeoServer", "OpenCV", "IoT", "Computer Vision", "Web GIS"],
      icon: Building,
      color: "from-blue-600 to-blue-700"
    },
    {
      company: "Jugrafiya",
      position: "Team Lead",
      duration: "June 24 - August 2, 2024",
      location: "Islamabad, Pakistan",
      website: "www.jugrafiya.com",
      email: "muhammad.tayyab@jugrafiya.com",
      description: "Led a team of three in exploring technologies for rendering large spatial datasets and developing experimental applications.",
      achievements: [
        "Explored technologies for rendering large spatial datasets (point clouds, large GeoJSONs, raster datasets)",
        "Utilized VisGL suite tools (Deck.gl, Kepler.gl, Loader.gl)",
        "Developed experimental applications using React, presented to clients",
        "Created a routing application with geofencing to alert users in high-traffic and high-crime zones"
      ],
      technologies: ["React", "Deck.gl", "Kepler.gl", "Loader.gl", "Geofencing", "Routing"],
      icon: Globe,
      color: "from-emerald-600 to-emerald-700"
    }
  ]

  return (
    <section id="experience" className="relative py-20 px-4 bg-slate-900 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <SplitText
            text="Professional Experience"
            className="text-5xl font-bold text-white mb-6"
            splitType="chars"
            delay={0.2}
            duration={0.6}
            ease="power3.out"
            from={{ opacity: 0, y: 40, rotationX: 90 }}
            to={{ opacity: 1, y: 0, rotationX: 0 }}
            trigger="#experience"
          />
          <SplitText
            text="Internships and professional experiences that have shaped my expertise in GIS and web development"
            className="text-2xl text-slate-300 max-w-4xl mx-auto"
            splitType="words"
            delay={0.8}
            duration={0.5}
            ease="power2.out"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            trigger="#experience"
          />
        </div>

        {/* Interactive Experience Showcase */}
        <div className="mb-16">
          <div className="h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <PixelTransition
              firstContent={
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Building className="w-24 h-24 mx-auto mb-8" />
                    <h3 className="text-4xl font-bold mb-6">Research Intern</h3>
                    <p className="text-2xl opacity-90">IGIS - NUST</p>
                  </div>
                </div>
              }
              secondContent={
                <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-cyan-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Globe className="w-24 h-24 mx-auto mb-8" />
                    <h3 className="text-4xl font-bold mb-6">Team Lead</h3>
                    <p className="text-2xl opacity-90">Jugrafiya</p>
                  </div>
                </div>
              }
              gridSize={12}
              pixelColor='#ffffff'
              animationStepDuration={0.8}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-10 bg-slate-800/50 border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Company Info */}
                <div className="lg:w-1/3">
                  <div className="flex items-center mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-r ${exp.color} rounded-2xl flex items-center justify-center mr-6`}>
                      <exp.icon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                      <p className="text-blue-400 font-medium text-lg">{exp.position}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-slate-300">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span className="text-lg">{exp.duration}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span className="text-lg">{exp.location}</span>
                    </div>
                    {exp.website && (
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <a href={`https://${exp.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-lg">
                          {exp.website}
                        </a>
                      </div>
                    )}
                    {exp.email && (
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{exp.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Experience Details */}
                <div className="lg:w-2/3">
                  <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                    {exp.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-4 text-xl">Key Achievements:</h4>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start space-x-3">
                          <span className="text-blue-400 mt-2">•</span>
                          <span className="text-slate-300 text-lg">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-4 text-xl">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-3">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-4 py-2 bg-slate-700 text-slate-300 rounded-full text-sm font-medium hover:bg-slate-600 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Experience Summary */}
        <div className="mt-20">
          <Card className="p-12 bg-slate-800/50 border-slate-700 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-3xl font-bold text-white mb-12 text-center">Experience Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-400 mb-2">2</div>
                <div className="text-slate-300 text-lg">Internships Completed</div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">Team Lead</div>
                <div className="text-slate-300 text-lg">Leadership Experience</div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-purple-400 mb-2">10+</div>
                <div className="text-slate-300 text-lg">Technologies Mastered</div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-orange-400 mb-2">100%</div>
                <div className="text-slate-300 text-lg">Client Satisfaction</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Gradual Blur Effect */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="10rem"
        strength={3}
        divCount={8}
        curve="bezier"
        exponential={true}
        opacity={0.8}
      />
    </section>
  )
}
