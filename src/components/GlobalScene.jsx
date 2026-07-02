import React, { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import AbstractDunes from "./three/AbstractDunes";

function GlobalCameraFlight() {
  useFrame((state) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, window.scrollY / (maxScroll || 1)));
    
    const easeP = p * p * (3 - 2 * p);
    
    const targetZ = 60 - easeP * 100;
    const targetY = 15 - easeP * 10;
    
    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 1.5) * 0.3;
    
    state.camera.position.lerp(new THREE.Vector3(0, targetY + floatY, targetZ), 0.1);
    
    const lookZ = targetZ - 30;
    const lookY = targetY - 5;
    state.camera.lookAt(0, lookY, lookZ);
  });
  return null;
}

export default function GlobalScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile || prefersReducedMotion === true) {
    return null; 
  }

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[var(--warm-black)]">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 15, 60], fov: 60 }}>
        <AbstractDunes />
        <GlobalCameraFlight />
      </Canvas>
    </div>
  );
}
