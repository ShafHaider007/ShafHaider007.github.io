"use client";

import { Card } from '@/components/ui/Card'
import { Code, Globe, MapPin, Database, Brain, BarChart3, Zap, Target, Rocket } from 'lucide-react'
import SplitText from '@/components/SplitText'
import PixelTransition from '@/components/PixelTransition'
import GradualBlur from '@/components/GradualBlur'

export function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      color: "from-blue-600 to-blue-700",
      skills: ["C++", "C", "Python", "R", "JavaScript", "Rust"]
    },
    {
      title: "Web Technologies",
      icon: Globe,
      color: "from-emerald-600 to-emerald-700",
      skills: ["Django", "MERN Stack", "Next.js", "React", "Node.js", "Express"]
    },
    {
      title: "GIS & Mapping",
      icon: MapPin,
      color: "from-purple-600 to-purple-700",
      skills: ["ArcGIS", "QGIS", "GRASS", "GeoServer", "MapServer", "GEE"]
    },
    {
      title: "Mapping Libraries",
      icon: Database,
      color: "from-orange-600 to-orange-700",
      skills: ["Leaflet", "Mapbox", "Deck.gl", "OpenLayers", "Cesium", "Kepler.gl"]
    },
    {
      title: "Data & ML",
      icon: Brain,
      color: "from-pink-600 to-pink-700",
      skills: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "Jupyter Notebooks"]
    },
    {
      title: "Spatial Analysis",
      icon: BarChart3,
      color: "from-teal-600 to-teal-700",
      skills: ["Regression", "Clustering", "Deep Learning", "Computer Vision", "IoT"]
    }
  ]

  return (
    <section id="skills" className="relative py-20 px-4 bg-slate-900 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <SplitText
            text="Skills & Expertise"
            className="text-5xl font-bold text-white mb-6"
            splitType="chars"
            delay={0.2}
            duration={0.6}
            ease="power3.out"
            from={{ opacity: 0, y: 40, rotationY: 90 }}
            to={{ opacity: 1, y: 0, rotationY: 0 }}
            trigger="#skills"
          />
          <SplitText
            text="A comprehensive skill set spanning programming, GIS, web development, and machine learning"
            className="text-2xl text-slate-300 max-w-4xl mx-auto"
            splitType="words"
            delay={0.8}
            duration={0.5}
            ease="power2.out"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            trigger="#skills"
          />
        </div>

        {/* Interactive Skills Showcase */}
        <div className="mb-16">
          <div className="h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <PixelTransition
              firstContent={
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Code className="w-24 h-24 mx-auto mb-8" />
                    <h3 className="text-4xl font-bold mb-6">Programming Excellence</h3>
                    <p className="text-2xl opacity-90">C++, Python, JavaScript, Rust</p>
                  </div>
                </div>
              }
              secondContent={
                <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-cyan-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Globe className="w-24 h-24 mx-auto mb-8" />
                    <h3 className="text-4xl font-bold mb-6">GIS & Web Development</h3>
                    <p className="text-2xl opacity-90">ArcGIS, QGIS, React, Next.js</p>
                  </div>
                </div>
              }
              gridSize={15}
              pixelColor='#ffffff'
              animationStepDuration={0.9}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="p-8 bg-slate-800/50 border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
              
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-slate-700 text-slate-300 rounded-full text-sm font-medium hover:bg-slate-600 transition-colors hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Specialized Areas */}
        <div className="mt-20">
          <Card className="p-12 bg-slate-800/50 border-slate-700 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-3xl font-bold text-white mb-12 text-center">Specialized Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-white text-lg mb-2">Research & Development</h4>
                <p className="text-slate-300 text-sm">AR applications, tangible landscapes, urban mobility analysis</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Database className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-white text-lg mb-2">Spatial Data Processing</h4>
                <p className="text-slate-300 text-sm">Large datasets, point clouds, GeoJSON, raster processing</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-white text-lg mb-2">Web GIS Development</h4>
                <p className="text-slate-300 text-sm">Interactive maps, real-time data visualization, routing applications</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-white text-lg mb-2">Problem Solving</h4>
                <p className="text-slate-300 text-sm">Algorithm implementation, optimization, analytical thinking</p>
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
