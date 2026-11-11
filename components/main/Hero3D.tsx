"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/** The glowing, distorted core that reacts to the cursor + scroll. */
function Core() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (group.current) {
      const targetY = pointer.x * 0.6;
      const targetX = -pointer.y * 0.4;
      group.current.rotation.y +=
        (targetY - group.current.rotation.y) * 0.05 + delta * 0.05;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.1}>
        {/* soft halo (fake bloom, no postprocessing dependency) */}
        <mesh scale={1.9}>
          <sphereGeometry args={[1.25, 32, 32]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.12} />
        </mesh>

        {/* solid distorted core */}
        <Icosahedron args={[1.25, 12]}>
          <MeshDistortMaterial
            color="#7c5cff"
            emissive="#3b82f6"
            emissiveIntensity={0.45}
            roughness={0.18}
            metalness={0.55}
            distort={0.42}
            speed={1.8}
          />
        </Icosahedron>

        {/* faceted wireframe shell */}
        <Icosahedron args={[1.7, 1]}>
          <meshBasicMaterial color="#14b8a6" wireframe transparent opacity={0.25} />
        </Icosahedron>
      </Float>
    </group>
  );
}

/**
 * Deterministic PRNG (mulberry32). The dust field used Math.random() inside a
 * useMemo, which runs during render — react-hooks/purity flags that, and it is
 * a real hazard rather than a lint nit: an unmemoized re-render would hand the
 * geometry a brand new particle cloud and the dust would visibly jump. Seeding
 * makes the field pure, identical every render, and identical between server
 * and client.
 */
function makeRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DUST_POSITIONS = (() => {
  const rand = makeRandom(0x5eed);
  const count = 700;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 2.2 + rand() * 2.4;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
})();

/** Orbiting particle dust around the core. */
function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = DUST_POSITIONS;

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#7c5cff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

const Hero3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={2.4} color="#ffffff" />
        <pointLight position={[-4, -2, -3]} intensity={3} color="#14b8a6" />
        <pointLight position={[4, -3, 2]} intensity={2} color="#d946ef" />
        <Core />
        <Dust />
      </Suspense>
    </Canvas>
  );
};

export default Hero3D;
