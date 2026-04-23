import React from 'react'

export default function ThemeDetails() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      pointerEvents: 'auto'
    }}>
      <style>{`
        .theme-details-box {
          width: 90%;
          max-width: 1200px;
          background: rgba(5, 5, 5, 0.3);
          backdrop-filter: blur(25px);
          border-radius: 40px;
          box-shadow: 0 -20px 80px rgba(0,0,0,0.9);
          display: flex;
          flex-direction: column;
          padding: 4rem 5rem;
          color: white;
          border: 1px solid rgba(255, 42, 42, 0.1);
          box-sizing: border-box;
        }
        .theme-inner {
          display: flex;
          flex-direction: row;
          gap: 4rem;
          align-items: stretch;
        }
        .theme-divider {
          width: 2px;
          flex-shrink: 0;
          background: linear-gradient(to bottom, transparent 0%, #ff2a2a 50%, transparent 100%);
          opacity: 0.8;
        }
        .theme-logo-box {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .theme-text-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .theme-details-box {
            padding: 2.5rem 1.5rem !important;
          }
          .theme-inner {
            flex-direction: column;
            gap: 2rem;
          }
          .theme-divider {
            width: 100% !important;
            height: 2px;
            background: linear-gradient(to right, transparent 0%, #ff2a2a 50%, transparent 100%);
          }
          .theme-logo-box {
            order: -1;
          }
        }
      `}</style>

      <div className="theme-details-box">
        <h1 style={{
          textAlign: 'center',
          margin: '0 0 3.5rem 0',
          fontWeight: '300',
          letterSpacing: '4px',
          fontSize: '3rem'
        }}>
          Our Theme: <span style={{ color: '#ff2a2a', fontWeight: '800' }}>ORIGIN</span>
        </h1>

        <div className="theme-inner">

          {/* Left: Text — goes BELOW logo on mobile */}
          <div className="theme-text-box">
            <p style={{ fontSize: '1.25rem', lineHeight: '2', color: '#dddddd', marginBottom: '2rem' }}>
              Every great idea, profound movement, and massive human achievement
              traces back to a single, chaotic spark of conception. It is the beginning
              of the journey before structure even exists.
            </p>
            <p style={{ fontSize: '1.25rem', lineHeight: '2', color: '#aaaaaa' }}>
              At TEDxAJCE 2026, we explore these foundations of innovation. We are
              peeling back the layers of our rapidly advancing world to unearth the
              raw, unfiltered beginnings of tomorrow's solutions. Wait with us.
            </p>
          </div>

          {/* Divider — vertical on desktop, horizontal on mobile */}
          <div className="theme-divider"></div>

          {/* Right: Logo — moves to TOP on mobile via order: -1 */}
          <div className="theme-logo-box">
            <img
              src={import.meta.env.BASE_URL + "tedl.png"}
              alt="TEDxAJCE 2026 Logo"
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                mixBlendMode: 'screen',
                filter: 'contrast(1.2)'
              }}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
