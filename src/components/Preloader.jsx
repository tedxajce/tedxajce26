import React, { useEffect, useState } from 'react';
import './Preloader.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1. Lock window scroll to prevent weird GSAP interpolation before scene loads
    document.body.style.overflow = 'hidden';

    // 2. Start graceful visual fade out slightly early to match the progress bar
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // 3. Fully unmount component and strictly restore global scroll state
    const unmountTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = ''; 
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <div className="preloader-logo-container">
          <h1 className="preloader-title">TEDx<span style={{ color: '#ff2a2a' }}>AJCE</span></h1>
          <div className="preloader-glitch-layer">TEDx<span style={{ color: '#ff2a2a' }}>AJCE</span></div>
          <div className="preloader-glitch-layer offset">TEDx<span style={{ color: '#ff2a2a' }}>AJCE</span></div>
        </div>
        
        <div className="preloader-loader-bar">
          <div className="preloader-progress"></div>
        </div>
        
        <div className="preloader-tagline">Initializing WebGL Experience...</div>
      </div>
    </div>
  );
}
