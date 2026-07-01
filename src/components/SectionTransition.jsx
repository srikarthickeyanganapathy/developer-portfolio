import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionTransition() {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Start when top of transition hits 80% down the viewport
          end: "bottom 20%", // End when bottom of transition hits 20% down the viewport
          scrub: 0.5, // Tight scrub
        }
      });

      if (!prefersReducedMotion) {
        // 1. AboutSection scales down, fades out, and blurs
        tl.to("#about", {
          scale: 0.92,
          opacity: 0,
          filter: "blur(8px)",
          transformOrigin: "center bottom",
          ease: "none"
        }, 0);

        // 2. Glass panel scales up from the center
        tl.fromTo(".transition-glass-panel", 
          { scale: 0, opacity: 0 },
          { scale: 15, opacity: 1, duration: 0.5, ease: "power2.in" }, 0
        );
        tl.to(".transition-glass-panel", { opacity: 0, duration: 0.5, ease: "power2.out" }, 0.5);

        // 3. ProjectsSection heading/container scales up and fades in
        tl.fromTo("#projects-header", 
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, ease: "none" },
          0.3 // Starts slightly after the glass panel starts scaling
        );

        // 4. Soft ambient glow blobs drifting
        tl.to(".transition-glow-1", { y: -250, x: 150, rotate: 45, ease: "none" }, 0);
        tl.to(".transition-glow-2", { y: -200, x: -100, rotate: -45, ease: "none" }, 0);
        tl.to(".transition-glow-3", { scale: 1.5, opacity: 0.3, ease: "none" }, 0);
      } else {
        // Fallback for prefers-reduced-motion: simple crossfade
        tl.to("#about", { opacity: 0, ease: "none" }, 0);
        tl.fromTo("#projects-header", { opacity: 0 }, { opacity: 1, ease: "none" }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden pointer-events-none -my-[10vh] z-0">
      {/* Glows */}
      <div className="transition-glow-1 absolute w-[500px] h-[500px] bg-[var(--accent)] rounded-full blur-[100px] opacity-30 -left-[10%] top-[10%]" />
      <div className="transition-glow-2 absolute w-[600px] h-[600px] bg-[var(--glow-primary)] mix-blend-screen rounded-full blur-[120px] opacity-40 right-[5%] bottom-[10%]" />
      <div className="transition-glow-3 absolute w-[400px] h-[400px] bg-white rounded-full blur-[90px] opacity-10 left-[40%] top-[40%]" />
      
      {/* Glass Panel */}
      <div className="transition-glass-panel absolute w-32 h-32 rounded-3xl glass-panel border border-white/20 shadow-2xl opacity-0" />
    </div>
  );
}
