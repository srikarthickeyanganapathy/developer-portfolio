import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MountainTerrain from "./three/MountainTerrain";

gsap.registerPlugin(ScrollTrigger);

function BirdMesh({ progressRef }) {
  const groupRef = useRef(null);

  // A simple stylized flat double-triangle wing shape
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // V shape: left wing tip, center, right wing tip, tail
    const vertices = new Float32Array([
      -3, 0.5, -1.5, // left tip
      0, 0, 1.5,     // nose
      3, 0.5, -1.5,  // right tip
      
      -3, 0.5, -1.5, // left tip
      0, 0, -3,      // tail
      0, 0, 1.5,     // nose
      
      3, 0.5, -1.5,  // right tip
      0, 0, 1.5,     // nose
      0, 0, -3       // tail
    ]);
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    const p = progressRef.current;
    
    // Continuous flapping independent of scroll
    const time = state.clock.getElapsedTime();
    const flap = 1 + Math.sin(time * 10) * 0.5;
    
    if (groupRef.current) {
      groupRef.current.scale.set(1, flap, 1);
      
      // Arc path: starts behind camera on the left, swoops center and forward, disappears into terrain
      const birdZ = 80 - p * 160; 
      const birdX = -25 + p * 35; 
      const birdY = 12 - p * 16; 
      
      groupRef.current.position.set(birdX, birdY, birdZ);
      
      // Rotate bird to face its flight path
      const dir = new THREE.Vector3(35, -16, -160).normalize();
      const lookTarget = groupRef.current.position.clone().add(dir);
      groupRef.current.lookAt(lookTarget);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#c8b8a0" side={THREE.DoubleSide} flatShading={true} />
      </mesh>
    </group>
  );
}

function CameraFlight({ progressRef }) {
  useFrame((state) => {
    const p = progressRef.current;
    
    // Camera pushes INTO terrain while bird flies toward it
    const targetZ = 70 - p * 110;
    const targetY = 8 - p * 6; // Descend into the terrain
    
    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 2) * 0.2;
    
    state.camera.position.set(0, targetY + floatY, targetZ);
    // Look ahead and slightly up initially, then level out
    state.camera.lookAt(0, targetY - 2, targetZ - 20);
  });
  return null;
}

export default function BirdTransition() {
  const containerRef = useRef(null);
  const progressRef = useRef(0);
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
    // Only setup GSAP after initial client render calculates preferences
    if (prefersReducedMotion === null) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          }
        }
      });

      if (!prefersReducedMotion && !isMobile) {
        // 6. Keep #projects fading/scaling out at the start
        tl.to("#projects", {
          scale: 0.94,
          opacity: 0,
          transformOrigin: "center top",
          ease: "power2.inOut",
          duration: 0.3
        }, 0);

        // 4. HTML overlay text morph
        tl.fromTo(".fly-through-text",
          { scale: 1, opacity: 0.8 },
          { scale: 40, opacity: 0, ease: "power2.in", duration: 0.5 },
          0
        );

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

        // 5. #contact reveal ONLY near the end once terrain has risen
        tl.fromTo("#contact", 
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, transformOrigin: "center bottom", ease: "power2.inOut", duration: 0.15 },
          0.85
        );

      } else {
        // Fallback for mobile / prefers-reduced-motion
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        tl.to("#projects", { opacity: 0, ease: "none", duration: 0.5 }, 0);
        
        // 2D bird flight fallback
        tl.fromTo(".bird-wrapper", 
          { x: -vw * 0.15, y: vh * 0.6, scale: 0.3, rotation: 10 },
          { x: vw * 0.15, y: -vh * 0.1, scale: 2.5, rotation: -10, ease: "none", duration: 1 },
          0
        );
        
        tl.fromTo("#contact", { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.5 }, 0.5);
      }
    });

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion]);

  const showCanvas = !isMobile && !prefersReducedMotion;
  const showFallbackBird = isMobile || prefersReducedMotion;

  return (
    <>
      <style>{`
        @keyframes birdFlap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
        .bird-flap {
          animation: birdFlap 0.5s infinite ease-in-out;
          transform-origin: center;
        }
      `}</style>

      <div 
        ref={containerRef} 
        className={`relative w-full ${isMobile ? 'h-[60vh]' : 'h-[100vh]'} flex items-center justify-center overflow-hidden pointer-events-none z-20`}
      >
        {/* WebGL Scene for Desktop */}
        {showCanvas && (
          <div className="absolute inset-0 -z-0 pointer-events-none">
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 8, 70], fov: 60 }}>
              <MountainTerrain />
              <BirdMesh progressRef={progressRef} />
              <CameraFlight progressRef={progressRef} />
            </Canvas>
          </div>
        )}

        {/* Text Layers */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <h2 className="fly-through-text font-display text-[8rem] md:text-[12rem] font-bold text-white/50 tracking-tighter absolute">
              Portfolio
            </h2>
            <h2 className="settle-text-1 font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--warm-white)] tracking-tighter absolute drop-shadow-2xl">
              Let's Talk
            </h2>
            <h2 className="settle-text-2 font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--warm-white)] tracking-tighter absolute drop-shadow-2xl">
              Let's <span className="text-[var(--accent)] mx-1 font-light opacity-50">|</span> Talk
            </h2>
          </div>
        )}

        {/* 2D Bird Fallback for Mobile/Reduced Motion */}
        {showFallbackBird && (
          <div className="bird-wrapper absolute z-30 flex items-center justify-center">
            <div className="bird-flap">
              <svg 
                viewBox="0 0 100 100" 
                className="w-16 h-16 md:w-24 md:h-24 fill-[var(--accent)] drop-shadow-[0_0_20px_var(--accent)]"
                style={{ transform: "rotate(15deg)" }}
              >
                <path d="M 50 40 C 20 20 0 50 0 50 C 15 40 35 45 50 55 C 65 45 85 40 100 50 C 100 50 80 20 50 40 Z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
