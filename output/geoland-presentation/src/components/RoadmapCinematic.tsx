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

const PHASE1 = {
  tag: 'HOY · FASE 01',
  title: 'VALIDACIÓN PRIVADA',
  sub: 'MES 6',
  stat: '4',
  statLabel: 'CIUDADES EN VALIDACIÓN',
  statSub: 'Beta testers probando el sistema en mercados seleccionados.',
  items: [
    { title: 'MOTOR DE DECISIÓN', sub: 'Comparación de locaciones por variables reales.' },
    { title: 'EARLY USERS',       sub: 'Feedback operativo de producción.' },
  ],
};
const PHASE2 = {
  tag: 'PRÓXIMOS 6 MESES · FASE 02',
  title: 'APERTURA Y ESCALA',
  sub: 'GTM',
  arrow: { title: 'APERTURA AL MERCADO', sub: 'Oferta comercial para productoras fuera de la red inicial.' },
  items: [
    { title: 'EXPANSIÓN DE COBERTURA', sub: 'Más ciudades, datos y locaciones disponibles.' },
    { title: 'GO-TO-MARKET',           sub: 'Inicio de captación fuera de la red privada.' },
  ],
};

const PhaseCol: React.FC<{ phase: typeof PHASE1 | typeof PHASE2; delay: number }> = ({ phase, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    whileHover={{
      borderColor: 'rgba(247,246,237,0.18)',
      background: 'rgba(12,12,12,0.85)',
    }}
    // @ts-ignore
    transition2={{ duration: 0.35 }}
    style={{
      border: `1px solid ${F.border}`,
      padding: '32px 28px',
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(8,8,8,0.5)',
      backdropFilter: 'blur(8px)',
      height: '100%',
      boxSizing: 'border-box',
      borderRadius: '8px'
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <p style={{
        fontFamily: F.arimo, fontSize: '9px', letterSpacing: '0.38em',
        textTransform: 'uppercase', color: F.dimRed, margin: '0 0 8px 0'
      }}>
        {phase.tag}
      </p>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
        <h2 style={{
          fontFamily: F.gothic, fontSize: 'clamp(1.5rem,2.5vw,2.2rem)',
          textTransform: 'uppercase', letterSpacing: '0.05em', color: F.white,
          fontWeight: 'normal', margin: 0, lineHeight: 1
        }}>
          {phase.title}
        </h2>
        <span style={{
          fontFamily: F.arimo, fontSize: '10.5px', letterSpacing: '0.22em',
          color: 'rgba(247,246,237,0.4)', textTransform: 'uppercase'
        }}>
          {phase.sub}
        </span>
      </div>

      <div style={{ width: '100%', height: 1, background: 'rgba(247,246,237,0.06)', marginBottom: 20 }} />

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {'stat' in phase ? (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
            <span style={{
              fontFamily: F.gothic, fontSize: 'clamp(3.2rem,4.6vw,4rem)',
              color: F.white, lineHeight: 0.85, flexShrink: 0, letterSpacing: '-0.02em', fontWeight: 'normal'
            }}>
              {phase.stat}
            </span>
            <div style={{ paddingTop: 3 }}>
              <p style={{
                fontFamily: F.gothic, fontSize: 'clamp(0.71rem,1.15vw,0.94rem)',
                textTransform: 'uppercase', letterSpacing: '0.07em', color: F.dimBr,
                margin: '0 0 3px', fontWeight: 'normal'
              }}>
                {phase.statLabel}
              </p>
              <p style={{ fontFamily: F.arimo, fontSize: '11px', lineHeight: 1.5, color: F.dim, margin: 0 }}>
                {phase.statSub}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 4 }}>
              <line x1="2" y1="22" x2="22" y2="2" stroke="rgba(247,246,237,0.6)" strokeWidth="1.5" />
              <polyline points="10,2 22,2 22,14" stroke="rgba(247,246,237,0.6)" strokeWidth="1.5" fill="none" />
            </svg>
            <div>
              <p style={{
                fontFamily: F.gothic, fontSize: 'clamp(0.71rem,1.15vw,0.94rem)',
                textTransform: 'uppercase', letterSpacing: '0.07em', color: F.dimBr,
                margin: '0 0 3px', fontWeight: 'normal'
              }}>
                {phase.arrow?.title}
              </p>
              <p style={{ fontFamily: F.arimo, fontSize: '11px', lineHeight: 1.5, color: F.dim, margin: 0 }}>
                {phase.arrow?.sub}
              </p>
            </div>
          </div>
        )}

        <div style={{ flexGrow: 1, minHeight: 20 }} />

        {/* item box */}
        <div style={{
          position: 'relative',
          border: `1px solid rgba(247,246,237,0.06)`,
          background: 'rgba(0,0,0,0.15)',
          padding: '16px 18px',
          boxSizing: 'border-box',
          borderRadius: '4px'
        }}>
          {phase.items.map((item, i) => (
            <div key={i}>
              {i > 0 && <div style={{ width: '100%', height: 1, background: 'rgba(247,246,237,0.04)', margin: '12px 0' }} />}
              <p style={{
                fontFamily: F.gothic, fontSize: 'clamp(0.69rem,1.1vw,0.9rem)',
                textTransform: 'uppercase', letterSpacing: '0.07em', color: F.dimBr,
                margin: '0 0 4px', fontWeight: 'normal'
              }}>
                {item.title}
              </p>
              <p style={{ fontFamily: F.arimo, fontSize: '11px', lineHeight: 1.5, color: F.dim, margin: 0 }}>
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const RoadmapCinematic: React.FC<{ title?: string }> = ({ title }) => (
  <div style={{
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    background: '#000000',
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
        margin: '0 0 12px 0',
        textAlign: 'center',
        lineHeight: 1,
      }}
    >
      {title || 'ALCANCE OPERATIVO & ROADMAP'}
    </motion.h1>

    {/* Subtitle */}
    <p style={{
      fontFamily: F.arimo,
      fontSize: '10px',
      letterSpacing: '0.12em',
      color: 'rgba(247,246,237,0.4)',
      margin: '0 0 40px 0',
      textTransform: 'uppercase',
      textAlign: 'center',
      maxWidth: '650px',
      lineHeight: 1.5
    }}>
      Mes 6 · validación privada · primeros mercados testeados · apertura comercial en preparación
    </p>

    {/* Grid container */}
    <div style={{ width: '100%', maxWidth: '900px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1px 1fr',
        gap: '0 40px',
        width: '100%',
        alignItems: 'stretch',
      }}>
        <PhaseCol phase={PHASE1} delay={0.2} />

        <div style={{ width: 1, background: 'rgba(247,246,237,0.08)', alignSelf: 'stretch' }} />

        <PhaseCol phase={PHASE2} delay={0.3} />
      </div>
    </div>
  </div>
);

export default RoadmapCinematic;
