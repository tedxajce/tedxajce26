import React, { useState, useRef } from 'react'

const vectorAvatarFallback = `data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%231a1a1a" /><circle cx="50" cy="35" r="20" fill="%232b2b2b" /><path d="M20 100 C 20 60, 80 60, 80 100" fill="%232b2b2b" /></svg>`

const speakersData = [
  { id: 1, name: 'Prem Krishnan S IAS', role: 'District Collector, Pathanamthitta', img: import.meta.env.BASE_URL + 'Shri_Prem_Krishnan_S.jpeg', bio: 'Shri Prem Krishnan S IAS is a 2017-batch Kerala cadre officer serving as the 38th District Collector of Pathanamthitta since March 4, 2024. Known for tech-driven governance and youth outreach, he launched initiatives like the Sabarimala “Swami” WhatsApp chatbot, Project Roots for civic education, and the ‘Swap Your Screen for a Sport’ campaign to promote outdoor play.' },
  { id: 2, name: 'Anoop Ambika', role: 'KSUM', img: import.meta.env.BASE_URL + 'Anoop-Mookambika.jpg', bio: 'Anoop Ambika, part of Kerala Startup Mission (KSUM), fuels entrepreneurial growth. He empowers startups, shaping India\'s innovation ecosystem.' },
  { id: 3, name: 'Asif Muhammad', role: 'Techiewizard', img: import.meta.env.BASE_URL + 'Asif-Muhammed.N.jpg', bio: 'Asif Muhammad is a tech expert transforming ideas into reality. His innovations impact industries and communities alike.' },
  { id: 4, name: 'Manik Mehta', role: 'Former Indian Navy Commander and Fighter Pilot', img: import.meta.env.BASE_URL + 'Manik_Mehta.jpeg', bio: 'Manik Mehta is a former Indian Navy Commander and fighter pilot turned stand-up comedian, whose journey blends discipline with humor. With a distinguished career in naval aviation and experience mentoring aspiring pilots, he now also flies commercially while captivating audiences on stage. Since 2015, Manik has been crafting comedy drawn from real-life experiences, connecting deeply with audiences and bringing laughter across diverse platforms.' },
  { id: 7, name: 'Dr. Elizabeth George', role: 'RF Engineer and Deep Tech Enterpreneur', img: import.meta.env.BASE_URL + 'Dr._Elizabeth_George.jpeg', bio: 'Co-founder and RF Solutions Architect at Xark Technologies, developing high-performance MMIC and RF front-end solutions for defense, space, and advanced communication systems, bridging system architecture with real-world requirements. With a PhD from IIST and postdoc at Digital University Kerala.' },
  { id: 8, name: 'George Pullikan', role: 'Journalist', img: import.meta.env.BASE_URL + 'George_Pullikan.jpeg', bio: 'George Pullikkan is a seasoned media and communications professional known for his impactful work in storytelling and public engagement. He has played a key role in shaping narratives across platforms, bringing clarity and depth to complex ideas.' },
  { id: 9, name: 'Shwetha Jayaram', role: 'Model, Entrepreneur and Trainer', img: import.meta.env.BASE_URL + 'swetha.jpeg', bio: 'Shwetha Jayaram, the finalist in Vanitha Miss Kerala 2025 elaborates her commitment to and love for modeling. From a young age, she has been driven by a passion for modeling.A distinguished model, entrepreneur, and trainer, your journey stands as a testament to the power of storytelling, knowledge, and communication.' },
  { id: 10, name: 'Rahul Ramachandran', role: 'Film Director and Scriptwriter', img: import.meta.env.BASE_URL + 'Rahul_Ramachandran.jpeg', bio: 'Rahul Ramachandran is an Indian film director and scriptwriter in the Malayalam industry, known for his debut feature Jeem Boom Bhaa (2019) and the IDSFFK-selected short film ADAM. Since starting with short films in 2017, he has announced projects like SG 251 with Suresh Gopi and married actress Sreevidya Mullachery in September 2024.' }
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
              alt={`${speaker.name} - Speaker at TEDxAJCE 2026: ORIGIN`}
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

  // Duplicated data points to establish a stable repeating loop
  // Using 3 copies to implement a more robust middle-reset infinite scroll
  const infiniteSpeakers = [...speakersData, ...speakersData, ...speakersData]

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId;
    let lastTime = performance.now();
    // Initialize with current scroll position to handle initial state or manual changes
    let currentScrollPos = el.scrollLeft;

    const scroll = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (!isHovered.current) {
        const pixelsPerSecond = 150; // Smooth, steady pace

        // Calculate the exact width of one complete set of speakers including gaps
        // We do this inside the loop to handle window resizing or dynamic content
        if (el.children.length >= speakersData.length * 2) {
          const firstItem = el.children[0];
          const secondSetFirstItem = el.children[speakersData.length];
          const cycleWidth = secondSetFirstItem.offsetLeft - firstItem.offsetLeft;

          if (cycleWidth > 0) {
            // If we're at 0 (start), jump to the middle set for a seamless start
            if (currentScrollPos <= 0) {
              currentScrollPos = cycleWidth;
            }

            currentScrollPos += (pixelsPerSecond * deltaTime) / 1000;

            // Reset when we've scrolled past the second set
            // The jump is invisible because the content at cycleWidth is identical to cycleWidth * 2
            if (currentScrollPos >= cycleWidth * 2) {
              currentScrollPos -= cycleWidth;
            }

            el.scrollLeft = currentScrollPos;
          }
        }
      } else {
        // Sync our tracking variable with the actual scroll position if user is manual scrolling
        currentScrollPos = el.scrollLeft;
      }

      animId = requestAnimationFrame(scroll);
    };

    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, [speakersData.length]);

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
