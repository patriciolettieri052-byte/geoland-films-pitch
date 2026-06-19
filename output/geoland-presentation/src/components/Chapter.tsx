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
  variant?: "subtitulo" | "titulo" | "portada" | "portada81" | "portadafinal" | "texto" | "barras" | "barras-pro" | "apertura" | "apertura2" | "hub" | "backtest-stats" | "backtest-cities" | "numeric" | "business-units" | "reviews" | "neural-map" | "titulo-grande" | "titulo-chico" | "advisors" | "roadmap" | "soluciones-grid" | "diagrama-fuentes" | "diagrama-expansion" | "market" | "texto-arriba" | "titulo-cuerpo-bold" | "validation-hud";
  align?: "left" | "center" | "right";
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

      {/* Content Overlay with Staggering */}
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className={variant === 'neural-map' || variant === 'roadmap' || variant === 'advisors' || variant === 'validation-hud' ? "absolute inset-0 z-30" : `relative z-20 w-full px-8 flex flex-col ${align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center'}`}
        style={variant === 'neural-map' || variant === 'roadmap' || variant === 'advisors' || variant === 'validation-hud' ? { width: '100%', height: '100%' } : { 
          maxWidth: maxWidth || (variant?.startsWith('backtest') || variant === 'business-units' || variant === 'reviews' ? '1400px' : '1045px'),
          paddingLeft: align === 'left' ? '50px' : undefined,
          paddingRight: align === 'right' ? '50px' : undefined
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
                    {item.label && (
                      <span className="titulo-chico-cinematic !text-3xl tracking-[0.2em]">
                        {item.label}
                      </span>
                    )}
                    <p className="texto-cuerpo-cinematic max-w-md">
                      {item.subtext}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : variant === 'market' ? (
          <div className="w-full max-w-[1200px] mx-auto py-8 px-4 flex flex-col justify-center min-h-[75vh]">
            {title && (
              <motion.div 
                variants={itemVariants} 
                className="titulo-chico-cinematic text-center mb-10 !text-5xl tracking-widest"
              >
                {title}
              </motion.div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 justify-center items-stretch mt-4 pb-8">
              {(() => {
                // Parser for market data
                const items = text.split(';;').map(block => {
                  const parts = block.split('|').map(s => s.trim());
                  
                  const val = parts[1] || "";
                  const match = val.match(/^([\d.,\s-]+?)\s+([A-Z].*)$/);
                  const numberPart = match ? match[1].trim() : val;
                  const unitPart = match ? match[2].trim() : "";

                  const sub = parts[2] || "";
                  const subParts = sub.split(' - ');
                  const subTitle = subParts[0] || "";
                  const subDesc = subParts[1] || "";

                  return { 
                    label: parts[0], 
                    numberPart, 
                    unitPart, 
                    subTitle, 
                    subDesc 
                  };
                });

                const getNumberFontSize = (val: string) => {
                  if (val.length > 10) return '52px';
                  if (val.length > 8) return '62px';
                  if (val.length > 6) return '72px';
                  return '84px';
                };

                return items.map((item, idx) => {
                  const isSOM = item.label.toLowerCase() === 'som';
                  
                  // Levels & Headers for tech card look
                  const levelText = item.label.toLowerCase() === 'tam' 
                    ? "LEVEL 01 // GLOBAL ADDRESSABLE" 
                    : item.label.toLowerCase() === 'sam'
                      ? "LEVEL 02 // SERVICEABLE AUDIENCE"
                      : "LEVEL 03 // IMMEDIATE TARGET";

                  // Layout offset for waterfall cascading card effect
                  const translateClass = idx === 0 
                    ? "md:translate-y-0" 
                    : idx === 1 
                      ? "md:translate-y-4" 
                      : "md:translate-y-8";

                  return (
                    <motion.div 
                      key={idx}
                      variants={itemVariants}
                      className={`relative bg-black/45 backdrop-blur-xl border rounded-lg p-7 flex flex-col justify-between transition-all duration-500 overflow-hidden ${translateClass} ${
                        isSOM 
                          ? 'border-geoland-blue/50 shadow-[0_0_35px_rgba(56,189,248,0.12)] bg-black/60' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Tech Card Corner Notches for SOM */}
                      {isSOM && (
                        <>
                          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-geoland-blue" />
                          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-geoland-blue" />
                        </>
                      )}

                      <div>
                        {/* Level Header Info */}
                        <div className="mb-5 border-b border-white/5 pb-3 text-center">
                          <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">
                            {levelText}
                          </span>
                        </div>

                        {/* Market Label */}
                        <span className="text-zinc-500 text-[9px] tracking-[0.25em] font-mono block uppercase text-center mb-1">
                          MARKET SEGMENT
                        </span>
                        <span 
                          className="text-white font-extrabold tracking-widest block text-center uppercase"
                          style={{
                            fontFamily: "'League Gothic', sans-serif",
                            fontSize: '32px'
                          }}
                        >
                          {item.label}
                        </span>
                        
                        {/* Huge Number Value */}
                        <div className="my-6 text-center select-none flex flex-col items-center justify-center min-h-[90px]">
                          {isSOM ? (
                            <div 
                              className="tracking-tighter text-geoland-blue whitespace-nowrap"
                              style={{ 
                                fontFamily: "'League Gothic', sans-serif",
                                textShadow: '0 0 25px rgba(56,189,248,0.35)',
                                fontSize: getNumberFontSize(item.numberPart),
                                lineHeight: '1',
                                letterSpacing: '0.04em'
                              }}
                            >
                              {item.numberPart}
                            </div>
                          ) : (
                            <div 
                              className="tracking-tighter whitespace-nowrap"
                              style={{ 
                                fontFamily: "'League Gothic', sans-serif",
                                WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.45)',
                                color: 'transparent',
                                fontSize: getNumberFontSize(item.numberPart),
                                lineHeight: '1',
                                letterSpacing: '0.04em'
                              }}
                            >
                              {item.numberPart}
                            </div>
                          )}
                          <div className="text-[9px] font-mono tracking-[0.18em] text-zinc-400 uppercase mt-3">
                            {item.unitPart}
                          </div>
                        </div>

                        {/* Thin division line */}
                        <div className="w-full h-[1px] bg-white/5 my-4" />
                      </div>

                      {/* Subtext description details */}
                      <div className="text-center mt-2 flex flex-col items-center">
                        <h5 
                          className="font-bold tracking-[0.12em] text-zinc-300 uppercase mb-1.5 text-center"
                          style={{
                            fontFamily: "'League Gothic', sans-serif",
                            fontSize: '15px',
                            letterSpacing: '0.08em'
                          }}
                        >
                          {item.subTitle}
                        </h5>
                        <p 
                          className="text-[10.5px] text-white/45 leading-relaxed font-light text-center max-w-[260px]"
                          style={{
                            fontFamily: "'Arimo', sans-serif"
                          }}
                        >
                          {item.subDesc}
                        </p>
                      </div>
                    </motion.div>
                  );
                });
              })()}
            </div>
          </div>
        ) : variant === 'soluciones-grid' ? (
          <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-between min-h-[78vh] py-6 px-4">
            {title && (
              <div className="w-full flex justify-center mb-4">
                <motion.h2 
                  variants={itemVariants}
                  className="text-center max-w-[883px] mx-auto uppercase text-zinc-300"
                  style={{ 
                    fontFamily: "'League Gothic', sans-serif",
                    fontSize: '28px', 
                    lineHeight: '1.2', 
                    letterSpacing: '0.12em' 
                  }}
                >
                  {title}
                </motion.h2>
              </div>
            )}
            
            <div className="flex-grow flex items-center justify-center">
              <div className="w-full max-w-[614px] mx-auto overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 font-mono text-[10.5px] tracking-[0.24em] text-zinc-400 uppercase select-none">
                      <th className="py-3.5 px-8 font-bold w-1/3">SOLUCIÓN ACTUAL</th>
                      <th className="py-3.5 px-8 font-bold w-2/3 text-center">ENFOQUE LIMITADO / ALCANCE AISLADO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const rows = text.split(';;').map(block => {
                        const [name, desc] = block.split('|').map(s => s.trim());
                        return { name, desc };
                      });
                      
                      return rows.map((row, idx) => (
                        <motion.tr 
                          key={idx}
                          variants={itemVariants}
                          className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors duration-300"
                        >
                          <td className="py-3.5 px-8">
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-geoland-blue/80 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                              <span 
                                className="tracking-wider text-white uppercase"
                                style={{
                                  fontFamily: "'League Gothic', sans-serif",
                                  fontSize: '20px',
                                  letterSpacing: '0.06em'
                                }}
                              >
                                {row.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-8">
                            <p 
                              className="text-[13px] text-white/50 leading-relaxed font-light text-center"
                              style={{
                                fontFamily: "'Arimo', sans-serif"
                              }}
                            >
                              {row.desc}
                            </p>
                          </td>
                        </motion.tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
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
              <motion.h2 
                variants={itemVariants}
                className="titulo-chico-cinematic text-center mb-4 !text-4xl"
              >
                {title}
              </motion.h2>
            )}
            
            <div className="flex-grow w-full min-h-[450px] relative">
              <DiagramaFuentes />
            </div>
            
            {text && (
              <motion.div variants={itemVariants} className="mt-4 text-center max-w-4xl mx-auto z-30">
                <p className="texto-fuentes-descripcion leading-relaxed">
                  {text}
                </p>
              </motion.div>
            )}
          </div>
        ) : variant === 'validation-hud' ? (
          <ValidationHud />
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
          <div className={`flex flex-col w-fit ${align === 'left' ? 'items-start text-left mr-auto' : align === 'right' ? 'items-end text-right ml-auto' : 'items-start text-left mx-auto'}`} style={{ maxWidth: maxWidth || '1000px' }}>
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
