import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import HubDiagram from './HubDiagram';
import NeuralMap from './NeuralMap';
import DiagramaFuentes from './DiagramaFuentes';
import DiagramaExpansion from './DiagramaExpansion';
import RoadmapCinematic from './RoadmapCinematic';
import AdvisorsHud from './AdvisorsHud';
import ValidationHud from './ValidationHud';
import ProjectionsChart from './ProjectionsChart';

interface ChapterProps {
  id: number;
  title?: string;
  text: string;
  backgroundMedia?: string;
  isTitleBlue?: boolean;
  overlayOpacity?: number;
  isBold?: boolean;
  isItalic?: boolean;
  overline?: string;
  titleSize?: string;
  variant?: "subtitulo" | "titulo" | "portada" | "portada81" | "portadafinal" | "texto" | "barras" | "barras-pro" | "apertura" | "apertura2" | "hub" | "backtest-stats" | "backtest-cities" | "numeric" | "business-units" | "reviews" | "neural-map" | "titulo-grande" | "titulo-chico" | "advisors" | "roadmap" | "soluciones-grid" | "diagrama-fuentes" | "diagrama-expansion" | "market" | "texto-arriba" | "titulo-cuerpo-bold" | "validation-hud" | "projections";
  align?: "left" | "center" | "right" | "center-left";
  maxWidth?: string;
  ctaUrl?: string;
  ctaText?: string;
  footer?: string;
}



const getBigTitleStyle = (text: string) => {
  const length = text.replace(/<[^>]*>/g, '').length;
  let fontSize = 470;
  if (length > 8) {
    fontSize = Math.min(470, 1920 / (length * 0.35));
  }
  fontSize = fontSize * 0.85; // 15% reduction
  fontSize = Math.max(50, fontSize);
  return {
    fontSize: `${fontSize}px`,
  };
};

