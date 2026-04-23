import React from 'react'

const ContactItem = ({ icon, text, subtext, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        textDecoration: 'none',
        color: '#ffffff',
        padding: '0.5rem 0',
        transition: 'transform 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(10px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)' }}
    >
      <div style={{
        width: '45px',
        height: '45px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255, 42, 42, 0.1)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 42, 42, 0.3)'
      }}>
        {icon}
      </div>
      <div>
        {subtext && <div style={{ fontSize: '0.85rem', color: '#aaaaaa', marginBottom: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>{subtext}</div>}
        <div style={{ fontSize: '1.15rem', fontWeight: '400', letterSpacing: '0.5px', lineHeight: '1.4' }}>{text}</div>
      </div>
    </a>
  )
}

export default function ContactSection() {
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
      pointerEvents: 'auto'
    }}>

      {/* Title Header */}
      <h2 style={{
        color: 'white',
        fontSize: '3rem',
        fontWeight: '300',
        letterSpacing: '4px',
        marginBottom: '6rem',
        textAlign: 'center'
      }}>
        Connect with <span style={{ color: '#ff2a2a', fontWeight: '800' }}>TEDxAJCE</span>
      </h2>

      {/* Main Container */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexWrap: 'wrap', // Naturally stacks on mobile
        gap: '3rem',
        justifyContent: 'center'
      }}>

        {/* Left Side: Detail Context */}
        <div style={{
          flex: '1 1 500px',
          background: 'rgba(5, 5, 5, 0.4)',
          backdropFilter: 'blur(20px)',
          borderRadius: '35px',
          padding: '4rem 3rem',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem'
        }}>
          <h3 style={{ color: '#dddddd', fontSize: '1.8rem', letterSpacing: '2px', marginBottom: '1rem', fontWeight: '300' }}>Details of contact</h3>

          {/* Mail */}
          <ContactItem
            href="mailto:tedxajce@amaljyothi.ac.in"
            subtext="Mail ID"
            text="tedxajce@amaljyothi.ac.in"
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff2a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>}
          />

          {/* Phone */}
          <ContactItem
            href="https://wa.me/918714871397"
            subtext="Contact"
            text="+91 87148 71397"
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff2a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>}
          />

          {/* Instagram */}
          <ContactItem
            href="https://instagram.com/tedx_ajce"
            subtext="Instagram"
            text="@tedx_ajce"
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff2a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>}
          />

          {/* YouTube */}
          <ContactItem
            href="https://youtube.com/@tedxajce"
            subtext="YouTube"
            text="tedxajce"
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff2a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>}
          />

          {/* Location */}
          <ContactItem
            href="https://maps.google.com/maps?q=Amal%20Jyothi%20College%20of%20Engineering"
            subtext="Location"
            text="Amal Jyothi College of Engineering, Kanjirappally, Kottayam."
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff2a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>}
          />
        </div>

        {/* Right Side: Map Context */}
        <div style={{
          flex: '1 1 500px',
          minHeight: '400px',
          background: 'rgba(5, 5, 5, 0.4)',
          backdropFilter: 'blur(20px)',
          borderRadius: '35px',
          border: '1px solid rgba(255, 42, 42, 0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <iframe
            src="https://maps.google.com/maps?q=Amal%20Jyothi%20College%20of%20Engineering&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{
              border: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // Natively inverts the Google Maps bright styling to a beautiful deep dark mode
              filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(85%)'
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>

      </div>
    </div>
  )
}
