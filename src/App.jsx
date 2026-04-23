import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise, Vignette, DepthOfField } from '@react-three/postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import CameraRig, { scrollState } from './components/CameraRig'
import EnvironmentLayer from './components/EnvironmentLayer'
import Hero from './components/Hero'
import Journey from './components/Journey'
import SpeakersGallery from './components/SpeakersGallery'
import ThemeReveal from './components/ThemeReveal'
import RippleTransition from './components/RippleTransition'
import ThemeDetails from './components/ThemeDetails'
import SpeakerSection from './components/SpeakerSection'
import TicketSection from './components/TicketSection'
import TeamSection from './components/TeamSection'
import ContactSection from './components/ContactSection'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useDetectGPU } from '@react-three/drei'
import * as THREE from 'three'

function SceneEffects() {
  const gpu = useDetectGPU()
  const tier = gpu?.tier !== undefined ? gpu.tier : 0 // Default to tier 0 during detection to avoid empty composer

  return (
    <EffectComposer disableNormalPass multisampling={0}>
      {tier > 0 && <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={1.5} />}
      {tier > 1 && <Vignette eskil={false} offset={0.1} darkness={1.1} />}
    </EffectComposer>
  )
}

export default function App() {
  const isMobile = window.innerWidth < 768;
  const [showHeroUI, setShowHeroUI] = useState(true);

  useEffect(() => {
    // Force a resize event after mount to "poke" the WebGL renderer and browser context
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 100)

    // Setup GSAP ScrollTrigger to capture normalized 0-1 progress
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: () => `+=${window.innerHeight * 5}`,
      scrub: isMobile ? 1.5 : 1,
      onUpdate: (self) => {
        scrollState.progress = self.progress
        // Hide Hero UI immediately as we dive into the 3D space
        if (self.progress > 0.01 && showHeroUI) {
          setShowHeroUI(false);
        } else if (self.progress <= 0.01 && !showHeroUI) {
          setShowHeroUI(true);
        }
      }
    })

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [showHeroUI])

  return (
    <>
      <Preloader />
      <CustomCursor />
      <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <ErrorBoundary>
          <Canvas
            frameloop="always"
            dpr={[1, 1.5]}
            gl={{
              powerPreference: 'high-performance',
              toneMapping: THREE.ACESFilmicToneMapping,
              outputColorSpace: THREE.SRGBColorSpace,
              preserveDrawingBuffer: true
            }}
            fallback={
              <div style={{ color: 'white', display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <h1>WebGL Failed to load. Hardware acceleration may be disabled.</h1>
              </div>
            }
          >
            <CameraRig />
            <EnvironmentLayer />
            <Hero />
            <Journey />
            <SpeakersGallery />
            <RippleTransition positionZ={-85} />
            <ThemeReveal />
            <SceneEffects />
          </Canvas>
        </ErrorBoundary>
      </div>

      <div className="hud-layer">
        {/* Top Event Branding */}
        <div className="hero-top-branding" style={{
          opacity: showHeroUI ? 1 : 0,
          pointerEvents: 'none',
          transform: showHeroUI ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.8s ease'
        }}>
          <h1 className="hero-event-name">TEDx<span style={{ color: '#ff2a2a' }}>AJCE</span></h1>
          <p className="hero-edition">8th Edition</p>
        </div>

        {/* Centered Title Area */}
        <div className="hero-landing-ui" style={{
          opacity: showHeroUI ? 1 : 0,
          pointerEvents: 'none',
          transform: showHeroUI ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -60%) scale(1.1)'
        }}>
          {/* Main title is now handled by the 3D ThemeReveal component in the background */}
        </div>

        {/* Refactored Bottom Branding */}
        <div className="hero-bottom-branding" style={{
          opacity: showHeroUI ? 1 : 0,
          pointerEvents: 'none',
          transform: showHeroUI 
            ? `translateX(${isMobile ? '-50%' : '-56%'}) translateY(0)` 
            : `translateX(${isMobile ? '-50%' : '-56%'}) translateY(20px)`,
          textAlign: 'center'
        }}>
          <img
            src={import.meta.env.BASE_URL + "tedl.png"}
            alt="TEDx Logo"
            className="hero-logo-bottom"
          />
          <p className="tagline-glitch" style={{ margin: '0.3rem 0 0 0' }}>Discover the origins of ideas</p>
        </div>

        {/* Dedicated Scroll Hint Layer */}
        <div className="scroll-hint-container" style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: showHeroUI ? 0.5 : 0,
          transition: 'opacity 0.5s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          pointerEvents: 'none'
        }}>
          <span style={{ letterSpacing: '2px', fontSize: '0.6rem', opacity: 0.8 }}>EXPLORE JOURNEY</span>
          <div className="down-arrow"></div>
        </div>

        {/* <div className="scroll-indicator" style={{ opacity: showHeroUI ? 0 : 1 }}>Scroll to Explore</div> */}
      </div>

      <Navbar />
      <div style={{ position: 'absolute', top: '600vh', width: '100%', minHeight: '200vh', zIndex: 50 }}>
        <div id="home" style={{ position: 'absolute', top: '-100vh', visibility: 'hidden' }} />

        <div id="theme"><ThemeDetails /></div>
        <div id="speakers"><SpeakerSection /></div>
        <div id="tickets"><TicketSection /></div>
        <div id="team"><TeamSection /></div>
        <div id="contact"><ContactSection /></div>
      </div>
    </>
  )
}
