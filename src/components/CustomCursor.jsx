import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const canvasRef = useRef(null)
  const dotRef = useRef(null)
  const requestRef = useRef(null)
  const pointsRef = useRef([])
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Explicit tracking pointers isolated entirely from React State engine to prevent layout lock-stuttering
  const cursorX = useRef(-100)
  const cursorY = useRef(-100)
  const isHoveringRef = useRef(false)

  useEffect(() => {
    // 1. Initial Device Context Validation (Explicit user request constraint)
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsMobile(true)
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    
    // Bounds scaling handling
    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    // 2. High Frequency Mouse Hardware Vector Capture
    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true)
      
      const x = e.clientX
      const y = e.clientY
      
      cursorX.current = x
      cursorY.current = y

      // Feed historical geometric bounds into raw array memory mapping
      pointsRef.current.push({
         x, 
         y, 
         timestamp: performance.now(),
      })
    }

    // 3. User Interaction Rules Enforcement
    const onMouseOver = (e) => {
      // Fade Canvas Trail over interacting DOM bounds, but KEEP the core Tracking Dot visible explicitly expanding geometry bounds!
      const target = e.target
      const tag = target.tagName.toLowerCase()
      // Safely evaluates raw tags explicitly or complex component boundaries utilizing <a>
      if (tag === 'input' || tag === 'textarea' || tag === 'button' || target.closest('a') || target.closest('button')) {
        isHoveringRef.current = true
        canvas.style.opacity = '0'
      } else {
        isHoveringRef.current = false
        canvas.style.opacity = '1'
      }
    }

    // Handle user abandoning the entire local app boundaries natively (e.g. leaving the browser)
    const onMouseOut = (e) => {
        if (!e.relatedTarget) {
            setIsVisible(false)
        }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)

    // 4. HTML5 Rendering Logic Engine Loop
    const render = () => {
        // Flash buffer entirely prior to vector redrawing limits
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        const now = performance.now()
        // Cull expired geometry perfectly mapped ~250ms to enforce graceful fluid degradation natively
        pointsRef.current = pointsRef.current.filter(p => now - p.timestamp < 250)
        const points = pointsRef.current

        // DOM Layer Mapping utilizing massive performance standard 'will-change: transform'
        if (dotRef.current) {
           // Expands core targeting dot natively simulating standard hand interaction bounds dynamically
           const scale = isHoveringRef.current ? 'scale(2.5)' : 'scale(1)'
           dotRef.current.style.transform = `translate3d(${cursorX.current}px, ${cursorY.current}px, 0) ${scale}`
        }

        // Canvas Trailing Engine utilizing pure bezier algebra sweeps explicitly requesting no straight line boundaries
        if (points.length > 2) {
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'

            for (let i = 1; i < points.length - 1; i++) {
                ctx.beginPath()

                const p0 = points[i - 1]
                const p1 = points[i]
                const p2 = points[i + 1]

                // Exponential age modifier (fades quickly for a sharp comet aesthetic)
                const age = now - p1.timestamp
                const ageRatio = Math.max(0, 1 - Math.pow(age / 250, 1.5)) 

                // Speed scale checking
                const dist = Math.hypot(p1.x - p0.x, p1.y - p0.y)
                
                // Comet trail thickness mapping (much thicker than before)
                const speedModifier = Math.min(18, Math.max(4, dist * 0.4))

                // Quadratic connection intersections
                const midpointX = (p0.x + p1.x) / 2
                const midpointY = (p0.y + p1.y) / 2
                const nextMidX = (p1.x + p2.x) / 2
                const nextMidY = (p1.y + p2.y) / 2

                ctx.moveTo(midpointX, midpointY)
                ctx.quadraticCurveTo(p1.x, p1.y, nextMidX, nextMidY)
                
                // 1. The massive red blooming shadow pass
                ctx.lineWidth = speedModifier * ageRatio
                ctx.strokeStyle = `rgba(255, 10, 10, ${ageRatio})`
                ctx.shadowBlur = 25 * ageRatio
                ctx.shadowColor = 'rgba(255, 0, 0, 1)'
                ctx.stroke()
                
                // 2. The inner hot "plasma" core (white-yellowish-red blending)
                ctx.beginPath()
                ctx.moveTo(midpointX, midpointY)
                ctx.quadraticCurveTo(p1.x, p1.y, nextMidX, nextMidY)
                ctx.lineWidth = (speedModifier * 0.3) * ageRatio
                ctx.strokeStyle = `rgba(255, 200, 200, ${ageRatio * 0.9})`
                ctx.shadowBlur = 5
                ctx.shadowColor = '#ffffff'
                ctx.stroke()
            }
        }

        requestRef.current = requestAnimationFrame(render)
    }

    requestRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(requestRef.current)
    }
  }, [isVisible])

  // Explicit hard crash block for mobile endpoints completely natively dropping processing cycles bounds
  if (isMobile) return null

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 9999, pointerEvents: 'none', opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
       
       <canvas 
          ref={canvasRef} 
          style={{ width: '100%', height: '100%', transition: 'opacity 0.2s ease' }} 
       />
       
       {/* Premium Red Dot Origin bounding box */}
       <div 
          ref={dotRef}
          style={{
              position: 'absolute',
              top: '-4px', // Centers precisely
              left: '-4px',
              width: '8px',
              height: '8px',
              backgroundColor: '#ffffff', // Clean white core
              borderRadius: '50%',
              boxShadow: '0 0 15px 4px #ff2a2a, 0 0 30px #ff0000', // Massive red emit
              willChange: 'transform',
              transition: 'opacity 0.2s ease', 
          }}
       />
    </div>
  )
}
