import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { reportCheckpoint } from "../../lib/loadingProgress";

// Simple noise functions for smooth dunes
function random(x, y) {
  return Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123 % 1;
}

function noise(x, y) {
  const iX = Math.floor(x);
  const iY = Math.floor(y);
  const fX = x - iX;
  const fY = y - iY;

  const a = random(iX, iY);
  const b = random(iX + 1, iY);
  const c = random(iX, iY + 1);
  const d = random(iX + 1, iY + 1);

  const u = fX * fX * (3.0 - 2.0 * fX);
  const v = fY * fY * (3.0 - 2.0 * fY);

  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

function fbm(x, y) {
  let v = 0;
  let a = 0.5;
  let shift = 100.0;
  for (let i = 0; i < 4; i++) {
    v += a * noise(x, y);
    x = x * 2.0 + shift;
    y = y * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

const colorBase = new THREE.Color("#080808");
const colorMid = new THREE.Color("#1a1815");
const colorHighlight = new THREE.Color("#c8b8a0");

export default function AbstractDunes() {
  const geomRef = useRef(null);
  const matRef = useRef(null);

  const geometry = useMemo(() => {
    // 150x150 plane for a vast landscape
    const geo = new THREE.PlaneGeometry(150, 150, 80, 80);
    geo.rotateX(-Math.PI / 2);
    
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const color = new THREE.Color();
    
    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      
      // Much lower frequency for smooth, rolling abstract dunes instead of sharp mountains
      let y = fbm(x * 0.05, z * 0.05) * 15;
      
      // Carve a smooth central channel for the flight path
      const valley = Math.min(1, Math.abs(x) / 15);
      const smoothValley = valley * valley * (3 - 2 * valley);
      y = y * smoothValley;
      
      const finalY = y - 5;
      pos.setY(i, finalY);
      
      if (finalY < minY) minY = finalY;
      if (finalY > maxY) maxY = finalY;
    }
    
    // Apply vertex colors based on height to highlight the ridges
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const h = Math.max(0, Math.min(1, (y - minY) / (maxY - minY)));
      
      if (h < 0.4) {
        color.copy(colorBase).lerp(colorMid, h / 0.4);
      } else if (h < 0.8) {
        color.copy(colorMid).lerp(colorHighlight, (h - 0.4) / 0.4);
      } else {
        color.copy(colorHighlight);
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  useEffect(() => {
    reportCheckpoint("terrain-geometry-built");
    return () => {
      geometry.dispose();
      if (matRef.current) matRef.current.dispose();
    };
  }, [geometry]);

  return (
    <>
      <fogExp2 attach="fog" color="#080808" density={0.025} />
      
      <ambientLight intensity={0.6} color="#f0ece4" />
      
      {/* Sleek, dramatic lighting for an abstract tech feel */}
      <directionalLight 
        color="#c8b8a0" 
        intensity={3} 
        position={[40, 20, -30]} 
      />
      <directionalLight 
        color="#8a857d" 
        intensity={1} 
        position={[-40, 10, 30]} 
      />
      
      <mesh geometry={geometry} ref={geomRef}>
        <meshStandardMaterial 
          ref={matRef} 
          color="#151515" 
          roughness={0.4} // Smoother and slightly glossy for a premium feel
          metalness={0.6} // More metallic
          flatShading={false} // Smooth shading for dunes!
          vertexColors={true}
          wireframe={false} // Kept solid, but glossy
        />
      </mesh>
    </>
  );
}
