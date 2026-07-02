import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/projects";

export default function InteractiveFolderGallery({ onProjectClick }) {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [zoomedProject, setZoomedProject] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (touch) setIsTouch(true);

    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Card + spread sizing — keeps every fanned-out card inside the viewport
  // (instead of getting clipped by the section's overflow-hidden) by deriving
  // the horizontal spread from the actual available width rather than a
  // fixed pixel value that only works on wide screens.
  const isXsPhone = viewportWidth < 400;
  const isPhone = viewportWidth < 640;
  const cardWidth = isXsPhone ? 150 : isPhone ? 200 : viewportWidth < 1024 ? 320 : 320;
  const cardHeight = isXsPhone ? 205 : isPhone ? 260 : viewportWidth < 1024 ? 360 : 360;
  const middleOffset = (projects.length - 1) / 2; // 3 for 7 projects
  const horizontalPadding = 32; // matches px-4 on the container
  const availableHalfWidth = (viewportWidth - horizontalPadding) / 2;
  const spreadStep = Math.max(
    18,
    Math.min(120, (availableHalfWidth - cardWidth / 2 - 8) / middleOffset)
  );
  const rotateStep = isXsPhone ? 2.5 : isPhone ? 3 : isTouch ? 4 : 8;

  const handleProjectClick = (project) => {
    setZoomedProject(project.id);
    
    // Zoom effect delay before actually opening the overlay
    setTimeout(() => {
      onProjectClick(project);
      // Reset zoom after overlay opens so it's normal when they close it
      setTimeout(() => setZoomedProject(null), 500);
    }, 400);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto sm:h-[600px] flex items-center justify-center perspective-[1200px] px-4"
      style={{ touchAction: isOpen ? "none" : "auto", height: viewportWidth < 640 ? (isXsPhone ? 420 : 460) : undefined }}
    >
      {/* Folder Back */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="relative w-[240px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] rounded-xl bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] shadow-2xl origin-bottom flex items-end justify-center pb-4 pointer-events-auto"
          animate={{ rotateX: isOpen ? -10 : 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          onClick={() => !isOpen && setIsOpen(true)}
        >
          <span className="text-[var(--warm-dim)] font-mono text-xs opacity-50">/projects</span>
        </motion.div>
      </div>

      {/* Cards inside folder */}
      {projects.map((project, idx) => {
        const isActive = isOpen;
        // Spread calculation for the fan-out
        const total = projects.length;
        const middle = (total - 1) / 2;
        const offset = idx - middle;
        
        // When closed, they stack together inside the folder
        const closedX = offset * (isXsPhone ? 2 : 4);
        const closedY = (isXsPhone ? 14 : 20) - idx * 2;
        const closedRotate = offset * 2;
        
        // When open, they fan out — spread scales down on narrow screens so
        // every card's edge stays within the container instead of being
        // clipped by the section's overflow-hidden.
        const openX = offset * spreadStep;
        const openY = -(isXsPhone ? 28 : 40) - Math.abs(offset) * (isXsPhone ? 12 : 20);
        const openRotate = offset * rotateStep;

        const isZoomed = zoomedProject === project.id;
        
        return (
          <div key={project.id} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: isZoomed ? 50 : idx + 10 }}>
            <motion.div
              className={`relative rounded-xl overflow-hidden glass-panel cursor-pointer shadow-2xl border border-white/20 bg-white/10 ${isOpen && !isTouch ? 'glass-hover' : ''} pointer-events-auto`}
              style={{ width: cardWidth, height: cardHeight }}
              data-cursor-text={isOpen ? "View" : undefined}
              initial={false}
              animate={isZoomed ? {
                x: 0,
                y: -50,
                scale: 2.5,
                rotateZ: 0,
                opacity: 0,
              } : {
                x: isActive ? openX : closedX,
                y: isActive ? openY : closedY,
                rotateZ: isActive ? openRotate : closedRotate,
                scale: isActive ? 1 : 0.95,
              }}
              transition={{ 
                duration: isZoomed ? 0.4 : (isTouch ? 0.4 : 0.6), 
                ease: [0.32, 0.72, 0, 1] 
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!isOpen) {
                  setIsOpen(true);
                } else {
                  handleProjectClick(project);
                }
              }}
            >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--warm-black)] to-transparent" />
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-20 text-left">
              <p className="font-mono text-[7px] sm:text-[9px] uppercase tracking-[0.2em] text-[var(--accent)] mb-1">
                {project.category} · {project.year}
              </p>
              <h3 className="text-sm sm:text-xl font-display font-bold text-[var(--warm-white)] mb-1 sm:mb-2 leading-tight">
                {project.title}
              </h3>
              <p className="hidden sm:block text-[10px] sm:text-xs text-[var(--warm-dim)] line-clamp-2">
                {project.description}
              </p>
            </div>
          </motion.div>
        </div>
        );
      })}

      {/* Folder Front */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40" style={{ top: isXsPhone ? '70px' : '100px' }}>
        <motion.div 
          className="relative w-[240px] sm:w-[400px] md:w-[500px] h-[160px] sm:h-[250px] rounded-xl bg-[rgba(255,255,255,0.06)] backdrop-blur-2xl border border-[rgba(255,255,255,0.15)] shadow-2xl origin-bottom flex items-center justify-center cursor-pointer pointer-events-auto"
          data-cursor-text={isOpen ? "Close" : "Open"}
          animate={{ rotateX: isOpen ? 60 : 0, y: isOpen ? 20 : 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: isOpen && !isTouch ? 1 : (!isTouch ? 1.02 : 1) }}
        >
          {/* File folder tab */}
          <div className="absolute -top-5 sm:-top-6 left-4 w-24 sm:w-32 h-5 sm:h-6 bg-[rgba(255,255,255,0.06)] backdrop-blur-2xl border-t border-l border-r border-[rgba(255,255,255,0.15)] rounded-t-lg" />
          
          <div className="text-center">
            <p className="font-mono text-[10px] sm:text-sm tracking-widest text-[var(--warm-white)] opacity-80">
              {isOpen ? 'CLICK TO CLOSE' : 'CLICK TO OPEN'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}