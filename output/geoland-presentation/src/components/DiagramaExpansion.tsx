import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface DiagramaExpansionProps {
  title: string;
  text: string;
}

export const DiagramaExpansion: React.FC<DiagramaExpansionProps> = ({ title, text }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Geometric Constants
  const width = 1100;
  const height = 500;
  const cx = width / 2;
  const cy = height / 2;
  const R_c = 102;     // Center circle radius
  const L_h = 80;      // Length of horizontal segment from label dot

  // Coordinates of the 10 label dots (5 left, 5 right)
  const yCoords = useMemo(() => [75, 160, 245, 330, 415], []);
  const xLabelLeft = cx - 290;
  const xLabelRight = cx + 290;

  // Split title dynamically in half to fit inside the circle card
  const formattedTitle = useMemo(() => {
    if (!title) return "";
    if (title.includes('<br')) return title;
    const words = title.split(' ');
    if (words.length <= 2) return words.join('<br/>');
    const mid = Math.ceil(words.length / 2);
    return words.slice(0, mid).join(' ') + '<br/>' + words.slice(mid).join(' ');
  }, [title]);

  // Parse items from comma-separated list
  const items = useMemo(() => {
    if (!text) return [];
    return text.split(',').map(s => s.trim()).filter(Boolean);
  }, [text]);

  // Symmetrical radial angles for circle connection points
  const angles = useMemo(() => [
    // Left side (Indices 0 - 4): Top to Bottom
    (215 * Math.PI) / 180,
    (197 * Math.PI) / 180,
    (180 * Math.PI) / 180,
    (163 * Math.PI) / 180,
    (145 * Math.PI) / 180,
    // Right side (Indices 5 - 9): Top to Bottom
    (-35 * Math.PI) / 180,
    (-17 * Math.PI) / 180,
    (0 * Math.PI) / 180,
    (17 * Math.PI) / 180,
    (35 * Math.PI) / 180,
  ], []);

  // Calculate drawing coordinates for each branch
  const branches = useMemo(() => {
    return items.map((item, idx) => {
      const isLeft = idx < 5;
      const coordIndex = isLeft ? idx : idx - 5;
      
      const yLabel = yCoords[coordIndex];
      const xLabel = isLeft ? xLabelLeft : xLabelRight;
      
      // Bend point where diagonal starts
      const xBend = isLeft ? xLabel + L_h : xLabel - L_h;
      
      // Connection point on center circle boundary
      const angle = angles[idx];
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const xCircle = cx + R_c * cos;
      const yCircle = cy + R_c * sin;

      // Symmetrical flow direction (starts at label dot, goes to circle boundary)
      const pathD = `M ${xLabel} ${yLabel} L ${xBend} ${yLabel} L ${xCircle} ${yCircle}`;

      return {
        label: item,
        xLabel,
        yLabel,
        xBend,
        xCircle,
        yCircle,
        pathD,
        isLeft
      };
    });
  }, [items, yCoords, xLabelLeft, xLabelRight, angles, cx, cy, R_c, L_h]);

  const isAnyHovered = hoveredIndex !== null;

  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      
      {/* Scaling Container to fit slide dimensions perfectly */}
      <div className="relative w-[1100px] h-[500px] shrink-0 scale-[1.1] transition-transform origin-center">
        
        {/* SVG Canvas for connection lines and joints */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <g>
            {branches.map((branch, idx) => {
              const isHovered = hoveredIndex === idx;
              const isDimmed = isAnyHovered && !isHovered;
              
              let bgStrokeColor = 'rgba(255, 255, 255, 0.12)';
              let activeStrokeColor = 'rgba(56, 189, 248, 0.35)';
              let strokeWidth = 1.5;
              let dotColor = 'rgba(255, 255, 255, 0.7)';

              if (isHovered) {
                bgStrokeColor = 'rgba(56, 189, 248, 0.25)';
                activeStrokeColor = '#38bdf8';
                strokeWidth = 2.2;
                dotColor = '#38bdf8';
              } else if (isDimmed) {
                bgStrokeColor = 'rgba(255, 255, 255, 0.04)';
                activeStrokeColor = 'rgba(56, 189, 248, 0.08)';
                dotColor = 'rgba(255, 255, 255, 0.2)';
              }

              return (
                <g key={`branch-${idx}`}>
                  {/* Faint static connection line (structure) - grows out of the center core */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.06 }}
                    d={branch.pathD}
                    stroke={bgStrokeColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    className="transition-all duration-300"
                  />
                  
                  {/* Dynamic fiber-optic dash flow overlay - fades in and moves */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.06 + 0.35 }}
                    d={branch.pathD}
                    stroke={activeStrokeColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray="6, 12"
                    className="transition-colors duration-300"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values={isHovered ? "36;0" : "72;0"}
                      dur={isHovered ? "0.8s" : "2.5s"}
                      repeatCount="indefinite"
                    />
                  </motion.path>
                  
                  {/* Outer label joint dot */}
                  <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.06 + 0.45 }}
                    cx={branch.xLabel}
                    cy={branch.yLabel}
                    r={3}
                    fill={dotColor}
                    className="transition-colors duration-300"
                  />

                  {/* Inner circle joint dot */}
                  <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.06 + 0.4 }}
                    cx={branch.xCircle}
                    cy={branch.yCircle}
                    r={2.5}
                    fill={dotColor}
                    className="transition-colors duration-300"
                  />

                  {/* High-fidelity glowing flow particle */}
                  <motion.circle
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: isDimmed ? 0.25 : 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.06 + 0.5 }}
                    r={isHovered ? 2.5 : 1.8}
                    fill={isHovered ? "#38bdf8" : "rgba(56, 189, 248, 0.7)"}
                    style={{
                      filter: isHovered ? 'drop-shadow(0 0 3px rgba(56,189,248,0.8))' : 'none'
                    }}
                  >
                    <animateMotion 
                      dur={isHovered ? "1.2s" : "3.0s"} 
                      repeatCount="indefinite" 
                      path={branch.pathD}
                    />
                  </motion.circle>

                  {/* Secondary staggered flow particle when hovered */}
                  {isHovered && (
                    <circle r={1.8} fill="#38bdf8" opacity={0.6} style={{ filter: 'drop-shadow(0 0 2px rgba(56,189,248,0.6))' }}>
                      <animateMotion 
                        dur="1.2s" 
                        begin="0.6s"
                        repeatCount="indefinite" 
                        path={branch.pathD}
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Central Core Circle Wrapper (Static Positioning) */}
        <div 
          className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
          style={{ left: cx, top: cy }}
        >
          {/* Animated Central Core Circle */}
          <motion.div
            className="relative w-56 h-56 flex items-center justify-center pointer-events-auto"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: 0.1
            }}
          >
            {/* Concentric sonar pulses (processing scan ripples) */}
            {[0, 1].map((i) => (
              <motion.div
                key={`sonar-${i}`}
                className="absolute rounded-full border border-white/10 bg-white/5"
                style={{
                  width: 204,
                  height: 204,
                }}
                animate={{
                  scale: [1, 1.35],
                  opacity: [0.35, 0],
                }}
                transition={{
                  duration: 4.0,
                  repeat: Infinity,
                  delay: i * 2.0,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Concentric rotating rings */}
            <div className="absolute inset-0 rounded-full border border-white/5" />
            <div className="absolute inset-2 rounded-full border border-dashed border-white/10 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-dashed border-geoland-blue/5 animate-[spin_35s_linear_infinite] [animation-direction:reverse]" />
            
            {/* Core Glassmorphic Circle Card with breathing glow */}
            <motion.div 
              className="absolute w-[172px] h-[172px] rounded-full bg-zinc-950/80 backdrop-blur-2xl border border-white/20 flex flex-col items-center justify-center text-center shadow-2xl cursor-default"
              animate={{
                boxShadow: isAnyHovered 
                  ? [
                      "0 0 20px rgba(56,189,248,0.1)",
                      "0 0 35px rgba(56,189,248,0.25)",
                      "0 0 20px rgba(56,189,248,0.1)"
                    ]
                  : [
                      "0 0 15px rgba(255,255,255,0.03)",
                      "0 0 25px rgba(255,255,255,0.08)",
                      "0 0 15px rgba(255,255,255,0.03)"
                    ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <h3 
                className="text-white font-black uppercase leading-tight tracking-[0.14em] font-jost"
                style={{
                  fontFamily: "'League Gothic', sans-serif",
                  fontSize: '25px'
                }}
                dangerouslySetInnerHTML={{ __html: formattedTitle }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Outer Circular Node Labels (Static Positioning) */}
        {branches.map((branch, idx) => {
          const isHovered = hoveredIndex === idx;
          const isDimmed = isAnyHovered && !isHovered;
          const isLeft = branch.isLeft;
          
          return (
            <div
              key={`label-${idx}`}
              className="absolute z-20 pointer-events-none"
              style={{ left: branch.xLabel, top: branch.yLabel }}
            >
              {/* Animated Label Block */}
              <motion.div
                className={`absolute flex flex-col whitespace-nowrap transition-all duration-300 pointer-events-auto cursor-pointer ${
                  isLeft 
                    ? 'right-4 items-end text-right -translate-y-1/2' 
                    : 'left-4 items-start text-left -translate-y-1/2'
                } ${
                  isDimmed ? 'opacity-25 scale-95' : 'opacity-100'
                }`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span 
                  className={`whitespace-nowrap uppercase tracking-wider transition-colors duration-300 ${
                    isHovered ? 'text-geoland-blue font-bold' : 'text-white font-medium'
                  }`}
                  style={{
                    fontFamily: "'League Gothic', sans-serif",
                    fontSize: '17px',
                    letterSpacing: '0.08em'
                  }}
                >
                  {branch.label}
                </span>
              </motion.div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default DiagramaExpansion;
