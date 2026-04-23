import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// We will export a global object or let App pass a ref
export const scrollState = { progress: 0 }

export default function CameraRig() {
  const { camera } = useThree()
  
  // Create a target vector for the camera to lerp towards
  const targetPos = new THREE.Vector3()
  // Create a lookAt target
  const lookAtPos = new THREE.Vector3()

  useFrame((state, delta) => {
    // scrollState.progress goes from 0 to 1
    const p = scrollState.progress

    // Define a camera path based on progress
    // At p=0 (Hero): Z is high, we see the whole field.
    // At p=0.33 (Evolution): push into the noise web. Z goes down, maybe slight X/Y movement.
    // At p=0.66 (Speakers): push into the gallery.
    // At p=1.0 (Origin): deep in the scene looking at the text.

    // Calculate target Z based on progression
    // Let's say scene goes from Z=20 to Z=-100
    const isMobile = window.innerWidth < 768;
    const startZ = 20
    const endZ = -100
    // Non-linear camera scroll mapping to reach the memory field quickly on first scrolls
    let rawZ = 0;
    if (p < 0.15) {
      // 0 to 15% scroll covers the large void (Z=20 to Z=-35)
      rawZ = THREE.MathUtils.mapLinear(p, 0, 0.15, startZ, -35);
    } else {
      // 15% to 100% covers the gallery and destination (Z=-35 to Z=-100)
      rawZ = THREE.MathUtils.mapLinear(p, 0.15, 1.0, -35, endZ);
    }
    
    // Mobile devices natively pull the camera back 8 units to massively widen the vertical FOV scaling constraints
    const currentZ = rawZ + (isMobile ? 8 : 0)

    // Add some subtle bobbing or sine wave motion
    const t = state.clock.getElapsedTime()
    const bobX = Math.sin(t * 0.5) * 0.5
    const bobY = Math.cos(t * 0.3) * 0.5

    targetPos.set(bobX, bobY, currentZ)

    // Lerp the camera position for smoothness
    // dt * speed factor ensures framerate independence
    camera.position.lerp(targetPos, 0.05)

    // Optional: Lerp lookAt or rotation
    // lookAtPos.set(0, 0, currentZ - 20)
    // camera.lookAt(lookAtPos)
  })

  return null
}
