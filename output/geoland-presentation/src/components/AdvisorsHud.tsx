import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/* ─── Atmospheric bokeh background — same as RoadmapCinematic ─── */
const AtmoBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const t         = useRef(0);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const cx = cv.getContext('2d'); if (!cx) return;
    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const blobs = [
      { x:0.20, y:0.50, r:0.40, c:'rgba(60,20,8,0.55)',  sp:0.0003  },
      { x:0.78, y:0.35, r:0.34, c:'rgba(35,10,5,0.50)',  sp:-0.0002 },
      { x:0.50, y:0.75, r:0.28, c:'rgba(18,5,2,0.45)',   sp:0.00015 },
      { x:0.88, y:0.70, r:0.22, c:'rgba(55,18,5,0.40)',  sp:-0.0003 },
    ];

    const render = () => {
      const W = cv.width, H = cv.height;
      t.current += 1;
      cx.fillStyle = '#060404'; cx.fillRect(0, 0, W, H);
      blobs.forEach((b, i) => {
        const ox = Math.sin(t.current * b.sp * 60 + i) * 0.06;
        const oy = Math.cos(t.current * b.sp * 45 + i) * 0.04;
        const g = cx.createRadialGradient((b.x+ox)*W,(b.y+oy)*H,0,(b.x+ox)*W,(b.y+oy)*H,b.r*W);
        g.addColorStop(0, b.c); g.addColorStop(1, 'rgba(0,0,0,0)');
        cx.fillStyle = g; cx.fillRect(0,0,W,H);
      });
      cx.save(); cx.globalAlpha = 0.014;
      for (let i = 0; i < 700; i++) {
        cx.fillStyle = Math.random()>0.5?'#fff':'#000';
        cx.fillRect(Math.random()*W, Math.random()*H, 1, 1);
      }
      cx.restore();
      animRef.current = requestAnimationFrame(render);
    };
    animRef.current = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />;
};

/* ─── Viewfinder corners ─── */
const Corners: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = 'rgba(255,255,255,0.35)' }) => (
  <>
    {([['top','left'],['top','right'],['bottom','left'],['bottom','right']] as const).map(([v,h],i) => (
      <div key={i} style={{
        position:'absolute', [v]:0, [h]:0, width:size, height:size,
        borderTop:    v==='top'    ? `1.5px solid ${color}` : undefined,
        borderBottom: v==='bottom' ? `1.5px solid ${color}` : undefined,
        borderLeft:   h==='left'   ? `1.5px solid ${color}` : undefined,
        borderRight:  h==='right'  ? `1.5px solid ${color}` : undefined,
      }} />
    ))}
  </>
);

/* ─── Live timecode ─── */
const Timecode: React.FC = () => {
  const [tc, setTc] = useState('00:00:00');
  useEffect(() => {
    const s = Date.now();
    const iv = setInterval(() => {
      const e = Math.floor((Date.now()-s)/1000);
      setTc(`${String(Math.floor(e/3600)).padStart(2,'0')}:${String(Math.floor((e%3600)/60)).padStart(2,'0')}:${String(e%60).padStart(2,'0')}`);
    }, 1000);
    return () => clearInterval(iv);
  }, []);
  return <>{tc}</>;
};

/* ─── Tokens ─── */
const F = {
  gothic: "'League Gothic', sans-serif",
  arimo:  "'Arimo', sans-serif",
  red:    '#ff2a2a',
  dimRed: 'rgba(255,80,80,0.65)',
  white:  '#ffffff',
  dim:    'rgba(200,196,190,0.52)',
  dimBr:  'rgba(200,196,190,0.82)',
  border: 'rgba(255,255,255,0.09)',
};

