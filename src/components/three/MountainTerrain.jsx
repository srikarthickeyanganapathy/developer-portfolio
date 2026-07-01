import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

// --- Noise Utility ---
function random(x, y) {
  const val = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return val - Math.floor(val);
}

function noise(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3.0 - 2.0 * fx);
  const uy = fy * fy * (3.0 - 2.0 * fy);
  
  const v1 = random(ix, iy);
  const v2 = random(ix + 1, iy);
  const v3 = random(ix, iy + 1);
  const v4 = random(ix + 1, iy + 1);
  
  const i1 = v1 * (1.0 - ux) + v2 * ux;
  const i2 = v3 * (1.0 - ux) + v4 * ux;
  return i1 * (1.0 - uy) + i2 * uy;
}

function fbm(x, y) {
  let v = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < 4; i++) {
    v += amp * noise(x * freq, y * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return v;
}

export default function MountainTerrain() {
  const geomRef = useRef(null);
  const matRef = useRef(null);

  const geometry = useMemo(() => {
    // 120x120 plane with 64x64 segments
    const geo = new THREE.PlaneGeometry(120, 120, 64, 64);
    geo.rotateX(-Math.PI / 2);
    
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      
      // Increased frequency for much sharper, jagged low-poly peaks
      let y = fbm(x * 0.15, z * 0.15) * 22;
      
      // Carve a narrower, deeper valley for the camera to fly through
      const valley = Math.min(1, Math.abs(x) / 10);
      const smoothValley = valley * valley * (3 - 2 * valley);
      y = y * smoothValley;
      
      pos.setY(i, y - 5);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      if (matRef.current) matRef.current.dispose();
    };
  }, [geometry]);

  return (
    <>
      <fogExp2 attach="fog" color="#080808" density={0.035} />
      
      <ambientLight intensity={0.4} color="#f0ece4" />
      
      {/* Key light for harsh, stylized rim highlights */}
      <directionalLight 
        color="#c8b8a0" 
        intensity={4} 
        position={[30, 15, -20]} 
      />
      
      {/* Fill light from the opposite side to prevent shadows from clipping to pure black, 
          which destroys depth perception and makes it look like a 2D image */}
      <directionalLight 
        color="#8a857d" 
        intensity={1.5} 
        position={[-30, 5, 20]} 
      />
      
      <mesh geometry={geometry} ref={geomRef}>
        <meshStandardMaterial 
          ref={matRef} 
          color="#0f0f0f" 
          roughness={0.8} 
          metalness={0.2}
          flatShading={true}
        />
      </mesh>
    </>
  );
}
