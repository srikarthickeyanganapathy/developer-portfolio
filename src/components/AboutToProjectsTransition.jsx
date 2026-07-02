import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutToProjectsTransition({ aboutRef, projectsRef }) {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    const aboutContent = aboutRef.current?.querySelector("[data-transition-target]") || aboutRef.current;
    const projectsHeading = projectsRef.current?.querySelector("[data-transition-target]") || projectsRef.current;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: skip the pin (mobile browser chrome collapsing mid-pin causes jumpy
        // behavior, and a 150%-scroll dead zone feels broken on a short viewport).
        // Just a light, quick fade-in as the heading enters view instead.
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 75%",
              end: "top 40%",
              scrub: 0.6,
            },
          }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          refreshPriority: 1,
        },
      });

      if (aboutContent) {
        tl.to(aboutContent, {
          scale: 0.92,
          opacity: 0,
          ease: "none",
          duration: 0.2
        }, 0);
      }

      // Elegant cinematic settle effect to perfectly match "Let's Talk"
      tl.fromTo(textRef.current,
        { scale: 1.5, opacity: 0 },
        { scale: 1, opacity: 1, ease: "power2.out", duration: 0.2 },
        0.3
      );
      
      tl.to(textRef.current, { opacity: 0, scale: 1.1, ease: "power2.in", duration: 0.2 }, 0.65);

      if (projectsHeading) {
        tl.fromTo(
          projectsHeading,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, ease: "none", duration: 0.2 },
          0.8
        );
      }
    });

    return () => ctx.revert();
  }, [aboutRef, projectsRef, isMobile]);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${isMobile ? "h-[30vh]" : "h-[100vh]"} pointer-events-none overflow-hidden z-20 flex items-center justify-center`}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h2 ref={textRef} className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--warm-white)] tracking-tighter absolute drop-shadow-2xl px-6 text-center">
          Let's dive in
        </h2>
      </div>
    </div>
  );
}