/* ─── Single advisor card ─── */
const AdvisorCard: React.FC<{ name: string; role: string; details: string; idx: number; delay: number }> = ({
  name, role, details, idx, delay,
}) => (
  <motion.div
    initial={{ opacity:0, y:12 }}
    animate={{ opacity:1, y:0 }}
    transition={{ duration:0.5, delay, ease:'easeOut' }}
    style={{
      position:'relative',
      border:`1px solid ${F.border}`,
      padding:'14px 16px 12px',
      display:'flex', flexDirection:'column',
      overflow:'hidden',
      background:'rgba(8,4,4,0.6)',
      backdropFilter:'blur(6px)',
    }}
    whileHover={{
      borderColor:'rgba(255,255,255,0.2)',
      background:'rgba(16,6,6,0.75)',
    }}
    // @ts-ignore — framer-motion transition on whileHover
    transition2={{ duration:0.35 }}
  >
    {/* Corner marks */}
    <Corners size={8} color="rgba(255,255,255,0.2)" />

    {/* Index */}
    <div style={{
      position:'absolute', top:7, right:10,
      fontFamily:F.arimo, fontSize:'8px',
      letterSpacing:'0.3em', color:'rgba(255,255,255,0.15)',
      textTransform:'uppercase',
    }}>
      {String(idx + 1).padStart(2,'0')}
    </div>

    {/* Content */}
    <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', height:'100%' }}>
      {/* Accent line */}
      <div style={{ width:22, height:1, background:'rgba(255,255,255,0.3)', marginBottom:10 }} />

      {/* Name */}
      <h3 style={{
        fontFamily:F.gothic,
        fontSize:'clamp(1.15rem, 1.72vw, 1.55rem)',
        textTransform:'uppercase',
        letterSpacing:'0.06em',
        color:F.white,
        fontWeight:'normal',
        lineHeight:1.0,
        margin:'0 0 5px 0',
      }}>
        {name}
      </h3>

      {/* Role */}
      <p style={{
        fontFamily:F.arimo, fontSize:'9px',
        letterSpacing:'0.28em', textTransform:'uppercase',
        color:'rgba(180,210,255,0.7)',
        margin:'0 0 10px 0', fontWeight:400,
      }}>
        {role}
      </p>

      {/* Divider */}
      <div style={{ width:'100%', height:1, background:'rgba(255,255,255,0.06)', marginBottom:9 }} />

      {/* Bio */}
      <p style={{
        fontFamily:F.arimo, fontSize:'10.5px',
        lineHeight:1.6, color:F.dim,
        margin:0, fontWeight:400, flexGrow:1,
      }}>
        {details}
      </p>

      {/* Bottom stamp */}
      <div style={{
        marginTop:10, paddingTop:8,
        borderTop:'1px solid rgba(255,255,255,0.04)',
        fontFamily:F.arimo, fontSize:'7.5px',
        letterSpacing:'0.35em', color:'rgba(255,255,255,0.13)',
        textTransform:'uppercase',
      }}>
        EARLY ACCESS · ADVISOR
      </div>
    </div>
  </motion.div>
);

