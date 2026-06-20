import React from 'react';
import { motion } from 'framer-motion';

const F = {
  gothic: "'League Gothic', sans-serif",
  arimo:  "'Arimo', sans-serif",
  white:  "#F7F6ED",
  dim:    "rgba(247,246,237,0.52)",
  dimBr:  "rgba(247,246,237,0.85)",
  border: "rgba(247,246,237,0.08)",
  dimRed: "rgba(247,246,237,0.4)"
};

const AdvisorCard: React.FC<{
  name: string;
  role: string;
  details: string;
  delay: number;
}> = ({ name, role, details, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    style={{
      border: `1px solid ${F.border}`,
      padding: '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(8,8,8,0.5)',
      backdropFilter: 'blur(8px)',
      borderRadius: '8px',
      height: '100%',
      boxSizing: 'border-box'
    }}
    whileHover={{
      borderColor: 'rgba(247,246,237,0.18)',
      background: 'rgba(12,12,12,0.85)',
    }}
    // @ts-ignore
    transition2={{ duration: 0.35 }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Name */}
      <h3 style={{
        fontFamily: F.gothic,
        fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: F.white,
        fontWeight: 'normal',
        lineHeight: 1.0,
        margin: '0 0 6px 0',
      }}>
        {name}
      </h3>

      {/* Role */}
      <p style={{
        fontFamily: F.arimo,
        fontSize: '9px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: F.dimRed,
        margin: '0 0 12px 0',
        fontWeight: 400,
        textAlign: 'center',
      }}>
        {role}
      </p>

      {/* Divider */}
      <div style={{ width: '100%', height: 1, background: 'rgba(247,246,237,0.06)', marginBottom: 12 }} />

      {/* Bio */}
      <p style={{
        fontFamily: F.arimo,
        fontSize: '11px',
        lineHeight: 1.6,
        color: F.dim,
        margin: 0,
        fontWeight: 400,
        flexGrow: 1,
      }}>
        {details}
      </p>
    </div>
  </motion.div>
);

interface AdvisorsHudProps {
  title?: string;
  text: string;
}

const AdvisorsHud: React.FC<AdvisorsHudProps> = ({ title, text }) => {
  const advisors = text.split(';;').map(block => {
    const parts = block.split('|').map(s => s.trim());
    return { name: parts[0], role: parts[1], details: parts.slice(2).join(' ').trim() };
  });

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px'
    }}>
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        style={{
          fontFamily: F.gothic,
          fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: F.white,
          fontWeight: 'normal',
          margin: '0 0 40px 0',
          textAlign: 'center',
          lineHeight: 1,
        }}
      >
        {title || 'ASESORES & EARLY USERS'}
      </motion.h1>

      {/* Cards Grid */}
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          width: '100%',
        }}>
          {advisors.map((a, i) => (
            <AdvisorCard
              key={i}
              name={a.name}
              role={a.role}
              details={a.details}
              delay={0.1 + i * 0.05}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvisorsHud;
