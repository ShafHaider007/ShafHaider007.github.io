import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Muhammad Shaf Haider - Developer & GIS Engineer",
  description:
    "Portfolio of Muhammad Shaf Haider - Geoinformatics Engineering Graduate & GIS Developer passionate about spatial analysis, web GIS, and machine learning.",
  keywords: ["GIS", "Developer", "Geoinformatics", "Spatial Analysis", "Web Development"],
  authors: [{ name: "Muhammad Shaf Haider" }],
  openGraph: {
    title: "Muhammad Shaf Haider - Developer & GIS Engineer",
    description: "Geoinformatics Engineering Graduate & GIS Developer",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  )
}
