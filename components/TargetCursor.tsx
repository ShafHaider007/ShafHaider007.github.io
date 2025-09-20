"use client";

import { useEffect, useRef } from 'react';

interface TargetCursorProps {
  spinDuration?: number;
  hideDefaultCursor?: boolean;
}

export default function TargetCursor({ 
  spinDuration = 2, 
  hideDefaultCursor = true 
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const target = targetRef.current;
    
    if (!cursor || !target) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      const diffX = mouseX - cursorX;
      const diffY = mouseY - cursorY;
      
      cursorX += diffX * 0.1;
      cursorY += diffY * 0.1;
      
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      target.style.opacity = '1';
      target.style.transform = 'scale(1)';
    };

    const handleMouseLeave = () => {
      target.style.opacity = '0';
      target.style.transform = 'scale(0.8)';
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    updateCursor();

    // Hide default cursor if requested
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, [hideDefaultCursor]);

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          width: '20px',
          height: '20px',
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s ease'
        }}
      >
        <div
          ref={targetRef}
          className="w-full h-full border-2 border-white rounded-full opacity-0 transition-all duration-300"
          style={{
            transform: 'scale(0.8)',
            animation: `spin ${spinDuration}s linear infinite`
          }}
        />
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
