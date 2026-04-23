import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from './CameraRig'

export default function Journey() {
  const textRef = useRef()
  const { size } = useThree()
  const isMobile = size.width < 768

  useFrame(() => {
    const p = scrollState?.progress || 0
    if (!textRef.current) return
    
    // Smooth transition mapping visibility strictly when approaching Z=-40
    // Under the new camera physics, we arrive at Z=-35 exactly at p=0.15
    const assemblyProgress = THREE.MathUtils.smoothstep(p, 0.05, 0.13)
    
    // We want the text to fade out smoothly as the camera slowly pulls through it 
    // We physically pass Z=-40 around p=0.215!
    const fadeOut = THREE.MathUtils.smoothstep(p, 0.18, 0.22)
    
    textRef.current.material.opacity = assemblyProgress * (1 - fadeOut)
  })

  // Physically nested at Z=-40
  // Centered directly in the camera path
  return (
    <group position={[0, 0, -40]}>
      <Text
          ref={textRef}
          position={[0, 0, 0]}
          fontSize={isMobile ? 1.8 : 3}
          color="#ffffff"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          transparent
        >
          {isMobile ? "Memories\nSo Far" : "Memories So Far"}
      </Text>
    </group>
  )
}