const Chapter: React.FC<ChapterProps> = ({ id, title, overline, text, backgroundMedia, isTitleBlue, overlayOpacity, isBold, isItalic, titleSize, variant, align = "center", maxWidth, ctaUrl, ctaText, footer }) => {
  const isVideo = backgroundMedia?.toLowerCase().endsWith('.mp4');
  
  const parseBarras = (text: string) => {
    const markRegex = /((?:—\s*[✓✗]\s*)+)/g;
    const parts = text.split(markRegex);
    const items: { label: string; percentage: number }[] = [];
    
    for (let i = 0; i < parts.length; i += 2) {
      const label = parts[i]?.trim().replace(/^—\s*/, '').replace(/\s*—$/, '');
      const marksPart = parts[i+1] || "";
      
      if (label) {
        const checks = (marksPart.match(/✓/g) || []).length;
        const crosses = (marksPart.match(/✗/g) || []).length;
        const total = checks + crosses;
        const percentage = total > 0 ? (checks / total) * 100 : 0;
        items.push({ label, percentage });
      }
    }
    return items;
  };

  const parseBarrasPro = (text: string) => {
    // Format: Label | Description | Marks ;; Label | Description | Marks
    return text.split(';;').map(block => {
      const [label, description, marksPart] = block.split('|').map(s => s.trim());
      
      const checks = (marksPart?.match(/✓/g) || []).length;
      const crosses = (marksPart?.match(/✗/g) || []).length;
      const total = checks + crosses;
      const percentage = total > 0 ? (checks / total) * 100 : 0;
      
      return { label, description, percentage };
    });
  };

  const parseBacktestStats = (text: string) => {
    // Format: Label|Value|Subtext|ColorCode
    return text.split(';;').map(block => {
      const [label, value, subtext, color] = block.split('|').map(s => s.trim());
      return { label, value, subtext, color };
    });
  };

  const parseBacktestCities = (text: string) => {
    // Format: City|Ratio|Percentage|Description
    return text.split(';;').map(block => {
      const [city, ratio, percentage, description] = block.split('|').map(s => s.trim());
      return { city, ratio, percentage: parseFloat(percentage), description };
    });
  };

  const parseNumeric = (text: string) => {
    // Format: Value1|Label1|Subtext1 ;; Value2|Label2|Subtext2
    return text.split(';;').map(block => {
      const [value, label, subtext] = block.split('|').map(s => s.trim());
      return { value, label, subtext };
    });
  };

  const parseBusinessUnits = (text: string) => {
    // Format: Unit|Description
    return text.split(';;').map(block => {
      const [unit, description] = block.split('|').map(s => s.trim());
      return { unit, description };
    });
  };

  const parseReviews = (text: string) => {
    return text.split(';;').map(review => {
      const [role, location, context, quote] = review.split('|').map(s => s.trim());
      return { role, location, context, quote };
    });
  };
  
  // Custom cubic-bezier for a "premium" heavy feel
  const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

  // Variants for the focal shift (blur + scale)
  const bgVariants = {
    initial: { opacity: 0, scale: 1.1, filter: "blur(20px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 1.05, filter: "blur(10px)" }
  };

  // Variants for content parallax/slide-up
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } }
  };

  return (
    <div className={`w-full h-full flex items-center ${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'} relative overflow-hidden bg-black`}>
      {/* Background Media Container */}
      <motion.div 
        variants={bgVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className="absolute inset-0 z-0"
      >
        {backgroundMedia && (
          isVideo ? (
            <video 
              src={backgroundMedia.startsWith('backtesting') || backgroundMedia.startsWith('escala') ? `assets/${backgroundMedia}` : `assets/${backgroundMedia}`}
              autoPlay 
              muted
              loop 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={`assets/${backgroundMedia}`} 
              className="w-full h-full object-cover"
              alt="background"
            />
          )
        )}
        {/* Dark Overlay - ensures text readability */}
        <div 
          className="absolute inset-0 bg-black z-10" 
          style={{ opacity: (overlayOpacity ?? 60) / 100 }}
        />
      </motion.div>

      {/* Full-height Sidebar Panel for 'titulo-cuerpo-bold' variant */}
      {variant === 'titulo-cuerpo-bold' && (
        <div 
          className={`absolute top-0 bottom-0 ${align === 'left' ? 'left-0 border-r' : 'right-0 border-l'} w-full md:w-[59vw] lg:w-[52vw] xl:w-[46vw] max-w-[832px] bg-black/55 border-white/5 z-10`}
        />
      )}

      {/* Content Overlay with Staggering */}
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className={variant === 'neural-map' || variant === 'roadmap' || variant === 'advisors' || variant === 'validation-hud' ? "absolute inset-0 z-30" : `relative z-20 w-full px-8 flex flex-col ${align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : align === 'center-left' ? 'items-center text-left' : 'items-center text-center'}`}
        style={variant === 'neural-map' || variant === 'roadmap' || variant === 'advisors' || variant === 'validation-hud' ? { width: '100%', height: '100%' } : { 
          maxWidth: maxWidth || (variant?.startsWith('backtest') || variant === 'business-units' || variant === 'reviews' ? '1400px' : '1045px'),
          paddingLeft: align === 'left' ? ((id >= 24 && id <= 29) || id === 34 ? '120px' : '50px') : undefined,
          paddingRight: align === 'right' ? ((id >= 24 && id <= 29) || id === 34 ? '120px' : '50px') : undefined
        }}
      >
        {variant === 'reviews' ? (
          <div className="w-full flex flex-col justify-between py-4 max-w-[1400px] mx-auto overflow-hidden">
            {title && (
              <motion.div 
                variants={itemVariants}
                className="title-barras text-center mb-8 !text-white"
              >
                {title}
              </motion.div>
            )}

            <div className="flex flex-col gap-6">
              {(() => {
                const reviews = parseReviews(text);
                if (reviews.length === 1) {
                  const r = reviews[0];
                  return (
                    <div className="flex justify-center w-full mt-10">
                      <motion.div
                        variants={itemVariants}
                        className="bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-14 rounded-xl flex flex-col justify-between w-full max-w-3xl text-center shadow-2xl"
                      >
                        <div className="flex flex-col items-center">
                          <div className="text-sm md:text-lg uppercase tracking-widest text-geoland-blue font-bold mb-3">{r.role}</div>
                          <div className="text-xs md:text-sm uppercase tracking-wider text-white/60 mb-8">{r.location} • {r.context}</div>
                          <p className="text-2xl md:text-4xl font-cormorant italic font-light leading-relaxed text-white">
                            {r.quote}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  );
                }
                
                return (
                  <>
                    {/* Top Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {reviews.slice(0, 4).map((r, i) => (
                        <motion.div
                          key={`top-${i}`}
                          variants={itemVariants}
                          className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-lg flex flex-col justify-between"
                        >
                          <div>
                            <div className="text-[0.6rem] uppercase tracking-widest text-geoland-blue font-bold mb-1">{r.role}</div>
                            <div className="text-[0.55rem] uppercase tracking-wider text-white/40 mb-3">{r.location} • {r.context}</div>
                            <p className="text-xs italic font-light leading-relaxed text-white/90">
                              {r.quote}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom Row */}
                    {reviews.length > 4 && (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {reviews.slice(4, 8).map((r, i) => (
                          <motion.div
                            key={`bottom-${i}`}
                            variants={itemVariants}
                            className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-lg flex flex-col justify-between"
                          >
                            <div>
                              <div className="text-[0.6rem] uppercase tracking-widest text-geoland-blue font-bold mb-1">{r.role}</div>
                              <div className="text-[0.55rem] uppercase tracking-wider text-white/40 mb-3">{r.location} • {r.context}</div>
                              <p className="text-xs italic font-light leading-relaxed text-white/90">
                                {r.quote}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        ) : variant === 'barras' ? (
          <div className="w-full max-w-[1000px] mx-auto space-y-12 py-8">
            {title && (
              <motion.div 
                variants={itemVariants}
                className="title-barras text-center mb-12 !text-white"
              >
                {title}
              </motion.div>
            )}
            {parseBarras(text).map((item, idx) => (
              <div key={idx} className="group flex flex-col space-y-3">
                <div className="flex justify-between items-end opacity-0 animate-fade-in" style={{ animationDelay: `${idx * 0.1 + 0.3}s`, animationFillMode: 'forwards' }}>
                  <span className="text-white/90 uppercase tracking-[0.2em] text-xs md:text-sm font-light">{item.label}</span>
                </div>
                <div className="h-[2px] w-full bg-gray-500/30 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ ...transition, delay: idx * 0.1 + 0.35 }}
                    className="absolute inset-y-0 left-0 bg-white"
                  />
                  {/* Subtle glow for filled bars */}
                  {item.percentage > 0 && (
                    <motion.div 
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: `${item.percentage}%`, opacity: 0.3 }}
                      transition={{ ...transition, delay: idx * 0.1 + 0.35 }}
                      className="absolute inset-y-0 left-0 bg-white blur-sm"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'barras-pro' ? (
          <div className="w-full max-w-[1000px] mx-auto py-8">
            {title && (
              <motion.div 
                variants={itemVariants}
                className="title-barras text-center mb-16 !text-white"
              >
                {title}
              </motion.div>
            )}
            <div className="space-y-16">
              {parseBarrasPro(text).map((item, idx) => (
                <div key={idx} className="group flex flex-col space-y-4">
                  <motion.span 
                    variants={itemVariants}
                    className="text-white/90 uppercase tracking-[0.2em] text-sm md:text-base font-light"
                  >
                    {item.label}
                  </motion.span>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <div className="flex-grow h-[2px] bg-gray-500/30 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ ...transition, delay: idx * 0.1 + 0.35 }}
                        className="absolute inset-y-0 left-0 bg-white"
                      />
                      {item.percentage > 0 && (
                        <motion.div 
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: `${item.percentage}%`, opacity: 0.3 }}
                          transition={{ ...transition, delay: idx * 0.1 + 0.35 }}
                          className="absolute inset-y-0 left-0 bg-white blur-sm"
                        />
                      )}
                    </div>
                    
                    <motion.span 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...transition, delay: idx * 0.1 + 0.45 }}
                      className="text-white/60 text-xs md:text-sm tracking-wider font-light whitespace-nowrap italic"
                    >
                      {item.description}
                    </motion.span>
                  </div>
                </div>
              ))}
            </div>
            
            {footer && (
              <motion.div 
                variants={itemVariants}
                className="mt-20 pt-8 border-t border-white/5"
              >
                <p className="text-[10px] md:text-xs text-white/30 italic tracking-wide">
                  {footer}
                </p>
              </motion.div>
            )}
          </div>
        ) : variant === 'backtest-stats' ? (
          <div className="w-full py-8">
            {title && (
              <motion.div variants={itemVariants} className="title2 text-center mb-16 !text-white opacity-60 tracking-[0.4em]">
                {title}
              </motion.div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {parseBacktestStats(text).map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex flex-col items-center text-center group hover:bg-white/10 transition-colors duration-500"
                >
                  <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-light text-white/40 mb-6 group-hover:text-white/60 transition-colors line-height-relaxed min-h-[32px] flex items-center">
                    {item.label}
                  </span>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className={`text-4xl md:text-5xl font-cormorant font-bold ${item.color === 'green' ? 'text-[#4a7c59]' : item.color === 'red' ? 'text-[#8b0000]' : 'text-white'}`}>
                      {item.value.split('/')[0]}
                    </span>
                    {item.value.includes('/') && (
                      <span className="text-lg font-light text-white/20">/{item.value.split('/')[1]}</span>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed tracking-wider text-white/50 font-light uppercase">
                    {item.subtext}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ) : variant === 'backtest-cities' ? (
          <div className="w-full py-8">
            {title && (
              <motion.div variants={itemVariants} className="title2 text-center mb-16 !text-white opacity-60 tracking-[0.4em]">
                {title}
              </motion.div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {parseBacktestCities(text).map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex flex-col items-center text-center group hover:bg-white/10 transition-colors duration-500"
                >
                  <div className="flex justify-between items-baseline w-full mb-6">
                    <span className="text-xl font-cormorant font-bold text-white tracking-widest uppercase">{item.city}</span>
                    <span className="text-[10px] font-light text-white/30 tracking-widest">{item.ratio}</span>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-cormorant font-light text-white">{item.percentage}%</span>
                  </div>

                  <div className="h-[2px] w-full bg-white/10 mb-8 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ ...transition, delay: 0.35 + idx * 0.1 }}
                      className="absolute inset-y-0 left-0 bg-[#4a7c59]"
                    />
                  </div>

                  <p className="text-[10px] leading-relaxed tracking-wider text-white/40 font-light italic">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {ctaUrl && (
              <motion.div variants={itemVariants} className="flex justify-center">
                <a 
                  href={ctaUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-10 py-4 border border-white/20 text-[10px] tracking-[0.5em] uppercase font-light text-white/60 hover:text-white hover:border-white hover:bg-white/5 transition-all duration-500 group"
                >
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-500">
                    {ctaText || 'Ver Backtest Consolidado'}
                  </span>
                </a>
              </motion.div>
            )}
          </div>
        ) : variant === 'numeric' ? (
          <div className="w-full max-w-[1400px] mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 justify-center items-center">
              {parseNumeric(text).map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center"
                >
                  <h2 
                    className="titulo-grande-cinematic mb-6"
                    style={{ fontSize: '240px', lineHeight: '0.8' }}
                  >
                    {item.value}
                  </h2>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <p className="texto-cuerpo-cinematic max-w-md">
                      {item.subtext}
                    </p>
                    {item.label && (
                      <span className="text-white/40 text-xs md:text-sm font-jost font-light tracking-[0.15em] uppercase">
                        — {item.label}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : variant === 'market' ? (
          <div className="w-full max-w-[1150px] mx-auto py-8 px-4 flex flex-col justify-center items-center min-h-[80vh] select-none">
            {/* Slide Title */}
            <motion.div 
              variants={itemVariants} 
              className="text-center mb-16 md:mb-20 uppercase text-white/50 tracking-[0.25em]"
              style={{
                fontFamily: "'Arimo', sans-serif",
                fontSize: '13px',
                fontWeight: 500
              }}
            >
              TAMAÑO DE MERCADO
            </motion.div>
            
            {/* Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-20 md:gap-y-0 justify-center items-start w-full">
              {/* TAM Column */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center text-center w-full"
              >
                {/* Header */}
                <span 
                  className="text-white font-bold block uppercase leading-none mb-5"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '68px',
                    fontWeight: 700
                  }}
                >
                  TAM
                </span>

                {/* Subtitle */}
                <span 
                  className="text-white/40 tracking-[0.12em] block uppercase text-center mb-4 min-h-[15px]"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '9px',
                    fontWeight: 400
                  }}
                >
                  TOTAL ADDRESSABLE MARKET
                </span>

                {/* Description Wrapper */}
                <div className="min-h-[64px] md:min-h-[75px] flex items-center justify-center">
                  <p 
                    className="text-white/80 leading-relaxed font-light text-center max-w-[280px]"
                    style={{
                      fontFamily: "'Arimo', sans-serif",
                      fontSize: '13.5px'
                    }}
                  >
                    Mercado total potencial global
                  </p>
                </div>

                {/* Vertical Spacer */}
                <div className="h-12 md:h-16" />

                {/* Number */}
                <span 
                  className="text-white block text-center leading-none mb-3 font-extralight"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '44px',
                    letterSpacing: '-0.01em'
                  }}
                >
                  300.000
                </span>

                {/* Label */}
                <span 
                  className="text-white/40 tracking-[0.15em] block uppercase text-center"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '9.5px',
                    fontWeight: 400
                  }}
                >
                  COMPAÑÍAS
                </span>
              </motion.div>

              {/* SAM Column */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center text-center w-full"
              >
                {/* Header */}
                <span 
                  className="text-white font-bold block uppercase leading-none mb-5"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '68px',
                    fontWeight: 700
                  }}
                >
                  SAM
                </span>

                {/* Subtitle */}
                <span 
                  className="text-white/40 tracking-[0.12em] block uppercase text-center mb-4 min-h-[15px]"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '9px',
                    fontWeight: 400
                  }}
                >
                  SERVICEABLE AVAILABLE MARKET
                </span>

                {/* Description Wrapper */}
                <div className="min-h-[64px] md:min-h-[75px] flex items-center justify-center">
                  <p 
                    className="text-white/80 leading-relaxed font-light text-center max-w-[290px]"
                    style={{
                      fontFamily: "'Arimo', sans-serif",
                      fontSize: '10.5px'
                    }}
                  >
                    Compañías que realizan producciones de forma recurrente, gestionan múltiples locaciones y enfrentan decisiones complejas de producción, logística, permisos, costes y viabilidad.
                  </p>
                </div>

                {/* Vertical Spacer */}
                <div className="h-12 md:h-16" />

                {/* Number */}
                <span 
                  className="text-white block text-center leading-none mb-3 font-extralight"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '44px',
                    letterSpacing: '-0.01em'
                  }}
                >
                  60.000
                </span>

                {/* Label */}
                <span 
                  className="text-white/40 tracking-[0.15em] block uppercase text-center"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '9.5px',
                    fontWeight: 400
                  }}
                >
                  COMPAÑÍAS
                </span>
              </motion.div>

              {/* SOM Column */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center text-center w-full"
              >
                {/* Header */}
                <span 
                  className="text-white font-bold block uppercase leading-none mb-5"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '68px',
                    fontWeight: 700
                  }}
                >
                  SOM
                </span>

                {/* Subtitle */}
                <span 
                  className="text-white/40 tracking-[0.12em] block uppercase text-center mb-4 min-h-[15px]"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '9px',
                    fontWeight: 400
                  }}
                >
                  SERVICEABLE OBTAINABLE MARKET
                </span>

                {/* Description Wrapper */}
                <div className="min-h-[64px] md:min-h-[75px] flex items-center justify-center">
                  <p 
                    className="text-white/80 leading-relaxed font-light text-center max-w-[280px]"
                    style={{
                      fontFamily: "'Arimo', sans-serif",
                      fontSize: '13.5px'
                    }}
                  >
                    Mercado capturable realista
                  </p>
                </div>

                {/* Vertical Spacer */}
                <div className="h-12 md:h-16" />

                {/* Number */}
                <span 
                  className="text-white block text-center leading-none mb-3 font-extralight"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '44px',
                    letterSpacing: '-0.01em'
                  }}
                >
                  2.000-4.000
                </span>

                {/* Label */}
                <span 
                  className="text-white/40 tracking-[0.15em] block uppercase text-center"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '9.5px',
                    fontWeight: 400
                  }}
                >
                  COMPAÑÍAS
                </span>

                {/* Optional Note */}
                <span 
                  className="text-white/40 tracking-[0.05em] block text-center mt-2.5"
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '9.5px',
                    fontWeight: 400
                  }}
                >
                  (3% al 6,7% del SAM)
                </span>
              </motion.div>
            </div>
          </div>
        ) : variant === 'soluciones-grid' ? (
          <div className="w-full max-w-[1000px] mx-auto flex flex-col justify-center min-h-[78vh] py-12 px-4 select-none">
            {title && (
              <div className="w-full flex justify-center mb-16">
                <motion.h2 
                  variants={itemVariants}
                  className="text-center max-w-[883px] mx-auto uppercase text-white/50 tracking-[0.2em]"
                  style={{ 
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '15px', 
                    fontWeight: 500,
                    lineHeight: '1.4', 
                  }}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              </div>
            )}
            
            <div className="flex flex-col items-center justify-center gap-y-7 md:gap-y-8 w-full max-w-[750px] mx-auto">
              {(() => {
                const rows = text.split(';;').map(block => {
                  const [name, desc] = block.split('|').map(s => s.trim());
                  return { name, desc };
                });

                return rows.map((row, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="flex items-center justify-center w-full gap-x-6 md:gap-x-10 opacity-80 hover:opacity-100 transition-opacity duration-300 group"
                  >
                    {/* Left: Solution Name */}
                    <div className="w-[180px] md:w-[220px] text-right font-jost text-sm md:text-[17px] font-bold tracking-[0.2em] uppercase text-white">
                      {row.name}
                    </div>

                    {/* Middle: Elegant Line Arrow */}
                    <div className="flex items-center justify-center shrink-0">
                      <svg className="w-16 md:w-24 h-3 opacity-20 group-hover:opacity-60 transition-opacity duration-300" viewBox="0 0 100 12" fill="none">
                        <line x1="0" y1="6" x2="90" y2="6" stroke="#F7F6ED" strokeWidth="1" />
                        <polygon points="90,3 90,9 97,6" fill="#F7F6ED" />
                      </svg>
                    </div>

                    {/* Right: Solved Process */}
                    <div className="w-[280px] md:w-[350px] text-left font-arimo text-xs md:text-[13px] text-white/60 tracking-[0.1em] uppercase font-light leading-relaxed">
                      {row.desc}
                    </div>
                  </motion.div>
                ));
              })()}
            </div>
          </div>
        ) : variant === 'diagrama-expansion' ? (
          <div className="w-full max-w-[1400px] mx-auto py-8 flex flex-col justify-center h-[80vh]">
            <div className="flex-grow w-full min-h-[450px] relative">
              <DiagramaExpansion title={title || ""} text={text || ""} />
            </div>
          </div>
        ) : variant === 'diagrama-fuentes' ? (
          <div className="w-full max-w-[1400px] mx-auto py-8 flex flex-col justify-between h-[80vh]">
            {title && (
              <div className="w-full flex justify-center mb-4">
                <motion.h2 
                  variants={itemVariants}
                  className="text-center max-w-[883px] mx-auto uppercase text-white/50 tracking-[0.2em]"
                  style={{ 
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: '15px', 
                    fontWeight: 500,
                    lineHeight: '1.4', 
                  }}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              </div>
            )}
            
            <div className="flex-grow w-full min-h-[450px] relative">
              <DiagramaFuentes />
            </div>
            
            {text && (
              <motion.div variants={itemVariants} className="mt-10 text-center max-w-2xl mx-auto z-30">
                <p 
                  className="texto-fuentes-descripcion leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </motion.div>
            )}
          </div>
        ) : variant === 'validation-hud' ? (
          <ValidationHud />
        ) : variant === 'projections' ? (
          <ProjectionsChart />
        ) : variant === 'advisors' ? (
          <AdvisorsHud title={title} text={text} />
        ) : variant === 'roadmap' ? (
          <RoadmapCinematic title={title} />
        ) : variant === 'titulo-grande' ? (
          text ? (
            <div className={`flex flex-col w-fit ${align === 'left' ? 'items-start text-left mr-auto' : align === 'right' ? 'items-end text-right ml-auto' : 'items-start text-left mx-auto'}`} style={{ maxWidth: maxWidth || '1000px' }}>
              {title && (
                <motion.h2 
                  variants={itemVariants}
                  className={`titulo-chico-cinematic mb-6 ${align === 'right' ? 'text-right' : 'text-left'}`}
                >
                  <span dangerouslySetInnerHTML={{ __html: title }} />
                </motion.h2>
              )}
              <motion.div 
                variants={itemVariants}
                className={`texto-cuerpo-cinematic ${align === 'right' ? 'text-right' : 'text-left'}`}
              >
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </motion.div>
            </div>
          ) : (
            <>
              {title && (
                <motion.h2 
                  variants={itemVariants}
                  className="titulo-grande-cinematic mb-8"
                  style={getBigTitleStyle(title)}
                >
                  <span dangerouslySetInnerHTML={{ __html: title }} />
                </motion.h2>
              )}
            </>
          )
        ) : variant === 'titulo-chico' ? (
          align === 'center-left' ? (
            <div className="flex flex-col w-fit items-start text-left mx-auto" style={{ maxWidth: maxWidth || '1000px' }}>
              {title && (
                <motion.h2 
                  variants={itemVariants}
                  className="titulo-chico-cinematic mb-6 text-left"
                >
                  <span dangerouslySetInnerHTML={{ __html: title }} />
                </motion.h2>
              )}
              {text && (
                <motion.div 
                  variants={itemVariants}
                  className="texto-cuerpo-cinematic text-left"
                >
                  <div dangerouslySetInnerHTML={{ __html: text }} />
                </motion.div>
              )}
            </div>
          ) : (
            <>
              {title && (
                text ? (
                  <motion.h2 
                    variants={itemVariants}
                    className={`titulo-chico-cinematic mb-6 w-full ${align === 'right' ? 'text-right' : 'text-left'}`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: title }} />
                  </motion.h2>
                ) : (
                  <motion.h2 
                    variants={itemVariants}
                    className={`titulo-chico-cinematic mb-6 w-full ${align === 'right' ? 'text-right' : align === 'left' ? 'text-left' : 'text-center'}`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: title }} />
                  </motion.h2>
                )
              )}
              {text && (
                <motion.div 
                  variants={itemVariants}
                  className={`texto-cuerpo-cinematic w-full ${align === 'right' ? 'text-right' : 'text-left'}`}
                  style={{ maxWidth: maxWidth || '1000px' }}
                >
                  <div dangerouslySetInnerHTML={{ __html: text }} />
                </motion.div>
              )}
            </>
          )
        ) : variant === 'texto' ? (
          <>
            {text && (
              <motion.div 
                variants={itemVariants}
                className="texto-cuerpo-cinematic w-full"
                style={{ maxWidth: maxWidth || '1000px' }}
              >
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </motion.div>
            )}
          </>
        ) : variant === 'texto-arriba' ? (
          <div className={`flex flex-col w-fit ${align === 'left' ? 'items-start text-left mr-auto' : align === 'right' ? 'items-end text-right ml-auto' : 'items-start text-left mx-auto'}`} style={{ maxWidth: maxWidth || '1045px' }}>
            {text && (
              <motion.div 
                variants={itemVariants}
                className="texto-cuerpo-cinematic mb-3 text-left"
              >
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </motion.div>
            )}
            {title && (
              <motion.h2 
                variants={itemVariants}
                className="titulo-chico-cinematic text-left"
              >
                <span dangerouslySetInnerHTML={{ __html: title }} />
              </motion.h2>
            )}
          </div>
        ) : variant === 'titulo-cuerpo-bold' ? (
          <div 
            className={`flex flex-col w-fit ${align === 'left' ? 'items-start text-left mr-auto' : align === 'right' ? 'items-end text-right ml-auto' : 'items-start text-left mx-auto'} py-10 z-20`} 
            style={{ maxWidth: maxWidth || '1000px' }}
          >
            {title && (
              <motion.h2 
                variants={itemVariants}
                className={`titulo-cuerpo-bold mb-2 ${align === 'right' ? 'text-right' : 'text-left'}`}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}
            {text && (
              <motion.div 
                variants={itemVariants}
                className={`texto-cuerpo-cinematic ${align === 'right' ? 'text-right' : 'text-left'}`}
              >
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </motion.div>
            )}
          </div>
        ) : variant === 'business-units' ? (
          <div className="w-full py-8">
            {title && (
              <motion.div variants={itemVariants} className="font-jost text-lg md:text-2xl text-center mb-12 text-white opacity-80 tracking-tight">
                {title}
              </motion.div>
            )}
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-20 max-w-[1400px] mx-auto">
              {parseBusinessUnits(text).map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="w-full md:w-[28%] flex flex-col items-center text-center group"
                >
                  <div className="flex flex-col items-center space-y-8">
                    {/* Logo SVG */}
                    <div className="h-[26px] opacity-100 transition-opacity duration-700">
                      <img 
                        src="/logo.svg" 
                        alt="Geoland" 
                        className="h-full w-auto invert brightness-200"
                        style={{ filter: 'invert(1) brightness(2)' }}
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                      <h3 className="font-jost font-bold text-2xl md:text-3xl text-white tracking-tight group-hover:text-geoland-blue transition-colors duration-500">
                        {item.unit}
                      </h3>
                      
                      <p className="font-jost text-[13px] md:text-sm leading-relaxed tracking-wide text-white/40 group-hover:text-white/70 transition-colors duration-500 max-w-[280px]">
                        <span className="first-letter:uppercase">{item.description}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : variant === 'portada' ? (
          <Logo intro />
        ) : variant === 'portada81' ? (
          <Logo intro subtitle={text} subtitleClassName="!mt-[17px] !text-[9.5px] md:!text-[11.6px] !tracking-[0.2em]" />
        ) : variant === 'portadafinal' ? (
          <Logo intro subtitle="JOIN US" />
        ) : variant === 'apertura' ? (
          <>
            {overline && (
              <motion.span
                variants={itemVariants}
                className="font-monsieur text-6xl md:text-7xl text-white normal-case leading-none block mb-[-10px]"
              >
                {overline}
              </motion.span>
            )}
            {title && (
              <motion.h2
                variants={itemVariants}
                className="font-cormorant text-6xl md:text-8xl font-normal uppercase tracking-[0.2em] text-white leading-[0.8] block mb-[-10px]"
              >
                {title}
              </motion.h2>
            )}
            {text && (
              <motion.div
                variants={itemVariants}
                className="font-jost text-base md:text-lg text-white not-italic uppercase block z-10"
              >
                <div className="!font-bold !uppercase" dangerouslySetInnerHTML={{ __html: text }} />
              </motion.div>
            )}
          </>
        ) : variant === 'apertura2' ? (
          <>
            {overline && (
              <motion.span
                variants={itemVariants}
                className="font-monsieur text-6xl md:text-7xl text-white normal-case leading-none block mb-[-10px]"
              >
                {overline}
              </motion.span>
            )}
            {title && (
              <motion.h2
                variants={itemVariants}
                className="font-cormorant text-[2.6rem] md:text-[4.2rem] font-normal uppercase tracking-[0.2em] text-white leading-[0.8] block mb-[-10px]"
              >
                {title}
              </motion.h2>
            )}
            {text && (
              <motion.div
                variants={itemVariants}
                className="font-jost text-base md:text-lg text-white not-italic uppercase block z-10"
              >
                <div className="!font-bold !uppercase" dangerouslySetInnerHTML={{ __html: text }} />
              </motion.div>
            )}
          </>
        ) : variant === 'hub' ? (
          <HubDiagram />
        ) : variant === 'neural-map' ? (
          <NeuralMap />
        ) : (
          <>
            {title && (
              <motion.h2 
                variants={itemVariants}
                className={`${variant === 'subtitulo' ? 'text-xl md:text-3xl' : (titleSize || 'text-4xl md:text-6xl')} mb-8 tracking-[0.2em] uppercase ${isBold || variant === 'titulo' ? 'font-bold' : 'font-extralight'} ${isItalic && variant !== 'subtitulo' ? 'italic' : ''} ${isTitleBlue ? 'text-blue-400' : 'text-white'} ${align === 'right' ? 'text-right' : align === 'left' ? 'text-left' : 'text-center'}`}
                style={variant === 'subtitulo' ? { fontFamily: "'League Gothic', sans-serif" } : undefined}
              >
                <span dangerouslySetInnerHTML={{ __html: title }} />
              </motion.h2>
            )}
            {text && (
              <motion.div 
                variants={itemVariants}
                className={`text-lg md:text-2xl leading-relaxed text-white/80 w-full ${align === 'left' ? 'text-left mr-auto' : align === 'right' ? 'text-right ml-auto' : 'text-center mx-auto'} ${isBold ? 'font-bold' : ''} ${isItalic ? 'italic' : ''}`}
                style={{ maxWidth: maxWidth || '1000px' }}
              >
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      {/* Slide ID - Bottom Right */}
      <div className="absolute bottom-8 right-10 z-50 pointer-events-none select-none opacity-100">
        <span className="text-white font-jost text-[10px] md:text-xs tracking-[0.4em] font-extralight uppercase">
          {String(id).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default Chapter;
