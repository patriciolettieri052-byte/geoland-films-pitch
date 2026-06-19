import { useState, useEffect, useCallback, useRef } from 'react';
import Chapter from './components/Chapter';
import Logo from './components/Logo';
import NavGrid from './components/NavGrid';
import { slides } from './data/slides';
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from 'lucide-react';

function App() {
  const [currentIdx, setCurrentIdx] = useState(-1); // -1 for Intro
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);
  const [showNavGrid, setShowNavGrid] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsPortrait(height > width);
      setIsMobile(width < 1024);
      setScale(Math.min(width / 1920, height / 1080));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    if (currentIdx < slides.length - 1) {
      setIsAnimating(true);
      setCurrentIdx(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 300); // Matching animation duration
    }
  }, [currentIdx, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    if (currentIdx > -1) {
      setIsAnimating(true);
      setCurrentIdx(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [currentIdx, isAnimating]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 15) return;
      if (e.deltaY > 0) nextSlide();
      else prevSlide();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStart.current === null) return;
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart.current - touchEnd;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      touchStart.current = null;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowNavGrid(false);
      if (showNavGrid) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'h' || e.key === 'H' || e.key === 'm' || e.key === 'M') setShowNavGrid(true);
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide, showNavGrid]);

  return (
    <>
      {isPortrait && isMobile && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center transition-opacity duration-500">
          <div className="mb-8 opacity-60">
            <svg className="w-16 h-16 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
          <h2 className="text-white text-xl md:text-2xl font-jost font-light tracking-[0.2em] uppercase">
            Por favor, gira tu dispositivo
          </h2>
          <p className="text-white/40 text-xs md:text-sm mt-4 font-light italic tracking-wider">
            La presentación está diseñada exclusivamente para formato horizontal.
          </p>
        </div>
      )}
      <main className={`fixed inset-0 bg-black overflow-hidden select-none ${isMobile ? 'flex items-center justify-center' : 'w-screen h-screen'}`}>
        <div 
          className={isMobile ? "relative overflow-hidden bg-black flex-shrink-0 shadow-[0_0_50px_rgba(0,0,0,0.5)]" : "w-full h-full"}
          style={isMobile ? { 
            width: '1920px', 
            height: '1080px', 
            transform: `scale(${scale})`,
            transformOrigin: 'center center'
          } : undefined}
        >
          {/* Navigation Toggle Button - Bottom Left */}
      <button 
        onClick={() => setShowNavGrid(true)}
        className="fixed bottom-8 left-10 z-[60] w-12 h-12 flex items-center justify-center group"
      >
        <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 backdrop-blur-sm border border-white/10" />
        <Home 
          className="w-6 h-6 relative z-10 text-white opacity-30 group-hover:opacity-100 transition-all duration-500" 
          strokeWidth={1.5}
        />
        <span className="absolute left-full ml-4 whitespace-nowrap text-[10px] tracking-[0.3em] font-jost font-light text-white opacity-0 group-hover:opacity-40 transition-opacity duration-500 uppercase">
          Índice
        </span>
      </button>

      {/* Navigation Grid Overlay */}
      <NavGrid 
        isOpen={showNavGrid}
        onClose={() => setShowNavGrid(false)}
        onSelect={(idx) => {
          setCurrentIdx(idx);
          setShowNavGrid(false);
        }}
        currentIndex={currentIdx}
      />

      <AnimatePresence mode="wait">
        {currentIdx === -1 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10 bg-black"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video 
                src="assets/portada.mp4" 
                autoPlay 
                muted
                loop 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 z-10"></div>
            </div>
            <div className="relative z-20 w-full h-full flex items-center justify-center">
              <Logo intro />
            </div>
          </motion.div>
        )}

        {slides.map((slide, index) => (
          index === currentIdx && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black"
            >
              <Chapter 
                {...slide} 
                overlayOpacity={slide.overlayOpacity}
              />
            </motion.div>
          )
        ))}

      </AnimatePresence>
        </div>
      </main>
    </>
  );
}

export default App;
