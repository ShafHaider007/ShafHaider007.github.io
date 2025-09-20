'use client'

import SplitText from './SplitText'

export default function SplitTextExample() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!')
  }

  return (
    <div className="space-y-8 p-8">
      {/* Basic character animation */}
      <SplitText
        text="Hello, GSAP!"
        className="text-2xl font-semibold text-center text-white"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />

      {/* Word animation */}
      <SplitText
        text="This is a word-by-word animation"
        className="text-xl text-slate-300 text-center"
        splitType="words"
        delay={0.5}
        duration={0.4}
        ease="power2.out"
        from={{ opacity: 0, x: -30 }}
        to={{ opacity: 1, x: 0 }}
        trigger="#example"
      />

      {/* Line animation */}
      <SplitText
        text="Line 1\nLine 2\nLine 3"
        className="text-lg text-blue-400 text-center"
        splitType="lines"
        delay={1.0}
        duration={0.5}
        ease="back.out(1.7)"
        from={{ opacity: 0, scale: 0.5 }}
        to={{ opacity: 1, scale: 1 }}
        trigger="#example"
      />

      {/* Advanced animation with rotation */}
      <SplitText
        text="Advanced Animation"
        className="text-3xl font-bold text-purple-400 text-center"
        splitType="chars"
        delay={1.5}
        duration={0.8}
        ease="elastic.out(1, 0.3)"
        from={{ opacity: 0, y: 50, rotation: 180, scale: 0 }}
        to={{ opacity: 1, y: 0, rotation: 0, scale: 1 }}
        trigger="#example"
      />
    </div>
  )
}
