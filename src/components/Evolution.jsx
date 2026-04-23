import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Evolution() {
  const lineRef = useRef()
  const meshRef = useRef()

  // Generate chaotic points for a neural web
  const [positions, geometry] = useMemo(() => {
    const pts = []
    for (let i = 0; i < 200; i++) {
        // distribute them in a tunnel shape
      const x = (Math.random() - 0.5) * 30
      const y = (Math.random() - 0.5) * 30
      const z = (Math.random() - 0.5) * 30
      pts.push(new THREE.Vector3(x, y, z))
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    return [pts, geo]
  }, [])

  useFrame((state, delta) => {
    if (lineRef.current) {
      lineRef.current.rotation.z += delta * 0.1
      lineRef.current.rotation.x += delta * 0.05
    }
    if (meshRef.current) {
        meshRef.current.rotation.y -= delta * 0.2
        meshRef.current.rotation.x -= delta * 0.1
    }
  })

  // Placed at Z = -40
  return (
    <group position={[0, 0, -40]}>
      <lineSegments ref={lineRef} geometry={geometry}>
        <lineBasicMaterial color="#ff5555" transparent opacity={0.3} />
      </lineSegments>
      {/* Structural form evolving from the chaos */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[5, 1]} />
        <meshStandardMaterial 
            color="#222" 
            wireframe 
            emissive="#ff0000"
            emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}
