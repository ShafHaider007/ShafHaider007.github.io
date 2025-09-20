import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About This Project
          </h1>
          
          <Card className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-600 mb-4">
              This is a modern Next.js application built with TypeScript and Tailwind CSS. 
              It demonstrates best practices for React development and includes a clean, 
              scalable project structure.
            </p>
            <p className="text-gray-600">
              The project features server-side rendering, static site generation, 
              and a component-based architecture that makes it easy to maintain and extend.
            </p>
          </Card>
          
          <Card className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Next.js 14 - React framework</li>
              <li>TypeScript - Type safety</li>
              <li>Tailwind CSS - Utility-first CSS</li>
              <li>ESLint - Code linting</li>
              <li>App Router - Modern routing system</li>
            </ul>
          </Card>
          
          <div className="flex space-x-4">
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com" target="_blank">
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
