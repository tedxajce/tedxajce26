import React, { useState, useRef } from 'react'

const vectorAvatarFallback = `data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%231a1a1a" /><circle cx="50" cy="35" r="20" fill="%232b2b2b" /><path d="M20 100 C 20 60, 80 60, 80 100" fill="%232b2b2b" /></svg>`

const speakersData = [
  { id: 2, name: 'Anoop Ambika', role: 'KSUM', img: import.meta.env.BASE_URL + 'Anoop-Mookambika.jpg', bio: 'Anoop Ambika, part of Kerala Startup Mission (KSUM), fuels entrepreneurial growth. He empowers startups, shaping India\'s innovation ecosystem.' },
  { id: 3, name: 'Asif Muhammad', role: 'Techiewizard', img: import.meta.env.BASE_URL + 'Asif-Muhammed.N.jpg', bio: 'Asif Muhammad is a tech expert transforming ideas into reality. His innovations impact industries and communities alike.' },
  { id: 4, name: 'Tapesh & Prachi', role: 'Pilots', img: import.meta.env.BASE_URL + 'Tapesh&Prachi.jpg', bio: 'Tapesh Kumar (world\'s youngest airline captain at 25 & "Boeing Boy" YouTuber) and Prachi Goswami (commercial pilot & former national swimmer) are a dynamic speaker duo known for their inspiring stories on conquering chaos.' },
  { id: 5, name: 'Abna', role: 'National level sports person', img: import.meta.env.BASE_URL + 'Abna.jpg', bio: 'She is a dedicated Indian athlete and Asian-level medalist, with a bronze at the World Skate Games 2024 in Italy and 13 national medals in skating—5 gold, 4 silver, 4 bronze. A national-level athletics gold medalist and multi-time All India Inter University podium finisher, I’m driven to represent India with discipline and excellence on international platforms.' },
  { id: 7, name: 'Dr. Elizabeth George', role: 'RF Engineer and Deep Tech Enterpreneur', img: import.meta.env.BASE_URL + 'Dr._Elizabeth_George.jpeg', bio: 'Co-founder and RF Solutions Architect at Xark Technologies, developing high-performance MMIC and RF front-end solutions for defense, space, and advanced communication systems, bridging system architecture with real-world requirements. With a PhD from IIST and postdoc at Digital University Kerala.' },
  { id: 8, name: 'George Pullikan', role: 'Journalist', img: import.meta.env.BASE_URL + 'George_Pullikan.jpeg', bio: 'George Pullikkan is a seasoned media and communications professional known for his impactful work in storytelling and public engagement. He has played a key role in shaping narratives across platforms, bringing clarity and depth to complex ideas.' },
  { id: 9, name: 'Shwetha Jayaram', role: 'Model, Entrepreneur and Trainer', img: import.meta.env.BASE_URL + 'swetha.jpeg', bio: 'Shwetha Jayaram, the finalist in Vanitha Miss Kerala 2025 elaborates her commitment to and love for modeling. From a young age, she has been driven by a passion for modeling.A distinguished model, entrepreneur, and trainer, your journey stands as a testament to the power of storytelling, knowledge, and communication.' }
]

function SpeakerCard({ speaker }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
    >
      {/* 3D Flip Card Container */}
      <div style={{
        perspective: '1500px',
        width: '320px',
        height: '420px',
        marginBottom: '2rem'
      }}>
        {/* Flip Inner Engine */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transformStyle: 'preserve-3d',
          transform: hovered ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}>

          {/* FRONT OF CARD */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'rgba(10, 10, 10, 0.5)',
            backdropFilter: 'blur(30px)',
            borderRadius: '35px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            overflow: 'hidden', // Clips oversized image widths
            backgroundImage: `url(${import.meta.env.BASE_URL}securedoodle.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}>
            <img
              src={speaker.img || vectorAvatarFallback}
              alt={speaker.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* BACK OF CARD (Bio text) */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'rgba(20, 20, 20, 0.95)',
            backdropFilter: 'blur(30px)',
            borderRadius: '35px',
            border: '1px solid rgba(255, 42, 42, 0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem 1.8rem',
            textAlign: 'justify',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{speaker.name}</h3>
            <div style={{ width: '40px', height: '2px', minHeight: '2px', background: '#ff2a2a', marginBottom: '1rem' }}></div>
            <div className="hide-scrollbar" style={{ overflowY: 'auto', width: '100%' }}>
              <p style={{ color: '#cccccc', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                {speaker.bio}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Name Tag Attachment (Moved Underneath the card as requested) */}
      <div style={{
        border: '1px solid rgba(255, 42, 42, 0.4)',
        borderRadius: '20px',
        padding: '1rem 2rem',
        background: 'rgba(5,5,5,0.8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%'
      }}>
        <span style={{
          color: 'white',
          fontSize: '1.4rem',
          fontWeight: '800',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          textAlign: 'center'
        }}>
          {speaker.name}
        </span>
        <span style={{ color: '#ff2a2a', fontSize: '0.9rem', marginTop: '0.5rem', letterSpacing: '1px', textAlign: 'center' }}>
          {speaker.role}
        </span>
      </div>

    </div>
  )
}

export default function SpeakerSection() {
  const scrollRef = useRef()
  const isHovered = useRef(false)

  // Duplicated enough data points to establish a stable repeating loop
  const infiniteSpeakers = [...speakersData, ...speakersData, ...speakersData, ...speakersData]

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId;
    const scroll = () => {
      if (!isHovered.current) {
        el.scrollLeft += 2.5; // increased pixel scroll velocity
        if (el.scrollLeft >= el.scrollWidth / 4) {
          el.scrollLeft -= el.scrollWidth / 4;
        }
      }
      animId = requestAnimationFrame(scroll);
    }
    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="section-padding" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 0',
      zIndex: 50,
      pointerEvents: 'auto'
    }}>

      {/* Title Header */}
      <h2 className="responsive-title" style={{
        color: 'white',
        fontSize: '3rem',
        fontWeight: '300',
        letterSpacing: '4px',
        marginBottom: '6rem',
        textAlign: 'center'
      }}>
        Our Speakers
      </h2>

      {/* Grid mapping all speakers horizontally */}
      <div style={{ position: 'relative', width: '100%' }}>

        <div
          ref={scrollRef}
          className="hide-scrollbar"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            overflowX: 'auto', // Keep native scroll functionality available but hide scrollbars
            gap: '4rem',
            padding: '1rem 0'
          }}
        >
          {infiniteSpeakers.map((speaker, index) => (
            <div
              key={`${speaker.id}-${index}`}
              style={{ flexShrink: 0 }}
              onMouseEnter={() => { isHovered.current = true; }}
              onMouseLeave={() => { isHovered.current = false; }}
            >
              <SpeakerCard speaker={speaker} />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
