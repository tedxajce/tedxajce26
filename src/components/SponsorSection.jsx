import React from 'react'

const styles = `
  .sponsors-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 0;
    gap: 2rem;
  }
  .sponsors-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sponsors-subtitle {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
  }
  .sponsors-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
  }
  .sponsor-card {
    width: 280px;
    height: 160px;
    background: rgba(10, 10, 10, 0.95);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease, border-color 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .sponsor-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 42, 42, 0.4);
  }
  .sponsor-card-text {
    color: rgba(255,255,255,0.3);
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 1;
  }
  .sponsor-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (max-width: 768px) {
    .sponsors-container {
      gap: 2rem;
    }
    .sponsors-grid {
      gap: 1.5rem;
    }
  }
`;

export default function SponsorSection() {
  return (
    <div className="section-padding" style={{
      width: '100%',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4rem 2rem',
      position: 'relative',
      zIndex: 50,
      pointerEvents: 'auto'
    }}>
      <style>{styles}</style>

      <h2 style={{
        color: 'white',
        fontSize: '3.5rem',
        fontWeight: '300',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        margin: '0 0 2rem 0',
        textAlign: 'center'
      }}>
        <span style={{ color: '#ff2a2a', fontWeight: '800' }}>Sponsors</span>
      </h2>

      <div className="sponsors-container">
        {/* Top Section: Ticket Partners */}
        <div className="sponsors-section">
          <h3 className="sponsors-subtitle">Ticket Partner</h3>
          <div className="sponsors-grid">
            <div className="sponsor-card">
              <img src={`${import.meta.env.BASE_URL}Bhavana.jpeg`} alt="Bhavana" className="sponsor-card-img" />
            </div>
          </div>
        </div>

        {/* Bottom Section: Gifting Partners */}
        <div className="sponsors-section">
          <h3 className="sponsors-subtitle">Gifting Partners</h3>
          <div className="sponsors-grid">
            <a href="https://miraco.in/" target="_blank" rel="noopener noreferrer" className="sponsor-card">
              <img src={`${import.meta.env.BASE_URL}Miraco.jpeg`} alt="Miraco" className="sponsor-card-img" />
            </a>
            <div className="sponsor-card">
              <img src={`${import.meta.env.BASE_URL}Dealix.jpeg`} alt="Dealix" className="sponsor-card-img" />
            </div>
            <a href="https://www.instagram.com/therealajin" target="_blank" rel="noopener noreferrer" className="sponsor-card">
              <img src={`${import.meta.env.BASE_URL}Nutrinnno.png`} alt="Nutrinnno" className="sponsor-card-img" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
