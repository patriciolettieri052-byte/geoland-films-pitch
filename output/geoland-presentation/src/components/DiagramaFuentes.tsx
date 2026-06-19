import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Globe, 
  Layers, 
  CheckCircle, 
  DollarSign, 
  ShieldAlert,
  Cpu
} from 'lucide-react';

interface RadialNode {
  id: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  angle: number; // in radians
  isLeft: boolean;
}

export const DiagramaFuentes: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Geometric Constants
  const width = 1100;
  const height = 500;
  const cx = width / 2;
  const cy = height / 2;
  const R = 245;     // Placement radius for outer nodes
  const R_c = 72;    // Center circle radius
  const R_o = 26;    // Outer circle radius (w-13 h-13 is 52px diameter)

  // 6 Nodes distributed radially (3 left, 3 right)
  const nodes: RadialNode[] = useMemo(() => [
    {
      id: 'in-1',
      label: 'APIs & Catastro',
      desc: 'Catastro, municipios, ayuntamientos y film commissions.',
      icon: Database,
      angle: (205 * Math.PI) / 180,
      isLeft: true
    },
    {
      id: 'in-2',
      label: 'Geoespacial & Clima',
      desc: 'Imágenes satelitales, clima, luz solar, ruido y tráfico.',
      icon: Globe,
      angle: (180 * Math.PI) / 180,
      isLeft: true
    },
    {
      id: 'in-3',
      label: 'Bases Visuales',
      desc: 'Catálogos de locaciones e incentivos fiscales.',
      icon: Layers,
      angle: (155 * Math.PI) / 180,
      isLeft: true
    },
    {
      id: 'out-1',
      label: 'Match de Locación',
      desc: 'Recomendación óptima cruzando estética con viabilidad.',
      icon: CheckCircle,
      angle: (-25 * Math.PI) / 180,
      isLeft: false
    },
    {
      id: 'out-2',
      label: 'Costes & Logística',
      desc: 'Optimización de crew, estudios, catering y transporte.',
      icon: DollarSign,
      angle: (0 * Math.PI) / 180,
      isLeft: false
    },
    {
      id: 'out-3',
      label: 'Mitigación de Riesgos',
      desc: 'Cálculo de sombras duras, accesibilidad y ruidos.',
      icon: ShieldAlert,
      angle: (25 * Math.PI) / 180,
      isLeft: false
    }
  ], []);

  // Calculate coordinates for nodes and lines
  const calculatedNodes = useMemo(() => {
    return nodes.map(node => {
      const cos = Math.cos(node.angle);
      const sin = Math.sin(node.angle);

      // Center of the outer circle
      const x = cx + R * cos;
      const y = cy + R * sin;

      // Start of the connection line (boundary of center circle)
      const xStart = cx + R_c * cos;
      const yStart = cy + R_c * sin;

      // End of the connection line (boundary of outer circle)
      const xEnd = cx + (R - R_o) * cos;
      const yEnd = cy + (R - R_o) * sin;

      return {
        ...node,
        x,
        y,
        xStart,
        yStart,
        xEnd,
        yEnd
      };
    });
  }, [nodes, cx, cy, R, R_c, R_o]);

  const isAnyHovered = hoveredNode !== null;

  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      
      {/* Scaling Container to fit slide dimensions perfectly */}
      <div 
        className="relative w-[1100px] h-[500px] shrink-0 scale-[1.35] transition-transform origin-center"
      >
        
        {/* SVG Canvas for connection lines and joints */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <g>
            {calculatedNodes.map((node, idx) => {
              const isHovered = hoveredNode === node.id;
              const isDimmed = isAnyHovered && !isHovered;
              
              // Direct coordinates for structural line
              const linePath = `M ${node.xStart} ${node.yStart} L ${node.xEnd} ${node.yEnd}`;
              
              // Symmetrical flow directions:
              // Left side nodes are INPUTS -> flow inwards (from outer node to center core)
              // Right side nodes are OUTPUTS -> flow outwards (from center core to outer node)
              const flowPath = node.isLeft
                ? `M ${node.xEnd} ${node.yEnd} L ${node.xStart} ${node.yStart}`
                : `M ${node.xStart} ${node.yStart} L ${node.xEnd} ${node.yEnd}`;

              let bgStrokeColor = 'rgba(255, 255, 255, 0.12)';
              let activeStrokeColor = 'rgba(56, 189, 248, 0.35)';
              let strokeWidth = 1.5;
              let dotColor = 'rgba(255, 255, 255, 0.7)';

              if (isHovered) {
                bgStrokeColor = 'rgba(56, 189, 248, 0.25)';
                activeStrokeColor = '#38bdf8';
                strokeWidth = 2.5;
                dotColor = '#38bdf8';
              } else if (isDimmed) {
                bgStrokeColor = 'rgba(255, 255, 255, 0.04)';
                activeStrokeColor = 'rgba(56, 189, 248, 0.08)';
                dotColor = 'rgba(255, 255, 255, 0.2)';
              }

              return (
                <g key={`connection-${node.id}`}>
                  {/* Faint static connection line (structure) - grows out of the center core */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.08 }}
                    d={linePath}
                    stroke={bgStrokeColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    className="transition-all duration-300"
                  />
                  
                  {/* Dynamic fiber-optic dash flow overlay - fades in and moves */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 + 0.4 }}
                    d={flowPath}
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
                  
                  {/* Joint Dot (touching the outer circle boundary) */}
                  <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 + 0.5 }}
                    cx={node.xEnd}
                    cy={node.yEnd}
                    r={3.5}
                    fill={dotColor}
                    className="transition-colors duration-300"
                  />

                  {/* High-fidelity glowing flow particle */}
                  <motion.circle
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: isDimmed ? 0.25 : 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.08 + 0.6 }}
                    r={isHovered ? 3 : 2}
                    fill={isHovered ? "#38bdf8" : "rgba(56, 189, 248, 0.75)"}
                    style={{
                      filter: isHovered ? 'drop-shadow(0 0 4px rgba(56,189,248,0.8))' : 'none'
                    }}
                  >
                    <animateMotion 
                      dur={isHovered ? "1.2s" : "3.2s"} 
                      repeatCount="indefinite" 
                      path={flowPath}
                    />
                  </motion.circle>

                  {/* Secondary staggered flow particle when hovered for extra fluid look */}
                  {isHovered && (
                    <circle r={2} fill="#38bdf8" opacity={0.6} style={{ filter: 'drop-shadow(0 0 3px rgba(56,189,248,0.6))' }}>
                      <animateMotion 
                        dur="1.2s" 
                        begin="0.6s"
                        repeatCount="indefinite" 
                        path={flowPath}
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
          {/* Animated Central Core Circle (PSV) */}
          <motion.div
            className="relative w-36 h-36 flex items-center justify-center pointer-events-auto"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 85,
              damping: 15,
              delay: 0.1
            }}
          >
            {/* Concentric sonar pulses (processing radar scan ripples) */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`sonar-${i}`}
                className="absolute rounded-full border border-geoland-blue/20 bg-geoland-blue/5"
                style={{
                  width: 116,
                  height: 116,
                }}
                animate={{
                  scale: [1, 2.3],
                  opacity: [0.45, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Outer dotted ring rotating clockwise */}
            <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spin_45s_linear_infinite]" />

            {/* Inner dashed ring rotating counter-clockwise */}
            <div className="absolute inset-4 rounded-full border border-dashed border-geoland-blue/15 animate-[spin_28s_linear_infinite] [animation-direction:reverse]" />
            
            {/* Outer solid glow ring */}
            <div className={`absolute inset-2 rounded-full border border-white/10 transition-all duration-700 ${
              hoveredNode ? 'scale-105 border-geoland-blue/40 shadow-[0_0_30px_rgba(56,189,248,0.25)]' : ''
            }`} />
            
            {/* Center Core Card with breathing animation */}
            <motion.div 
              className="absolute w-[116px] h-[116px] rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center text-center shadow-2xl cursor-default"
              animate={{
                boxShadow: hoveredNode 
                  ? [
                      "0 0 20px rgba(56,189,248,0.15)",
                      "0 0 45px rgba(56,189,248,0.35)",
                      "0 0 20px rgba(56,189,248,0.15)"
                    ]
                  : [
                      "0 0 15px rgba(255,255,255,0.05)",
                      "0 0 25px rgba(255,255,255,0.12)",
                      "0 0 15px rgba(255,255,255,0.05)"
                    ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Cpu className="w-5 h-5 text-geoland-blue/80 mb-1 animate-pulse" />
              <span 
                className="text-white font-bold leading-none"
                style={{
                  fontFamily: "'League Gothic', sans-serif",
                  fontSize: '28px',
                  letterSpacing: '0.08em'
                }}
              >
                PSV
              </span>
              <span 
                className="text-white/50 uppercase mt-0.5"
                style={{
                  fontFamily: "'League Gothic', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.12em'
                }}
              >
                ENGINE
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Outer Circular Nodes Wrapper (Static Positioning) */}
        {calculatedNodes.map((node, idx) => {
          const isHovered = hoveredNode === node.id;
          const isLeft = node.isLeft;
          const isDimmed = isAnyHovered && !isHovered;
          
          return (
            <div
              key={node.id}
              className="absolute z-20 pointer-events-none"
              style={{ left: node.x, top: node.y }}
            >
              {/* Animated Outer Node & Text Block */}
              <motion.div
                className="relative w-full h-full pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 14,
                  delay: idx * 0.08 + 0.35, // pop in sequentially after lines start drawing
                }}
              >
                {/* Outer Circular Icon Node */}
                <div 
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`pointer-events-auto w-13 h-13 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer absolute -translate-x-1/2 -translate-y-1/2 ${
                    isHovered 
                      ? 'bg-geoland-blue text-black border-2 border-geoland-blue shadow-[0_0_22px_rgba(56,189,248,0.5)] scale-112 z-30' 
                      : isDimmed
                        ? 'bg-white/80 text-zinc-500 border border-white/10 opacity-35 scale-95'
                        : 'bg-white text-zinc-800 border border-white/20 shadow-md hover:bg-zinc-100 hover:scale-105'
                  }`}
                >
                  <node.icon className="w-5 h-5 stroke-[1.75]" />
                </div>

                {/* Symmetrical Text Block */}
                <div 
                  className={`absolute w-[240px] top-0 -translate-y-1/2 flex flex-col transition-all duration-300 ${
                    isLeft 
                      ? 'right-9 items-end text-right' 
                      : 'left-9 items-start text-left'
                  } ${
                    isDimmed ? 'opacity-25 scale-95' : 'opacity-100'
                  }`}
                >
                  <h4 
                    className={`font-bold uppercase mb-1 transition-colors duration-300 ${
                      isHovered ? 'text-geoland-blue' : 'text-white'
                    }`}
                    style={{
                      fontFamily: "'League Gothic', sans-serif",
                      fontSize: '17px',
                      letterSpacing: '0.08em',
                      lineHeight: '1.1'
                    }}
                  >
                    {node.label}
                  </h4>
                  <p 
                    className="text-[10px] text-white/50 leading-relaxed font-light"
                    style={{
                      fontFamily: "'Arimo', sans-serif"
                    }}
                  >
                    {node.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default DiagramaFuentes;