/* ─── Main component ─── */
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
    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden', background:'#050303' }}>

      {/* Atmospheric bg */}
      <AtmoBg />

      {/* Scan lines */}
      <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
        backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 3px)' }} />

      {/* Vignette */}
      <div style={{ position:'absolute', inset:0, zIndex:3, pointerEvents:'none',
        background:'radial-gradient(ellipse at 50% 40%,transparent 35%,rgba(0,0,0,0.72) 100%)' }} />

      {/* Outer viewfinder frame */}
      <div style={{ position:'absolute', inset:10, zIndex:40, pointerEvents:'none' }}>
        <Corners size={28} color="rgba(255,255,255,0.32)" />
        {[0.25, 0.5, 0.75].map(p => (
          <React.Fragment key={p}>
            <div style={{ position:'absolute', left:0,  top:`${p*100}%`, width:5, height:1, background:'rgba(255,255,255,0.15)' }} />
            <div style={{ position:'absolute', right:0, top:`${p*100}%`, width:5, height:1, background:'rgba(255,255,255,0.15)' }} />
            <div style={{ position:'absolute', top:0,    left:`${p*100}%`, width:1, height:5, background:'rgba(255,255,255,0.15)' }} />
            <div style={{ position:'absolute', bottom:0, left:`${p*100}%`, width:1, height:5, background:'rgba(255,255,255,0.15)' }} />
          </React.Fragment>
        ))}
      </div>

      {/* ── TITLE — decoupled, top margin 8% ── */}
      <motion.h1
        initial={{ opacity:0, y:-10 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.6, delay:0.05 }}
        style={{
          position:'absolute', zIndex:55,
          top:'8%', left:'20%', right:'20%',
          textAlign:'center',
          fontFamily:F.gothic, fontSize:'clamp(1.6rem,3.2vw,3rem)',
          textTransform:'uppercase', letterSpacing:'0.1em', color:F.white,
          fontWeight:'normal', margin:0, textShadow:'0 0 30px rgba(255,42,42,0.25)',
          lineHeight:1,
        }}
      >
        {title || 'ASESORES & EARLY USERS'}
      </motion.h1>

      {/* ── FLEX LAYOUT — 10% margins ── */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ duration:0.5 }}
        style={{
          position:'absolute', zIndex:50,
          top:'10%', left:'10%', right:'10%', bottom:'10%',
          display:'flex', flexDirection:'column',
          padding:'16px 20px 12px',
          boxSizing:'border-box',
        }}
      >

        {/* ── HEADER — REC + TC only, no title ── */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          borderBottom:`1px solid ${F.border}`, paddingBottom:8, marginBottom:6, flexShrink:0,
        }}>
          {/* Left — REC */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:F.red,
              boxShadow:'0 0 7px rgba(255,42,42,0.9)', animation:'hud-pulse 1.5s infinite ease-in-out' }} />
            <span style={{ fontFamily:F.arimo, fontSize:'9px', letterSpacing:'0.38em',
              textTransform:'uppercase', color:'rgba(255,255,255,0.35)' }}>
              REC · LIVE
            </span>
          </div>

          {/* Right — Timecode */}
          <div style={{ textAlign:'right' }}>
            <p style={{ fontFamily:F.arimo, fontSize:'8px', letterSpacing:'0.22em',
              color:'rgba(255,255,255,0.25)', margin:'0 0 1px', textTransform:'uppercase' }}>TC</p>
            <p style={{ fontFamily:F.arimo, fontSize:'11.5px', letterSpacing:'0.18em',
              color:'rgba(255,255,255,0.4)', margin:0, fontVariantNumeric:'tabular-nums' }}>
              <Timecode />
            </p>
          </div>
        </div>



        {/* ── CARDS GRID — centered ── */}
        <div style={{ flexGrow:1, display:'flex', alignItems:'center', minHeight:0 }}>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(3, 1fr)',
            gap:'12px',
            width:'100%',
          }}>
            {advisors.map((a, i) => (
              <AdvisorCard
                key={i}
                name={a.name}
                role={a.role}
                details={a.details}
                idx={i}
                delay={0.15 + i * 0.07}
              />
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          borderTop:`1px solid ${F.border}`, paddingTop:8, marginTop:10, flexShrink:0,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, flex:1 }}>
            <div style={{ width:5, height:5, background:F.red, flexShrink:0,
              boxShadow:'0 0 5px rgba(255,42,42,0.8)' }} />
            <span style={{ fontFamily:F.arimo, fontSize:'8px', letterSpacing:'0.32em',
              textTransform:'uppercase', color:'rgba(255,255,255,0.28)' }}>
              {advisors.length} ADVISORS
            </span>
          </div>

          <span style={{ fontFamily:F.arimo, fontSize:'8px', letterSpacing:'0.42em',
            textTransform:'uppercase', color:'rgba(255,255,255,0.15)', textAlign:'center' }}>
            GEOLAND · DECISION SYSTEM FOR FILM PRODUCTION
          </span>

          <div style={{ display:'flex', alignItems:'center', gap:7, justifyContent:'flex-end', flex:1 }}>
            <span style={{ fontFamily:F.arimo, fontSize:'8px', letterSpacing:'0.32em',
              textTransform:'uppercase', color:'rgba(255,255,255,0.22)' }}>STATUS</span>
            <span style={{ fontFamily:F.arimo, fontSize:'8px', letterSpacing:'0.3em',
              textTransform:'uppercase', color:'rgba(80,255,120,0.7)',
              textShadow:'0 0 6px rgba(80,255,120,0.5)' }}>ON</span>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes hud-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.35; transform:scale(0.82); }
        }
      `}</style>
    </div>
  );
};

export default AdvisorsHud;
