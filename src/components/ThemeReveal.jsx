import { useRef, useState, useMemo, useEffect } from 'react'
import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useDetectGPU } from '@react-three/drei'
import * as THREE from 'three'

// Glowing Circular Texture
const createParticleTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.7)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 32, 32)
  return new THREE.CanvasTexture(canvas)
}

function LogoParticles({ position }) {
  const [particleData, setParticleData] = useState(null)
  const particlesRef = useRef()
  const { tier } = useDetectGPU()

  // Ensure full coverage by scaling density/size
  const INSTANCE_COUNT = tier === 0 ? 2000 : tier === 1 ? 4000 : 8000
  const particleSize = tier === 0 ? 0.4 : tier === 1 ? 0.25 : 0.15
  
  const particleTex = useMemo(() => createParticleTexture(), [])

  useEffect(() => {
    // Load the logo image to pull pixel data
    // Using the newly formatted png logo bounded safely to the Vite router base
    const img = new Image()
    img.src = import.meta.env.BASE_URL + 'tedl.png' 
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const w = 150
      const h = 150
      canvas.width = w
      canvas.height = h
      ctx.drawImage(img, 0, 0, w, h)
      
      const imgData = ctx.getImageData(0, 0, w, h).data
      const positions = []
      const colors = []

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const index = (y * w + x) * 4
          const r = imgData[index]
          const g = imgData[index + 1]
          const b = imgData[index + 2]
          
          const lum = r * 0.299 + g * 0.587 + b * 0.114
          if (lum > 20) {
            // Map 2D pixel to 3D position
            // Make scale quite large so it fills the screen behind the text
            const posX = (x / w - 0.5) * 60
            const posY = -(y / h - 0.5) * 60
            const posZ = 0

            positions.push({ x: posX, y: posY, z: posZ })
            colors.push(new THREE.Color(`rgb(${r},${g},${b})`))
          }
        }
      }

      // Securely spread the index across the entire image so the whole logo shape is ALWAYS visible
      const step = Math.max(1, positions.length / INSTANCE_COUNT)
      const finalPositions = new Float32Array(INSTANCE_COUNT * 3)
      const finalColors = new Float32Array(INSTANCE_COUNT * 3)

      for(let i = 0; i < INSTANCE_COUNT; i++) {
        const sourceIdx = Math.floor(i * step) % Math.max(positions.length, 1)
        if(positions.length > 0) {
           finalPositions[i*3] = positions[sourceIdx].x
           finalPositions[i*3+1] = positions[sourceIdx].y
           finalPositions[i*3+2] = positions[sourceIdx].z
           
           finalColors[i*3] = colors[sourceIdx].r
           finalColors[i*3+1] = colors[sourceIdx].g
           finalColors[i*3+2] = colors[sourceIdx].b
        } else {
           finalPositions[i*3] = (Math.random()-0.5)*10
           finalPositions[i*3+1] = (Math.random()-0.5)*10
           finalPositions[i*3+2] = 0
           finalColors[i*3] = 1
           finalColors[i*3+1] = 0
           finalColors[i*3+2] = 0
        }
      }

      setParticleData({ positions: finalPositions, colors: finalColors, base: new Float32Array(finalPositions) })
    }
  }, [])

  useFrame((state, delta) => {
    if (!particleData || !particlesRef.current) return
    const t = state.clock.getElapsedTime()
    const positionsAttr = particlesRef.current.geometry.attributes.position

    for (let i = 0; i < INSTANCE_COUNT; i++) {
      const baseX = particleData.base[i*3]
      const baseY = particleData.base[i*3+1]
      const baseZ = particleData.base[i*3+2]
      
      // Massive cinematic slow float/shimmer scaling per particle
      const waveX = Math.sin(t * 0.5 + baseY * 0.1) * 2.5
      const waveY = Math.cos(t * 0.5 + baseX * 0.1) * 2.5
      const waveZ = Math.sin(t * 0.8 + i) * 2.5

      positionsAttr.array[i*3] = baseX + waveX
      positionsAttr.array[i*3+1] = baseY + waveY
      positionsAttr.array[i*3+2] = baseZ + waveZ
    }

    positionsAttr.needsUpdate = true
  })

  // Deep placement and dense glowing presence
  return (
    <group position={position}>
      {particleData && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={INSTANCE_COUNT} array={particleData.positions} itemSize={3} />
            <bufferAttribute attach="attributes-color" count={INSTANCE_COUNT} array={particleData.colors} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial 
             map={particleTex}
             size={particleSize} 
             vertexColors 
             transparent 
             opacity={0.8} 
             blending={THREE.AdditiveBlending} 
             depthWrite={false} 
          />
        </points>
      )}
    </group>
  )
}


export default function ThemeReveal() {
  const textRef = useRef()
  const { size } = useThree()
  // Dynamic scaling based on viewport constraints
  const mainFontSize = Math.min(Math.max(size.width / 100, 4), 11)
  const subFontSize = Math.min(Math.max(size.width / 800, 0.7), 1.2)

  useFrame((state, delta) => {
    if (textRef.current) {
      // Gentle floating
      textRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.5
    }
  })

  // Placed at Z = -120
  return (
    <group position={[0, 0, -120]}>
      {/* Visual Logo Particles at -10 depth relative to the text so it sits behind */}
      <LogoParticles position={[0, 0, -10]} />

      <group ref={textRef}>
        <Text
          fontSize={mainFontSize}
          color="#ffffff"
          font="https://cdn.jsdelivr.net/npm/@fontsource/outfit@5.0.1/files/outfit-latin-900-normal.woff"
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.2}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.1}
          outlineColor="#ff0000"
        >
          ORIGIN
          <meshPhysicalMaterial 
              color="#ffffff" 
              emissive="#ff0000" 
              emissiveIntensity={3} 
              roughness={0.2} 
              metalness={0.8}
          />
        </Text>

        <Text
          position={[0, -mainFontSize * 0.6, 0]}
          fontSize={subFontSize}
          color="#888888"
          font="https://cdn.jsdelivr.net/npm/@fontsource/outfit@5.0.1/files/outfit-latin-400-normal.woff"
          letterSpacing={0.1}
          anchorX="center"
          anchorY="middle"
        >
          Discover the origin of ideas at TEDxAJCE 2026
        </Text>
      </group>
      
      <pointLight position={[0, 0, 5]} intensity={50} color="#ff0000" distance={50} />
    </group>
  )
}
