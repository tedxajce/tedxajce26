import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'

export default function RippleTransition({ positionZ = -85 }) {
  const { size } = useThree()
  const isMobile = size.width < 768
  
  const groupRef = useRef()

  return (
    <group position={[0, 0, positionZ]} ref={groupRef}>
       <Text
          position={[0, 0, 0]}
          fontSize={isMobile ? 0.8 : 1.5}
          color="#ffffff"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
          letterSpacing={0.3}
          anchorX="center"
          anchorY="middle"
        >
          Every idea begins somewhere
        </Text>
    </group>
  )
}
