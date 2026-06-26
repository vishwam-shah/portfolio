"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-expect-error - no types for the maath subpath
import * as random from "maath/random/dist/maath-random.esm";
import type { Points as ThreePoints } from "three";

/** Slowly revolving particle "universe", tuned to read on a light background. */
function StarField() {
  const ref = useRef<ThreePoints>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(2400), { radius: 1.4 })
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.015;
      ref.current.rotation.y -= delta * 0.025;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#7c5cff"
          size={0.0045}
          sizeAttenuation
          depthWrite={false}
          opacity={0.55}
        />
      </Points>
    </group>
  );
}

const StarsBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-[1]">
    <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <StarField />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsBackground;
