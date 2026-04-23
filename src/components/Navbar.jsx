import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 5.2
      if (window.scrollY > threshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsMenuOpen(false) // Auto-close menu if we scroll back up
      }
    }
    
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Theme', id: 'theme' },
    { label: 'Speakers', id: 'speakers' },
    { label: 'Contact', id: 'contact' }
  ]

  return (
    <>
      <nav className="navbar" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: isMenuOpen ? 'transparent' : 'rgba(5, 5, 5, 0.4)',
        backdropFilter: isMenuOpen ? 'none' : 'blur(15px)',
        borderBottom: isMenuOpen ? 'none' : '1px solid rgba(255, 42, 42, 0.15)',
        boxShadow: isMenuOpen ? 'none' : '0 4px 30px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
        pointerEvents: isVisible ? 'auto' : 'none',
        zIndex: 1005 
      }}>
        
        {/* Logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <a href="#" onClick={(e) => handleNavClick(e, 'home')} style={{ textDecoration: 'none' }}>
             <h1 className="navbar-logo" style={{ 
                margin: 0, 
                color: 'white', 
                fontSize: '1.4rem', 
                fontWeight: '900', 
                letterSpacing: '3px',
                textTransform: 'uppercase'
             }}>
                TEDxAJCE
             </h1>
          </a>
        </div>

        {/* Desktop Register Button */}
        <div className="desktop-register" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <a 
            href="#register"
            onClick={(e) => handleNavClick(e, 'tickets')}
            style={{
              background: 'linear-gradient(135deg, #ff2a2a 0%, #a00000 100%)',
              color: '#fff',
              padding: '0.7rem 2.8rem',
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textDecoration: 'none',
              border: '1px solid rgba(255,100,100,0.5)',
              boxShadow: '0 8px 20px rgba(255, 42, 42, 0.3), inset 0 2px 2px rgba(255,255,255,0.4)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            Register Now
          </a>
        </div>

        {/* Desktop Links */}
        <div className="nav-links-desktop" style={{ flex: 1, justifyContent: 'flex-end' }}>
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ff2a2a'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="mobile-menu-trigger" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div className={`mobile-overlay ${isMenuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="mobile-nav-link"
            onClick={(e) => handleNavClick(e, link.id)}
          >
            {link.label}
          </a>
        ))}
        <a 
          href="#register"
          className="mobile-nav-link"
          style={{ color: '#ff2a2a', marginTop: '1rem' }}
          onClick={(e) => handleNavClick(e, 'tickets')}
        >
          Register
        </a>
      </div>
    </>
  )
}
