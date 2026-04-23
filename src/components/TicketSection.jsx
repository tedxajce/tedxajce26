import React, { useState, useRef } from 'react'

export default function TicketSection() {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (centerY - y) / 35 // Much more subtle tilt
    const rotateY = (x - centerX) / 35
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  }

  return (
    <div className="section-padding" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 2rem',
      zIndex: 50,
      pointerEvents: 'auto',
      overflow: 'visible'
    }}>
      <style>{`
        .ticket-container {
          width: 100%;
          max-width: 900px;
          height: 400px;
          display: flex;
          background: rgba(15, 15, 15, 0.75);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 42, 42, 0.2);
          border-radius: 20px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          position: relative;
          transition: transform 0.1s ease-out;
          transform-style: preserve-3d;
          overflow: hidden;
        }

        /* Ticket Cutouts */
        .ticket-container::before,
        .ticket-container::after {
          content: "";
          position: absolute;
          width: 40px;
          height: 40px;
          background: #000; /* Match body background */
          border-radius: 50%;
          left: 70%;
          margin-left: -20px;
          z-index: 2;
        }
        .ticket-container::before { top: -20px; box-shadow: inset 0 -5px 10px rgba(255,42,42,0.1); }
        .ticket-container::after { bottom: -20px; box-shadow: inset 0 5px 10px rgba(255,42,42,0.1); }

        .ticket-main {
          flex: 7;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 2px dashed rgba(255, 42, 42, 0.3);
          position: relative;
        }

        .ticket-stub {
          flex: 3;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 42, 42, 0.03);
        }

        .ticket-tag {
          font-size: 0.75rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #ff2a2a;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .ticket-title {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1;
          margin: 0;
          color: #fff;
        }

        .ticket-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        .info-item label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #888;
          margin-bottom: 0.3rem;
        }

        .info-item span {
          font-size: 1.1rem;
          color: #fff;
          font-weight: 600;
        }

        .qr-placeholder {
          width: 120px;
          height: 120px;
          background: #fff;
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stub-id {
          font-family: monospace;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 2px;
          transform: rotate(-90deg) translateX(-20px);
          position: absolute;
          right: -30px;
          top: 50%;
        }

        .book-button {
          background: #ff2a2a;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(255, 42, 42, 0.3);
          text-decoration: none;
          display: inline-block;
          margin-top: 1rem;
        }

        .book-button:hover {
          transform: scale(1.05);
          background: #ff4a4a;
          box-shadow: 0 15px 30px rgba(255, 42, 42, 0.5);
        }

        @media (max-width: 768px) {
          .ticket-container {
            flex-direction: column;
            height: auto;
            max-width: 350px;
          }
          .ticket-container::before, .ticket-container::after {
            left: 50%;
            top: 70%;
            margin-left: -20px;
          }
          .ticket-container::before { left: -20px; top: 70%; }
          .ticket-container::after { right: -20px; top: 70%; left: auto; }
          .ticket-main {
            border-right: none;
            border-bottom: 2px dashed rgba(255, 42, 42, 0.3);
            padding: 2rem;
          }
          .ticket-title { font-size: 2.5rem; }
        }
      `}</style>

      <div 
        ref={cardRef}
        className="ticket-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Section */}
        <div className="ticket-main">
          <div>
            <div className="ticket-tag">TEDxAJCE 2026 • ORIGIN</div>
            <h2 className="ticket-title">ADMIT<br /><span style={{color: '#ff2a2a'}}>ONE</span></h2>
          </div>

          <div className="ticket-info-grid">
            <div className="info-item">
              <label>Date</label>
              <span>MAY 02, 2026</span>
            </div>
            <div className="info-item">
              <label>Venue</label>
              <span>Amal Jyothi College</span>
            </div>
            <div className="info-item">
              <label>Time</label>
              <span>09:00 AM IST</span>
            </div>
            <div className="info-item">
              <label>Seat</label>
              <span>GENERAL ACCESS</span>
            </div>
          </div>
        </div>

        {/* Stub Section */}
        <div className="ticket-stub">
          <div className="qr-placeholder">
            <svg viewBox="0 0 100 100" style={{width: '100%', height: '100%'}}>
              <rect width="100" height="100" fill="white" />
              <path d="M10 10h20v5h-15v15h-5zM70 10h20v20h-5v-15h-15zM10 70h5v15h15v5h-20zM70 90h20v-20h-5v15h-15z" fill="black" />
              <rect x="25" y="25" width="10" height="10" />
              <rect x="65" y="25" width="10" height="10" />
              <rect x="25" y="65" width="10" height="10" />
              <rect x="45" y="45" width="10" height="10" />
              <rect x="55" y="55" width="10" height="10" />
              <rect x="35" y="35" width="10" height="10" />
            </svg>
          </div>
          <a href="#register" className="book-button">BOOK NOW</a>
          <div className="stub-id">#ORIGIN-2026-TX</div>
        </div>
      </div>
      
      <p style={{marginTop: '3rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase'}}>
        Move mouse over ticket to interact
      </p>
    </div>
  )
}
