import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useDetectGPU, Text } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from './CameraRig'

// Create extremely fast soft-glowing circular particle sprite map natively
const createParticleTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.8)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 32, 32)
  return new THREE.CanvasTexture(canvas)
}

export default function Hero() {
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()
  const ring4Ref = useRef()
  const titleGroupRef = useRef()

  const orbitGroupRef = useRef()
  const particlesRef = useRef()

  const { size } = useThree()
  const isMobile = size.width < 768

  const { tier } = useDetectGPU()

  // GPU Matrix sizing
  const particleCount = tier === 0 ? 4000 : tier === 1 ? 5000 : 10000
  const particleSize = tier === 0 ? 0.3 : tier === 1 ? 0.2 : 0.15

  const particleTex = useMemo(() => createParticleTexture(), [])

  const scrollLockTriggered = useRef(false)

  const [particlePositions, particleColors, particleSizes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const cols = new Float32Array(particleCount * 3)
    const cRed = new THREE.Color('#ff2a2a')
    const cWhite = new THREE.Color('#ffffff')

    for (let i = 0; i < particleCount; i++) {
      const r = 4.0 + Math.random() * 4.0
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const col = Math.random() > 0.4 ? cRed : cWhite
      cols[i * 3] = col.r
      cols[i * 3 + 1] = col.g
      cols[i * 3 + 2] = col.b
    }

    const sizes = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) sizes[i] = Math.random() * 0.8 + 0.4

    return [pos, cols, sizes]
  }, [particleCount])

  const basePositions = useMemo(() => new Float32Array(particlePositions), [particlePositions])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    const rawProgress = scrollState?.progress || 0

    if (rawProgress >= 0.999 && !scrollLockTriggered.current) {
      scrollLockTriggered.current = true
      document.body.style.overflow = 'hidden'
      setTimeout(() => { document.body.style.overflow = 'auto' }, 1000)
    }

    const smoothStep = THREE.MathUtils.smoothstep(rawProgress, 0, 0.15)

    if (orbitGroupRef.current) {
      const orbitScale = 0.5 + smoothStep * 0.5
      orbitGroupRef.current.scale.set(orbitScale, orbitScale, orbitScale)
    }

    if (titleGroupRef.current) {
      // Floating effect for the title
      titleGroupRef.current.position.y = Math.sin(t * 0.5) * 0.2
      titleGroupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1
      // Fade out on scroll
      titleGroupRef.current.scale.setScalar(1 + smoothStep * 2)
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.15;
      ring1Ref.current.rotation.y += delta * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.1;
      ring2Ref.current.rotation.z += delta * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.12;
      ring3Ref.current.rotation.z -= delta * 0.1;
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.y += delta * 0.08;
      ring4Ref.current.rotation.x -= delta * 0.05;
    }

    if (particlesRef.current) {
      const positionsAttr = particlesRef.current.geometry.attributes.position
      const explodeRadius = 1.0 + (smoothStep * 8.0)

      for (let i = 0; i < particleCount; i++) {
        const waveX = Math.sin(t * 2 + i) * 0.5
        const waveY = Math.cos(t * 2 + i) * 0.5

        positionsAttr.array[i * 3] = (basePositions[i * 3] + waveX) * explodeRadius
        positionsAttr.array[i * 3 + 1] = (basePositions[i * 3 + 1] + waveY) * explodeRadius
        positionsAttr.array[i * 3 + 2] = basePositions[i * 3 + 2] * explodeRadius
      }
      positionsAttr.needsUpdate = true
      particlesRef.current.material.opacity = 0.8 - (smoothStep * 0.7)
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Title in the center of the particles */}
      <group ref={titleGroupRef}>
        <Text
          fontSize={isMobile ? 1.5 : 2.5}
          color="#ffffff"
          font="https://cdn.jsdelivr.net/npm/@fontsource/outfit@5.0.1/files/outfit-latin-900-normal.woff"
          maxWidth={200}
          textAlign="center"
          letterSpacing={0.15}
          anchorX="center"
          anchorY="middle"
        >
          TEDxAJCE
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={.2}
            toneMapped={false}
          />
        </Text>
      </group>

      {/* Soft circular glowing particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={particlePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={particleColors} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={particleCount} array={particleSizes} itemSize={1} />
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

      {/* Orbital structure */}
      <group ref={orbitGroupRef}>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[6, 0.02, 8, 64]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} roughness={0.1} />
        </mesh>

        <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[9, 0.02, 8, 64]} />
          <meshStandardMaterial color="#ff2a2a" emissive="#ff2a2a" emissiveIntensity={0.5} roughness={0.1} />
        </mesh>

        <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[12, 0.015, 8, 64]} />
          <meshStandardMaterial color="#aaaaaa" emissive="#ffffff" emissiveIntensity={0.3} roughness={0.1} />
        </mesh>

        <mesh ref={ring4Ref} rotation={[Math.PI / 6, Math.PI / 2, 0]}>
          <torusGeometry args={[16, 0.01, 8, 64]} />
          <meshStandardMaterial color="#555555" emissive="#ff2a2a" emissiveIntensity={0.2} roughness={0.1} />
        </mesh>
      </group>
    </group>
  )
}
