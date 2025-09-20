"use client";

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { MapPin, Mail, GraduationCap, Code, Globe, Database, Brain, ArrowDown } from 'lucide-react'
import SplitText from '@/components/SplitText'
import DarkVeil from '@/components/DarkVeil'
import PixelTransition from '@/components/PixelTransition'
import TargetCursor from '@/components/TargetCursor'
import GradualBlur from '@/components/GradualBlur'

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil 
          hueShift={120}
          noiseIntensity={0.02}
          scanlineIntensity={0.1}
          speed={0.3}
          scanlineFrequency={0.5}
          warpAmount={0.1}
        />
      </div>
      
      {/* Target Cursor */}
      <TargetCursor spinDuration={3} hideDefaultCursor={false} />
      
      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <SplitText
                text="Muhammad Shaf Haider"
                className="text-6xl lg:text-7xl font-bold text-white leading-tight"
                splitType="words"
                delay={0.2}
                duration={0.8}
                ease="power3.out"
                from={{ opacity: 0, y: 60, rotationX: 90 }}
                to={{ opacity: 1, y: 0, rotationX: 0 }}
                trigger="#home"
              />
              <SplitText
                text="Geoinformatics Engineering Student & GIS Developer"
                className="text-2xl text-slate-300"
                splitType="words"
                delay={1.0}
                duration={0.6}
                ease="power2.out"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                trigger="#home"
              />
              <SplitText
                text="Passionate about spatial analysis, web GIS, and machine learning applications in geospatial domains."
                className="text-xl text-slate-400"
                splitType="words"
                delay={1.4}
                duration={0.5}
                ease="power2.out"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                trigger="#home"
              />
            </div>

            <div className="flex flex-wrap gap-6">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                View My Work
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-300 hover:bg-slate-700 px-8 py-4 text-lg">
                Download CV
              </Button>
            </div>

            {/* Contact Info */}
            <Card className="p-8 bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  <span className="text-slate-300 text-lg">Islamabad, Pakistan</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <span className="text-slate-300 text-lg">shaf.shafheidar@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                  <span className="text-slate-300 text-lg">NUST - Expected Graduation: May 2025</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Interactive Showcase */}
          <div className="relative">
            {/* Pixel Transition Showcase */}
            <div className="h-[500px] mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <PixelTransition
                firstContent={
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Code className="w-20 h-20 mx-auto mb-6" />
                      <h3 className="text-3xl font-bold mb-4">Programming</h3>
                      <p className="text-xl opacity-90">C++, Python, JavaScript, Rust</p>
                    </div>
                  </div>
                }
                secondContent={
                  <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-blue-700 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Globe className="w-20 h-20 mx-auto mb-6" />
                      <h3 className="text-3xl font-bold mb-4">GIS & Mapping</h3>
                      <p className="text-xl opacity-90">ArcGIS, QGIS, Mapbox, Deck.gl</p>
                    </div>
                  </div>
                }
                gridSize={12}
                pixelColor='#ffffff'
                animationStepDuration={0.8}
                className="w-full h-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Skills Cards */}
              <Card className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white border-purple-500/20 hover:scale-105 transition-transform">
                <div className="flex items-center mb-3">
                  <Brain className="w-6 h-6 mr-3" />
                  <h3 className="font-semibold text-lg">Machine Learning</h3>
                </div>
                <p className="text-sm opacity-90">PyTorch, TensorFlow, OpenCV</p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-orange-600 to-orange-700 text-white border-orange-500/20 hover:scale-105 transition-transform">
                <div className="flex items-center mb-3">
                  <Database className="w-6 h-6 mr-3" />
                  <h3 className="font-semibold text-lg">Web Development</h3>
                </div>
                <p className="text-sm opacity-90">Django, MERN, Next.js</p>
              </Card>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-emerald-500/20 rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center space-y-2 text-white/70">
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Gradual Blur Effect */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="10rem"
        strength={2}
        divCount={8}
        curve="bezier"
        exponential={true}
        opacity={0.6}
      />
    </section>
  )
}
