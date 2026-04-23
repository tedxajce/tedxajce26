import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useDetectGPU } from '@react-three/drei'

// Soft Glowing Circle Map
const createParticleTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.7)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 32, 32)
  return new THREE.CanvasTexture(canvas)
}

export default function EnvironmentLayer() {
  const pointsRef = useRef()
  const { tier } = useDetectGPU()
  
  const particleTex = useMemo(() => createParticleTexture(), [])

  // Generate dense background particles
  const [positions, scales, colorsArray] = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    // Cap strictly on mobile, or fallback to GPU Tier parsing for desktop
    const count = isMobile ? 4000 : (tier === 0 ? 10000 : tier === 1 ? 20000 : 50000);
    const pos = new Float32Array(count * 3)
    const scale = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    
    const colorRed = new THREE.Color('#ff0000')
    const colorWhite = new THREE.Color('#ffffff')

    for (let i = 0; i < count; i++) {
      // Spread them very wide and deep across the entire Z space
      pos[i * 3] = (Math.random() - 0.5) * 250
      pos[i * 3 + 1] = (Math.random() - 0.5) * 250
      pos[i * 3 + 2] = 50 - Math.random() * 350 // from Z=50 to Z=-300
      scale[i] = Math.random()
      
      const mixedColor = Math.random() > 0.3 ? colorRed : colorWhite
      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }
    return [pos, scale, colors]
  }, [])

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // slow rotation to give a subtle drift
      pointsRef.current.rotation.y += delta * 0.05
      pointsRef.current.rotation.x += delta * 0.02
    }
  })

  // We can include a fog in the parent or setup volumetric planes here
  return (
    <>
      <fog attach="fog" args={['#050005', 10, 80]} />
      <ambientLight intensity={0.5} />
      
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colorsArray.length / 3}
            array={colorsArray}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={particleTex}
          size={0.45}
          vertexColors
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  )
}
