import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCursor, useDetectGPU } from '@react-three/drei'
import * as THREE from 'three'

// Geometry shared among all planes to save WebGL memory
const planeGeo = new THREE.PlaneGeometry(1, 1)

// Map the user's hardcoded local public files using relative rendering routes
const localImages = [
  "Fvde8_GXsAIg1qi.jpg", "hq720 (1).jpg", "hq720 (2).jpg", "hq720 (3).jpg", 
  "hq720 (4).jpg", "hq720 (5).jpg", "hq720 (6).jpg", "hq720 (7).jpg", 
  "hq720.jpg", "images (1).jpeg", "images (2).jpeg", "images.jpeg", 
  "img10.png", "img2 (1).png", "img2.png", "img3.png", "img4.png", 
  "img6.png", "img7.png", "img8.png", "img9.png"
];

const speakersData = localImages.map((imgName, i) => ({
  id: i,
  url: import.meta.env.BASE_URL + imgName, // Forces the absolute Github Pages subdirectory path
  pos: [
    (Math.random() - 0.5) * 60, // Scatted spread X
    (Math.random() - 0.5) * 25, // Scatted spread Y
    -45 - (Math.random() * 55)  // Z stops at -100 strictly, far before ORIGIN at -120
  ]
}))

function SpeakerPlane({ url, pos }) {
  const ref = useRef()
  const [texture, setTexture] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [hovered, setHover] = useState(false)
  useCursor(hovered)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(
      url,
      (tex) => {
        tex.anisotropy = 16
        tex.colorSpace = THREE.SRGBColorSpace
        setTexture(tex)
      },
      undefined,
      (err) => {
        setHasError(true)
      }
    )
  }, [url])

  useFrame((state, delta) => {
    if (!ref.current) return

    // Idle floating motion
    const t = state.clock.getElapsedTime()
    const floatY = Math.sin(t * 1.5 + pos[0]) * 0.1
    ref.current.position.y = pos[1] + floatY

    // Smooth hover tilt and scale mapped against the baseline (Reduced 15% per request)
    const baseWidth = 4.28
    const baseHeight = 5.71
    const hoverMult = hovered ? 1.08 : 1
    const targetScaleVec = new THREE.Vector3(baseWidth * hoverMult, baseHeight * hoverMult, 1)
    ref.current.scale.lerp(targetScaleVec, 0.1)
    
    // Tilt towards mouse if hovered, otherwise slow idle drift
    const targetRotX = hovered ? (state.pointer.y * Math.PI) / 6 : Math.sin(t * 0.5 + pos[0]) * 0.05
    const targetRotY = hovered ? -(state.pointer.x * Math.PI) / 6 : Math.cos(t * 0.3 + pos[1]) * 0.05
    
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotX, 0.1)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.1)
    
    // Glow effect toggle via material color boost
    if(ref.current.material && texture) {
        ref.current.material.color.lerp(
            new THREE.Color(hovered ? '#ffffff' : '#aaaaaa'), 
            0.1
        )
    }
  })

  // Graceful fallback for failed images
  if (hasError) {
    return (
      <mesh 
        ref={ref} 
        position={pos} 
        scale={[5.04, 6.72, 1]}
        geometry={planeGeo}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}>
        <meshPhysicalMaterial color="#222222" emissive={hovered ? "#ff0000" : "#000000"} emissiveIntensity={0.5} />
      </mesh>
    )
  }

  // Skip rendering until texture is ready
  if (!texture) return null

  return (
    <mesh 
      ref={ref} 
      position={pos} 
      scale={[12, 16, 1]}
      geometry={planeGeo}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => {}}>
      <meshStandardMaterial map={texture} roughness={0.4} metalness={0.1} />
    </mesh>
  )
}

export default function SpeakersGallery() {
  const { tier } = useDetectGPU()
  // Reduced image count
  const displayCount = tier === 0 ? 12 : tier === 1 ? 16 : 20
  
  return (
    <group>
      {speakersData.slice(0, displayCount).map(s => (
        <SpeakerPlane key={s.id} url={s.url} pos={s.pos} />
      ))}
      <rectAreaLight width={40} height={40} color="#ff0000" intensity={2} position={[0, 0, -50]} />
      <ambientLight intensity={1.5} />
    </group>
  )
}
