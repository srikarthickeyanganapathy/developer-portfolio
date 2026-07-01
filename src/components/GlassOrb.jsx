import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Sphere } from '@react-three/drei';

function OrbMesh() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshTransmissionMaterial
        backside
        backsideThickness={2}
        thickness={1.5}
        roughness={0.2}
        transmission={0.7}
        transparent
        opacity={0.4}
        ior={1.2}
        chromaticAberration={0.4}
        color="#c8b8a0"
      />
    </Sphere>
  );
}

export default function GlassOrb() {
  const [isInView, setIsInView] = useState(true);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || reducedMotion) {
      setIsLowEnd(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (isLowEnd) {
    return (
      <div className="absolute right-1/4 top-1/3 w-48 h-48 bg-[radial-gradient(circle,_var(--glow-primary)_0%,_transparent_70%)] blur-3xl opacity-15 pointer-events-none" />
    );
  }

  return (
    <div ref={containerRef} className="absolute right-1/4 top-1/3 w-48 h-48 z-0 mix-blend-screen pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.5]}
          frameloop={isInView ? "always" : "demand"}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 3.5], fov: 45 }}
        >
          <ambientLight intensity={1.5} color="#c8b8a0" />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#f0ece4" />
          <OrbMesh />
        </Canvas>
      </Suspense>
    </div>
  );
}
