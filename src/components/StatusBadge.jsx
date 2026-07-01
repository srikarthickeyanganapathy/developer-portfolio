import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function StatusBadge() {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touch || reducedMotion) setIsTouch(true);
  }, []);

  const handleMouseMove = (e) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Magnetic pull
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: isTouch ? 0 : springX, y: isTouch ? 0 : springY }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-chip cursor-pointer z-10"
      whileHover={!isTouch ? { scale: 1.05 } : {}}
      whileTap={!isTouch ? { scale: 0.95 } : {}}
    >
      <div className="relative flex h-2 w-2 items-center justify-center">
        <motion.span 
          animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)]"
        />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
      </div>
      <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase">
        Available for Work
      </span>
    </motion.div>
  );
}
