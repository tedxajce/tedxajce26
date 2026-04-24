import React, { useState } from 'react'

const responsiveStyles = `
  .team-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    width: 350px;
    box-sizing: border-box;
  }
  .team-card-img-container {
    width: 320px;
    height: 420px;
    margin-bottom: 2rem;
  }
  .team-card-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background: rgba(10, 10, 10, 0.95);
    border-radius: 35px;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    overflow: hidden;
  }
  .team-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3rem;
    width: 100%;
  }
  .team-name-tag {
    border: 1px solid rgba(255, 42, 42, 0.4);
    border-radius: 20px;
    padding: 1rem 2rem;
    background: rgba(5,5,5,0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }
  .team-name-text {
    color: white;
    font-size: 1.0rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    word-break: break-word;
    padding: 0 0.5rem;
  }
  .team-role-text {
    color: #ff2a2a;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
  }

  @media (max-width: 768px) {
    .team-row {
      gap: 1rem;
    }
    .team-card-wrapper {
      width: calc(50% - 0.5rem);
      padding: 0;
    }
    .team-card-img-container {
      width: 100%;
      height: 220px;
      margin-bottom: 1rem;
    }
    .team-card-inner {
      border-radius: 20px;
    }
    .team-name-tag {
      padding: 0.6rem 0.2rem;
      border-radius: 12px;
    }
    .team-name-text {
      font-size: 0.65rem;
      letter-spacing: 0px;
    }
    .team-role-text {
      font-size: 0.55rem;
      margin-top: 0.25rem;
      letter-spacing: 0px;
    }
  }
`;
const vectorAvatarFallback = `data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%231a1a1a" /><circle cx="50" cy="35" r="20" fill="%232b2b2b" /><path d="M20 100 C 20 60, 80 60, 80 100" fill="%232b2b2b" /></svg>`

const teamArchitecture = [
   // ROW 1
   [
      { name: "Shivani Vijayaraghavan", role: "Organizer", img: "shivanivijayaraghavan.jpg" },
      { name: "Alan Biju", role: "Co-Organizer", img: "Alan.jpeg" },
      { name: "Josu Denny", role: "Production Lead", img: "Josu Denny.jpeg" }
   ],
   // ROW 2
   [
      { name: "Abel Biju George", role: "Marketing Lead", img: "Abel_Biju_George.jpeg" },
      { name: "Rebecca Mary Varughese", role: "Curation Lead", img: "Rebecca Mary Varughese.jpeg" },
      { name: "Neha Biju", role: "Editorial Lead", img: "Neha.jpeg" }
   ],
   // ROW 3
   [
      { name: "Bava Kurian", role: "Web Lead", img: "Bava Kurian.jpeg" },
      { name: "Vidyasagar R", role: "Web Co-Lead", img: "Vidya.jpeg" },
      { name: "Neil Abraham", role: "Media Lead", img: "Neil_Abraham.jpeg" }
   ]
]

// Native clone of SpeakerCard bounding box rules mapped specifically for .jpg photographs
function TeamCard({ member }) {
   const imageSrc = member.img ? `${import.meta.env.BASE_URL}${member.img}` : vectorAvatarFallback

   return (
      <div className="team-card-wrapper">
         {/* Card Container */}
         <div className="team-card-img-container">
            <div style={{
               position: 'relative',
               width: '100%',
               height: '100%'
            }}>

               {/* FRONT OF CARD -> Fills entirely with JPEG asset */}
               <div className="team-card-inner">
                  <img
                     src={imageSrc}
                     alt={`${member.name} - ${member.role} of TEDxAJCE 2026`}
                     style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                        opacity: 0.92,
                        transition: 'opacity 0.3s ease, transform 0.3s ease'
                     }}
                     loading="lazy"
                  />
               </div>

            </div>
         </div>

         {/* Floating Detached Name Tag Attachment */}
         <div className="team-name-tag">
            <span className="team-name-text">
               {member.name}
            </span>
            <span className="team-role-text">
               {member.role}
            </span>
         </div>

      </div>
   )
}

export default function TeamSection() {
   return (
      <div className="section-padding" style={{
         width: '100%',
         minHeight: '100vh',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         padding: '4rem 2rem',
         position: 'relative',
         zIndex: 50,
         pointerEvents: 'auto'
      }}>

         <style>{responsiveStyles}</style>

         {/* Title Header explicitly unbound from wrapper bounds */}
         <h2 style={{
            color: 'white',
            fontSize: '3.5rem',
            fontWeight: '300',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            margin: '0 0 6rem 0',
            textAlign: 'center'
         }}>
            Our <span style={{ color: '#ff2a2a', fontWeight: '800' }}>Team</span>
         </h2>

         {/* Grid Execution tracking explicitly 2, 3, 3 formatting requested */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', maxWidth: '1400px', alignItems: 'center' }}>

            {teamArchitecture.map((rowArr, rowIndex) => (
               <div
                  key={`row-${rowIndex}`}
                  className="team-row"
               >
                  {rowArr.map((member, memberIndex) => (
                     <TeamCard key={`member-${memberIndex}`} member={member} />
                  ))}
               </div>
            ))}

         </div>
      </div>
   )
}
