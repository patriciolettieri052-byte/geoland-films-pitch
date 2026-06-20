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

const ValidationCard: React.FC<{
  tag: string;
  title: string;
  statNumber: string;
  statLabel: string;
  subtext: string;
  delay: number;
}> = ({ tag, title, statNumber, statLabel, subtext, delay }) => (
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
        fontFamily: F.arimo, fontSize: '9px', letterSpacing: '0.3em',
        textTransform: 'uppercase', color: F.dimRed, margin: '0 0 8px 0'
      }}>
        {tag}
      </p>

      <h2 style={{
        fontFamily: F.gothic, fontSize: 'clamp(1.5rem,2.5vw,2.2rem)',
        textTransform: 'uppercase', letterSpacing: '0.05em', color: F.white,
        fontWeight: 'normal', margin: '0 0 16px 0', lineHeight: 1
      }}>
        {title}
      </h2>

      <div style={{ width: '100%', height: 1, background: 'rgba(247,246,237,0.06)', marginBottom: 20 }} />

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <span style={{
            fontFamily: F.gothic,
            fontSize: 'clamp(4rem, 6.5vw, 6rem)',
            color: F.white,
            lineHeight: 0.8,
            flexShrink: 0,
            letterSpacing: '-0.02em',
            fontWeight: 'normal',
          }}>
            {statNumber}
          </span>
          <div style={{ paddingTop: 2 }}>
            <p style={{
              fontFamily: F.gothic, fontSize: 'clamp(0.8rem,1.3vw,1.1rem)',
              textTransform: 'uppercase', letterSpacing: '0.07em', color: F.dimBr,
              margin: '0', fontWeight: 'normal', lineHeight: 1.1
            }}>
              {statLabel}
            </p>
          </div>
        </div>

        <p style={{
          fontFamily: F.arimo, fontSize: '11px', lineHeight: 1.6, color: F.dim, margin: 0
        }}>
          {subtext}
        </p>
      </div>
    </div>
  </motion.div>
);

const ValidationHud: React.FC = () => {
  return (
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
        VALIDACIÓN INICIAL
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
        Módulo de pruebas operativas privadas con productoras asociadas de mercados seleccionados
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
          <ValidationCard
            tag="BETA NETWORK"
            title="PRODUCTORAS ACTIVAS"
            statNumber="6"
            statLabel="PRODUCTORAS DE CINE"
            subtext="Actualmente testeando y nutriendo el sistema de manera privada."
            delay={0.2}
          />

          <div style={{ width: 1, background: 'rgba(247,246,237,0.08)', alignSelf: 'stretch' }} />

          <ValidationCard
            tag="COMMERCIAL DEMAND"
            title="VALIDACIÓN DE PAGO"
            statNumber="4"
            statLabel="PRODUCTORAS INTERESADAS"
            subtext="De las 6 productoras activas, afirman explícitamente que pagarían por un producto con estas características."
            delay={0.3}
          />
        </div>
      </div>
    </div>
  );
};

export default ValidationHud;
