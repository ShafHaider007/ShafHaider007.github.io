"use client";

import { useState, useEffect, useRef } from 'react';

interface PixelTransitionProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  className?: string;
}

export default function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 12,
  pixelColor = '#ffffff',
  animationStepDuration = 0.4,
  className = ''
}: PixelTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSecondContent, setShowSecondContent] = useState(false);
  const [pixels, setPixels] = useState<Array<{ id: number; delay: number; isVisible: boolean }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize pixels with random delays
    const totalPixels = gridSize * gridSize;
    const newPixels = Array.from({ length: totalPixels }, (_, index) => ({
      id: index,
      delay: Math.random() * animationStepDuration,
      isVisible: false
    }));
    setPixels(newPixels);
  }, [gridSize, animationStepDuration]);

  const startTransition = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Animate pixels out
    setPixels(prev => prev.map(pixel => ({ ...pixel, isVisible: false })));
    
    setTimeout(() => {
      setShowSecondContent(true);
      
      // Animate pixels in
      setTimeout(() => {
        setPixels(prev => prev.map(pixel => ({ ...pixel, isVisible: true })));
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, animationStepDuration * 1000);
      }, 50);
    }, animationStepDuration * 1000);
  };

  const resetTransition = () => {
    setIsTransitioning(false);
    setShowSecondContent(false);
    setPixels(prev => prev.map(pixel => ({ ...pixel, isVisible: true })));
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ cursor: 'pointer' }}
      onClick={startTransition}
    >
      {/* Content Container */}
      <div className="absolute inset-0 w-full h-full">
        {!showSecondContent ? firstContent : secondContent}
      </div>

      {/* Pixel Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="grid w-full h-full"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`
          }}
        >
          {pixels.map((pixel) => (
            <div
              key={pixel.id}
              className="transition-opacity duration-300"
              style={{
                backgroundColor: pixelColor,
                opacity: pixel.isVisible ? 0 : 1,
                transitionDelay: `${pixel.delay}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          resetTransition();
        }}
        className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm hover:bg-black/70 transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
