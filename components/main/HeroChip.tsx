"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  Lightformer,
  Float,
  ContactShadows,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

/* ----------------------------------------------------------------- pins ---- */

function Pins({ material }: { material: THREE.Material }) {
  const count = 11;
  const span = 2.5;
  const pins = useMemo(() => {
    const arr: { key: string; pos: [number, number, number]; size: [number, number, number] }[] = [];
    for (let i = 0; i < count; i++) {
      const p = -span / 2 + (span / (count - 1)) * i;
      arr.push({ key: `t${i}`, pos: [p, 1.62, 0], size: [0.09, 0.22, 0.07] });
      arr.push({ key: `b${i}`, pos: [p, -1.62, 0], size: [0.09, 0.22, 0.07] });
      arr.push({ key: `l${i}`, pos: [-1.62, p, 0], size: [0.22, 0.09, 0.07] });
      arr.push({ key: `r${i}`, pos: [1.62, p, 0], size: [0.22, 0.09, 0.07] });
    }
    return arr;
  }, []);

  return (
    <group>
      {pins.map((pin) => (
        <mesh key={pin.key} position={pin.pos} material={material} castShadow>
          <boxGeometry args={pin.size} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------------------------------------------------------- wires ---- */

type WireDef = {
  points: [number, number, number][];
  color: string;
  speed: number;
  offset: number;
};

const wireDefs: WireDef[] = [
  { points: [[1.5, 0.9, 0.05], [2.5, 1.3, -0.5], [3.4, 0.9, -1.2]], color: "#7c5cff", speed: 0.32, offset: 0 },
  { points: [[1.5, -0.5, 0.05], [2.7, -0.9, -0.4], [3.6, -1.4, -1.0]], color: "#14b8a6", speed: 0.24, offset: 0.4 },
  { points: [[-1.5, 0.5, 0.05], [-2.6, 0.9, -0.5], [-3.5, 1.5, -1.1]], color: "#5b7bff", speed: 0.28, offset: 0.7 },
  { points: [[-1.5, -0.8, 0.05], [-2.5, -1.2, -0.4], [-3.3, -0.8, -1.3]], color: "#7c5cff", speed: 0.3, offset: 0.2 },
  { points: [[0.7, 1.55, 0.05], [1.0, 2.5, -0.6], [0.4, 3.4, -1.2]], color: "#14b8a6", speed: 0.26, offset: 0.9 },
  { points: [[-0.6, -1.55, 0.05], [-1.0, -2.5, -0.5], [-0.4, -3.3, -1.1]], color: "#5b7bff", speed: 0.34, offset: 0.55 },
];

function Wire({ def }: { def: WireDef }) {
  const dotRef = useRef<THREE.Mesh>(null);
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        def.points.map((p) => new THREE.Vector3(...p))
      ),
    [def]
  );
  const geom = useMemo(() => new THREE.TubeGeometry(curve, 48, 0.045, 10, false), [curve]);
  const endNode = useMemo(() => curve.getPointAt(1), [curve]);

  useFrame((state) => {
    if (!dotRef.current) return;
    const t = (state.clock.elapsedTime * def.speed + def.offset) % 1;
    dotRef.current.position.copy(curve.getPointAt(t));
  });

  return (
    <group>
      {/* insulated wire */}
      <mesh geometry={geom} castShadow>
        <meshStandardMaterial color="#2a2740" metalness={0.7} roughness={0.45} envMapIntensity={1} />
      </mesh>
      {/* endpoint connector */}
      <mesh position={endNode}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={def.color} emissive={def.color} emissiveIntensity={1.6} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* travelling current pulse */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={def.color} emissive={def.color} emissiveIntensity={4} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ----------------------------------------------------------------- chip ---- */

function Chip() {
  const group = useRef<THREE.Group>(null);
  const die = useRef<THREE.MeshStandardMaterial>(null);
  const { pointer } = useThree();

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#caa24a",
        metalness: 1,
        roughness: 0.34,
        envMapIntensity: 1.3,
      }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      const targetY = pointer.x * 0.4;
      const targetX = -pointer.y * 0.3;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
    }
    if (die.current) {
      die.current.emissiveIntensity = 1.1 + Math.sin(t * 2.2) * 0.55;
    }
  });

  return (
    <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={group}>
        {/* package substrate, standing vertical, facing the camera */}
        <RoundedBox args={[3.1, 3.1, 0.34]} radius={0.08} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial color="#12121a" roughness={0.62} metalness={0.45} envMapIntensity={0.8} />
        </RoundedBox>

        {/* inner bezel */}
        <RoundedBox args={[2.5, 2.5, 0.36]} radius={0.06} smoothness={4} position={[0, 0, 0.01]}>
          <meshStandardMaterial color="#1b1626" roughness={0.5} metalness={0.7} />
        </RoundedBox>

        {/* brushed metal frame around the die */}
        <RoundedBox args={[2.05, 2.05, 0.16]} radius={0.05} smoothness={4} position={[0, 0, 0.16]} castShadow>
          <meshStandardMaterial color="#c7cad4" roughness={0.26} metalness={1} envMapIntensity={1.4} />
        </RoundedBox>

        {/* glowing AI die */}
        <RoundedBox args={[1.5, 1.5, 0.1]} radius={0.04} smoothness={3} position={[0, 0, 0.26]}>
          <meshStandardMaterial
            ref={die}
            color="#241a45"
            emissive="#7c5cff"
            emissiveIntensity={1.3}
            roughness={0.32}
            metalness={0.55}
          />
        </RoundedBox>

        <Suspense fallback={null}>
          <Text
            position={[0, 0, 0.33]}
            fontSize={0.7}
            letterSpacing={-0.02}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            AI
          </Text>
        </Suspense>

        <Pins material={goldMat} />

        {wireDefs.map((def, i) => (
          <Wire key={i} def={def} />
        ))}
      </group>
    </Float>
  );
}

/* ---------------------------------------------------------------- scene ---- */

const HeroChip = () => {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0.3, 6.4], fov: 34 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-4, 2, 2]} intensity={45} color="#7c5cff" />
        <pointLight position={[4, -1, 3]} intensity={30} color="#14b8a6" />

        <Suspense fallback={null}>
          <Chip />
          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 4, 3]} scale={[7, 7, 1]} color="#ffffff" />
            <Lightformer intensity={1.4} position={[-4, 1, 3]} scale={[3, 3, 1]} color="#a78bfa" />
            <Lightformer intensity={1.2} position={[4, 1, 3]} scale={[3, 3, 1]} color="#5eead4" />
          </Environment>
        </Suspense>

        <ContactShadows position={[0, -2.4, 0]} opacity={0.3} scale={10} blur={2.8} far={4} color="#1b1530" />
      </Canvas>
    </div>
  );
};

export default HeroChip;
