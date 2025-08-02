"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props: any) => {
  const ref = useRef<any>();
  
  // 🌟 Reduced number of stars for better performance
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(3000), { radius: 1.5 })
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.02; // ✨ Slower, smoother rotation
      ref.current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3} // Corrected (not 30!)
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#CCCCCC" // Fixed typo: it was "$ccc" (invalid color)
          size={0.005}
          sizeAttenuation
          depthWrite={false} // Fixed typo: it was "dethWrite"
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 z-[20]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;
