"use client";

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Microscope, Brain, Cpu, Smartphone, Target, TrendingUp } from 'lucide-react'
import SplitText from '@/components/SplitText'
import PixelTransition from '@/components/PixelTransition'
import GradualBlur from '@/components/GradualBlur'

export function Research() {
  return (
    <section id="research" className="relative py-20 px-4 bg-slate-800 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <SplitText
            text="Research Work"
            className="text-5xl font-bold text-white mb-6"
            splitType="chars"
            delay={0.2}
            duration={0.6}
            ease="power3.out"
            from={{ opacity: 0, y: 40, scale: 0.8 }}
            to={{ opacity: 1, y: 0, scale: 1 }}
            trigger="#research"
          />
          <SplitText
            text="Final Year Design Project focusing on innovative AR applications for urban mobility analysis"
            className="text-2xl text-slate-300 max-w-4xl mx-auto"
            splitType="words"
            delay={0.8}
            duration={0.5}
            ease="power2.out"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            trigger="#research"
          />
        </div>

        {/* Interactive Research Showcase */}
        <div className="mb-16">
          <div className="h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <PixelTransition
              firstContent={
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Microscope className="w-24 h-24 mx-auto mb-8" />
                    <h3 className="text-4xl font-bold mb-6">AR Research</h3>
                    <p className="text-2xl opacity-90">Urban Mobility Analysis</p>
                  </div>
                </div>
              }
              secondContent={
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Brain className="w-24 h-24 mx-auto mb-8" />
                    <h3 className="text-4xl font-bold mb-6">Machine Learning</h3>
                    <p className="text-2xl opacity-90">Transport Mode Detection</p>
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

        <Card className="p-12 mb-12 bg-slate-700/50 border-slate-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Overview */}
            <div>
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-6">
                  <Microscope className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Augmented Reality Application</h3>
                  <p className="text-purple-400 font-medium text-lg">Final Year Design Project</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">Project Title</h4>
                  <p className="text-slate-300 text-lg">
                    "Augmented Reality Application Using Tangible Landscapes for Urban Mobility Mapping and Analysis"
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">Duration</h4>
                  <p className="text-slate-300 text-lg">June 15, 2024 – Present</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">Supervisor</h4>
                  <p className="text-slate-300 text-lg">Dr. Salman Atif, Associate Professor, IGIS, NUST</p>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-6">Project Description</h4>
              <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                Our project develops an augmented reality (AR) application with tangible landscapes for urban 
                mobility mapping. It integrates 3D models with AR layers to visualize mobility patterns. We use 
                temperature sensors and machine learning on ESP32 camera feeds to detect transport modes like 
                buses, cars, or walking.
              </p>
              
              <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                GRASS GIS is used for spatial analysis, offering innovative tools for urban planners and 
                policymakers to understand and improve urban mobility patterns.
              </p>
            </div>
          </div>
        </Card>

        {/* Technical Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 bg-slate-700/50 border-slate-600 hover:shadow-2xl transition-all duration-300">
            <h4 className="text-2xl font-bold text-white mb-6">Key Technologies</h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-white text-lg">Augmented Reality</h5>
                  <p className="text-slate-300">AR frameworks and 3D model integration</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-white text-lg">Machine Learning</h5>
                  <p className="text-slate-300">ESP32 camera feeds and transport mode detection</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-white text-lg">GRASS GIS</h5>
                  <p className="text-slate-300">Spatial analysis and urban planning tools</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-white text-lg">IoT Sensors</h5>
                  <p className="text-slate-300">Temperature sensors for environmental monitoring</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-slate-700/50 border-slate-600 hover:shadow-2xl transition-all duration-300">
            <h4 className="text-2xl font-bold text-white mb-6">Research Impact</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span className="text-blue-400 mt-2 text-xl">•</span>
                <p className="text-slate-300 text-lg">
                  <strong className="text-white">Innovation:</strong> Novel approach to urban mobility analysis using AR and tangible interfaces
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-blue-400 mt-2 text-xl">•</span>
                <p className="text-slate-300 text-lg">
                  <strong className="text-white">Practical Application:</strong> Tools for urban planners and policymakers
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-blue-400 mt-2 text-xl">•</span>
                <p className="text-slate-300 text-lg">
                  <strong className="text-white">Technology Integration:</strong> Combines AR, ML, IoT, and GIS technologies
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-blue-400 mt-2 text-xl">•</span>
                <p className="text-slate-300 text-lg">
                  <strong className="text-white">Real-time Analysis:</strong> Live monitoring and visualization of mobility patterns
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Research Timeline */}
        <Card className="p-12 bg-gradient-to-r from-slate-700/50 to-slate-600/50 border-slate-600 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Research Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📋</span>
              </div>
              <h4 className="font-semibold text-white text-xl mb-3">Phase 1</h4>
              <p className="text-slate-300 text-lg">Literature Review & Planning</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🔧</span>
              </div>
              <h4 className="font-semibold text-white text-xl mb-3">Phase 2</h4>
              <p className="text-slate-300 text-lg">Development & Implementation</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📊</span>
              </div>
              <h4 className="font-semibold text-white text-xl mb-3">Phase 3</h4>
              <p className="text-slate-300 text-lg">Testing & Documentation</p>
            </div>
          </div>
        </Card>
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
