"use client";

import { Card } from '@/components/ui/Card'
import { GraduationCap, Award, Users, Lightbulb, Target, TrendingUp, BookOpen } from 'lucide-react'
import SplitText from '@/components/SplitText'
import PixelTransition from '@/components/PixelTransition'
import GradualBlur from '@/components/GradualBlur'

export function About() {
  return (
    <section id="about" className="relative py-20 px-4 bg-slate-800 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <SplitText
            text="About Me"
            className="text-5xl font-bold text-white mb-6"
            splitType="chars"
            delay={0.2}
            duration={0.6}
            ease="power3.out"
            from={{ opacity: 0, y: 40, scale: 0.8 }}
            to={{ opacity: 1, y: 0, scale: 1 }}
            trigger="#about"
          />
          <SplitText
            text="A passionate Geoinformatics Engineering student with a strong foundation in spatial analysis, web development, and machine learning applications."
            className="text-2xl text-slate-300 max-w-4xl mx-auto"
            splitType="words"
            delay={0.6}
            duration={0.5}
            ease="power2.out"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            trigger="#about"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Education */}
          <Card className="p-10 bg-slate-700/50 border-slate-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mr-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">Education</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Bachelor of Science in Geoinformatics Engineering
                </h4>
                <p className="text-blue-400 font-medium text-lg">National University of Science and Technology (NUST)</p>
                <p className="text-slate-300 text-lg">Islamabad, Pakistan</p>
                <div className="mt-4 flex flex-wrap gap-6 text-lg text-slate-400">
                  <span className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Current CGPA: 3.55
                  </span>
                  <span className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Expected Graduation: May 2025
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Key Highlights */}
          <Card className="p-10 bg-slate-700/50 border-slate-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center mr-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">Key Highlights</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-slate-300 text-lg">
                  <strong className="text-white">Leadership:</strong> Vice President of Operations for "GIS Day 2024" at NUST
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <Award className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-slate-300 text-lg">
                  <strong className="text-white">Sports:</strong> Active hard ball cricketer with event management experience
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <Lightbulb className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-slate-300 text-lg">
                  <strong className="text-white">Problem Solving:</strong> Proven analytical skills through end-semester projects
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <BookOpen className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-slate-300 text-lg">
                  <strong className="text-white">Research:</strong> Currently working on AR applications for urban mobility mapping
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Interactive Skills Showcase */}
        <div className="relative">
          <div className="h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <PixelTransition
              firstContent={
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Target className="w-20 h-20 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold mb-4">Research Focus</h3>
                    <p className="text-xl opacity-90">AR Applications for Urban Mobility</p>
                  </div>
                </div>
              }
              secondContent={
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <TrendingUp className="w-20 h-20 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold mb-4">Career Goals</h3>
                    <p className="text-xl opacity-90">GIS Development & Spatial Analysis</p>
                  </div>
                </div>
              }
              gridSize={10}
              pixelColor='#ffffff'
              animationStepDuration={0.7}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Gradual Blur Effect */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="8rem"
        strength={2.5}
        divCount={6}
        curve="bezier"
        exponential={true}
        opacity={0.7}
      />
    </section>
  )
}
