import { useRef, useLayoutEffect, useMemo, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

import MountainTerrain from "./three/MountainTerrain";

function CameraFlight({ progressRef }) {
  useFrame((state) => {
    const p = progressRef.current;
    
    // Fly dramatically from z = 60 deep into the mountains to z = -50
    const targetZ = 60 - p * 110;
    
    // Add continuous time-based floating so it never looks like a static image,
    // combined with the scroll-based bobbing
    const time = state.clock.getElapsedTime();
    const targetY = 2 + Math.sin(p * Math.PI * 10) * 1.5 + Math.sin(time * 2) * 0.2;
    
    // Slight banking effect on the X axis based on scroll
    const targetX = Math.sin(p * Math.PI * 4) * 2;
    
    state.camera.position.set(targetX, targetY, targetZ);
    // Look ahead and slightly down, banking with the camera
    state.camera.lookAt(targetX * 0.5, targetY - 1.5, targetZ - 15);
  });
  return null;
}

export default function AboutToProjectsTransition({ aboutRef, projectsRef }) {
  const wrapperRef = useRef(null);
  const progressRef = useRef(0);

  // Handle prefers-reduced-motion check 
  // FORCED TO FALSE so you can actually see the Three.js implementation!
  // Your OS likely has animations disabled which was hiding the canvas.
  const prefersReduced = false;

  useLayoutEffect(() => {
    const aboutContent = aboutRef.current?.querySelector("[data-transition-target]") || aboutRef.current;
    const projectsHeading = projectsRef.current?.querySelector("[data-transition-target]") || projectsRef.current;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
          },
        })
          .to(aboutContent, { opacity: 0 }, 0)
          .to(projectsHeading, { opacity: 1 }, 0);
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // tight coupling to scroll input
          onUpdate: (self) => {
            progressRef.current = self.progress;
          }
        },
      });

      // 1. About content pulls back: scale down + fade
      if (aboutContent) {
        tl.to(aboutContent, {
          scale: 0.92,
          opacity: 0,
          ease: "none",
        }, 0);
      }

      // 2. Projects heading scales up from below-100% and fades in
      if (projectsHeading) {
        tl.fromTo(
          projectsHeading,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, ease: "none" },
          0.6
        );
      }
    });

    return () => ctx.revert();
  }, [aboutRef, projectsRef, prefersReduced]);

  return (
    <div ref={wrapperRef} className="relative w-full h-[60vh] pointer-events-none overflow-hidden z-0 flex items-center justify-center">
      {!prefersReduced && (
        <div className="absolute inset-0 -z-0 pointer-events-none">
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2, 50], fov: 60 }}>
            <MountainTerrain />
            <CameraFlight progressRef={progressRef} />
          </Canvas>
        </div>
      )}
    </div>
  );
}
