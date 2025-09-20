"use client";

import { useEffect, useRef } from 'react';

interface GradualBlurProps {
  target?: 'parent' | 'self';
  position?: 'top' | 'bottom' | 'left' | 'right';
  height?: string;
  strength?: number;
  divCount?: number;
  curve?: 'linear' | 'bezier' | 'exponential';
  exponential?: boolean;
  opacity?: number;
}

export default function GradualBlur({
  target = 'parent',
  position = 'bottom',
  height = '6rem',
  strength = 2,
  divCount = 5,
  curve = 'bezier',
  exponential = true,
  opacity = 1
}: GradualBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing blur divs
    container.innerHTML = '';

    // Create blur divs
    for (let i = 0; i < divCount; i++) {
      const blurDiv = document.createElement('div');
      
      // Calculate blur strength based on curve
      let blurStrength: number;
      const progress = i / (divCount - 1);
      
      if (curve === 'linear') {
        blurStrength = progress * strength;
      } else if (curve === 'bezier') {
        // Bezier curve approximation
        blurStrength = progress * progress * (3 - 2 * progress) * strength;
      } else if (curve === 'exponential' || exponential) {
        blurStrength = Math.pow(progress, 2) * strength;
      } else {
        blurStrength = progress * strength;
      }

      // Set styles based on position
      const isVertical = position === 'top' || position === 'bottom';
      const isHorizontal = position === 'left' || position === 'right';
      
      blurDiv.style.position = 'absolute';
      blurDiv.style.pointerEvents = 'none';
      blurDiv.style.opacity = opacity.toString();
      blurDiv.style.filter = `blur(${blurStrength}px)`;
      blurDiv.style.zIndex = '10';
      
      if (isVertical) {
        blurDiv.style.width = '100%';
        blurDiv.style.height = height;
        blurDiv.style.left = '0';
        
        if (position === 'top') {
          blurDiv.style.top = '0';
        } else {
          blurDiv.style.bottom = '0';
        }
      } else if (isHorizontal) {
        blurDiv.style.height = '100%';
        blurDiv.style.width = height;
        blurDiv.style.top = '0';
        
        if (position === 'left') {
          blurDiv.style.left = '0';
        } else {
          blurDiv.style.right = '0';
        }
      }

      // Add gradient overlay for better effect
      const gradient = document.createElement('div');
      gradient.style.position = 'absolute';
      gradient.style.top = '0';
      gradient.style.left = '0';
      gradient.style.width = '100%';
      gradient.style.height = '100%';
      
      if (position === 'top') {
        gradient.style.background = 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))';
      } else if (position === 'bottom') {
        gradient.style.background = 'linear-gradient(to top, transparent, rgba(0,0,0,0.1))';
      } else if (position === 'left') {
        gradient.style.background = 'linear-gradient(to right, transparent, rgba(0,0,0,0.1))';
      } else {
        gradient.style.background = 'linear-gradient(to left, transparent, rgba(0,0,0,0.1))';
      }
      
      blurDiv.appendChild(gradient);
      container.appendChild(blurDiv);
    }
  }, [target, position, height, strength, divCount, curve, exponential, opacity]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 10
      }}
    />
  );
}
