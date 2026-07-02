import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin fixed bar at the very top of the viewport that fills
 * as the user scrolls through the page. Smoothed with a spring
 * so it doesn't feel mechanical.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[110] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--accent), var(--warm-cream))",
      }}
    />
  );
}