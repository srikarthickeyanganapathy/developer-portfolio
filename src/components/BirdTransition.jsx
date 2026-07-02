import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BirdTransition() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion === null) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // Pins when it reaches the top
          end: "+=150%",
          scrub: 1,
          pin: true,
          refreshPriority: 0,
        }
      });

      if (!prefersReducedMotion && !isMobile) {
        // Fade out #projects at the start of the scrub
        tl.to("#projects", {
          scale: 0.94,
          opacity: 0,
          transformOrigin: "center top",
          ease: "power2.inOut",
          duration: 0.3
        }, 0);

        tl.fromTo(".settle-text-1",
          { scale: 1.5, opacity: 0 },
          { scale: 1, opacity: 1, ease: "power2.out", duration: 0.2 },
          0.4
        );

        tl.to(".settle-text-1", { opacity: 0, duration: 0.05, ease: "none" }, 0.65);
        tl.fromTo(".settle-text-2",
          { scale: 1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.05, ease: "none" },
          0.65
        );

        tl.to(".settle-text-2", { opacity: 0, scale: 1.1, ease: "power2.in", duration: 0.2 }, 0.8);

        // Brief light-leak flash right as Contact arrives — sells the "arrival"
        tl.fromTo(".transition-light-leak",
          { opacity: 0 },
          { opacity: 0.5, duration: 0.12, ease: "power1.in" },
          0.82
        );
        tl.to(".transition-light-leak", { opacity: 0, duration: 0.3, ease: "power2.out" }, 0.94);

        // Fade in #contact at the very end
        tl.fromTo("#contact", 
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, transformOrigin: "center bottom", ease: "power2.inOut", duration: 0.15 },
          0.85
        );
      }
    });

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isMobile ? 'h-[60vh]' : 'h-[100vh]'} flex items-center justify-center overflow-hidden pointer-events-none z-20`}
    >
      {/* Light-leak flash, fires as Contact settles in */}
      <div
        className="transition-light-leak absolute inset-0 pointer-events-none z-30"
        style={{
          opacity: 0,
          background: "radial-gradient(circle at 50% 40%, rgba(200,184,160,0.55) 0%, transparent 65%)",
        }}
      />

      {!isMobile && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <h2 className="settle-text-1 font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--warm-white)] tracking-tighter absolute drop-shadow-2xl">
            Let's Talk
          </h2>
          <h2 className="settle-text-2 font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--warm-white)] tracking-tighter absolute drop-shadow-2xl">
            Let's <span className="text-[var(--accent)] mx-1 font-light opacity-50">|</span> Talk
          </h2>
        </div>
      )}
    </div>
  );
}