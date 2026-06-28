import React from 'react';
import { motion } from 'framer-motion';

const F = {
  gothic: "'League Gothic', sans-serif",
  arimo:  "'Arimo', sans-serif",
  white:  "#F7F6ED",
  dim:    "rgba(247,246,237,0.52)",
  dimBr:  "rgba(247,246,237,0.85)",
  border: "rgba(247,246,237,0.08)",
  dimRed: "rgba(247,246,237,0.4)",
  barGray: "#333333",
};

const BARS = [
  {
    year: "Año 1",
    clientes: "40 clientes",
    acv: "ACV €6.8K",
    value: "€270K",
    tag: "SEED",
    height: "6%",
    mult: "x5",
    color: F.barGray
  },
  {
    year: "Año 2",
    clientes: "155 clientes",
    acv: "ACV €8.7K",
    value: "€1.35M",
    tag: "SERIE A",
    height: "30%",
    mult: "x4",
    color: F.barGray
  },
  {
    year: "Año 3",
    clientes: "460 clientes",
    acv: "ACV €11.7K ↑",
    value: "€5.4M",
    tag: "SERIE B",
    height: "50%",
    mult: "x2.2",
    color: F.barGray
  },
  {
    year: "Año 4",
    clientes: "1.200 clientes",
    acv: "ACV €10K",
    value: "€12M",
    height: "70%",
    mult: "x2.5",
    color: F.barGray
  },
  {
    year: "Año 5",
    clientes: "3.000 clientes",
    acv: "75% del SOM",
    value: "€30M",
    height: "100%",
    color: F.white,
    isWhite: true
  }
];

const ProjectionsChart: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between px-16 py-12 text-white bg-[#0A0A0A] select-none" style={{ fontFamily: F.arimo }}>
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col">
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2 font-medium"
          >
            PROYECCIÓN ARR · ESCENARIO MEDIO · 5 AÑOS
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl mb-8 tracking-tight font-bold"
            style={{ fontFamily: F.arimo }}
          >
            Del primer cheque al Serie B
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-white/10 rounded-md px-6 py-3 bg-white/5 backdrop-blur-sm"
          >
            <p className="text-[11px] md:text-xs text-white/50 tracking-wider">
              Con €295K <span className="mx-2">→</span> 12 meses de runway <span className="mx-2">→</span> 40 clientes pagando <span className="mx-2">→</span> €270K ARR <span className="mx-2">→</span> <span className="text-white/80">listo para Serie A</span>
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border border-white/10 rounded-md px-8 py-5 bg-[#111111]/80 backdrop-blur-md flex flex-col items-end text-right"
        >
          <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2">
            RETORNO IMPLÍCITO - AÑO 3
          </p>
          <p className="text-3xl font-bold mb-2">
            ~22x <span className="text-lg text-white/40 font-normal">sobre €295K</span>
          </p>
          <p className="text-[10px] tracking-wider text-white/40 uppercase">
            €5.4M ARR × 8x múltiplo = ~€43M val. · 15% = <span className="text-white/80">~€6.5M</span>
          </p>
        </motion.div>
      </div>

      {/* CHART SECTION */}
      <div className="flex-1 flex items-end justify-center pb-12 pt-16 relative">
        <div className="flex items-end justify-between w-full max-w-[1200px] h-[400px] relative">
          
          {BARS.map((bar, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center relative z-10 w-[16%]">
                {/* Labels above bar */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex flex-col items-center mb-3"
                >
                  {bar.tag && (
                    <div className="border border-white/10 bg-white/5 rounded px-3 py-1 mb-2">
                      <span className="text-[9px] tracking-[0.15em] text-white/50">{bar.tag}</span>
                    </div>
                  )}
                  <span className={`font-bold text-xl md:text-2xl ${bar.isWhite ? 'text-white' : 'text-white'}`}>
                    {bar.value}
                  </span>
                </motion.div>

                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: bar.height }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: "easeOut" }}
                  className="w-full rounded-t-md"
                  style={{ backgroundColor: bar.color }}
                />
              </div>

              {/* Multiplier between bars */}
              {bar.mult && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="flex items-end pb-4"
                >
                  <span className="text-white/30 text-xs font-bold tracking-widest">{bar.mult}</span>
                </motion.div>
              )}
            </React.Fragment>
          ))}
          
          {/* Bottom Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 z-0" />
        </div>
      </div>

      {/* FOOTER SECTION (X Axis Labels & Legends) */}
      <div className="w-full flex justify-center pb-6">
        <div className="flex justify-between w-full max-w-[1200px]">
          {BARS.map((bar, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="flex flex-col items-center text-center w-[16%]"
            >
              <span className={`text-[13px] font-bold mb-1 ${bar.isWhite ? 'text-white' : 'text-white/60'}`}>{bar.year}</span>
              <span className="text-[11px] text-white/40 mb-0.5">{bar.clientes}</span>
              <span className="text-[11px] text-white/40">{bar.acv}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BOTTOM LEGEND */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="w-full max-w-[1200px] mx-auto flex justify-between pt-6 border-t border-white/5"
      >
        <div className="flex gap-2 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="text-[10px] text-white/30 tracking-widest">On-Demand · ~€1.400/año</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="text-[10px] text-white/30 tracking-widest">Production Hub · €10.788/año</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="text-[10px] text-white/30 tracking-widest">Enterprise · €60K/año (conservador)</span>
        </div>
      </motion.div>

    </div>
  );
};

export default ProjectionsChart;
