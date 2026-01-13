'use client'
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll, useCursor } from "@react-three/drei";
import { useRef, useState } from "react";

export function Model() {
  const texture = useLoader(THREE.TextureLoader, "/earthmap2k.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  const mesh = useRef<THREE.Mesh>(null!);
  const scroll = useScroll();
  const [hovered, setHover] = useState(false);

  useCursor(hovered, 'pointer', 'auto')

  useFrame((state, delta) => {
    if (mesh.current) {
      // Interaction: Speed up rotation on hover
      const rotationSpeed = hovered ? 0.5 : 0.1;
      mesh.current.rotation.y += delta * rotationSpeed;

      // Scroll-based animation
      const offset = scroll.offset; // 0 to 1

      // Dynamic Rotation: Spin faster as you scroll down
      mesh.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 0.15, offset); // Tilt slightly
      mesh.current.rotation.y += offset * delta * 1.5;

      // Camera Animation Path Sync with Hero Sections
      // 0.0 - 0.3: Hero (Full Stack WebGIS) -> Centered, impressive
      // 0.3 - 0.6: Apps (Industry) -> Side/Angled view, closer look
      // 0.6 - 1.0: Geoportals (Global) -> High orbit, top down view

      if (offset < 0.3) {
        // Phase 1: Main Title - Stable Orbit
        const t = offset / 0.3;
        state.camera.position.z = THREE.MathUtils.lerp(18, 14, t);
        state.camera.position.x = THREE.MathUtils.lerp(0, 2, t);
        state.camera.position.y = THREE.MathUtils.lerp(0, 0, t);
      } else if (offset < 0.6) {
        // Phase 2: Industry Apps - Inspection Angle (Side)
        const t = (offset - 0.3) / 0.3;
        state.camera.position.z = THREE.MathUtils.lerp(14, 10, t);
        state.camera.position.x = THREE.MathUtils.lerp(2, -6, t); // Move left to give space for right-aligned text
        state.camera.position.y = THREE.MathUtils.lerp(0, -2, t);
        state.camera.lookAt(2, 0, 0); // Look back at center
      } else {
        // Phase 3: Geoportals - High Orbit / Global View
        const t = (offset - 0.6) / 0.4;
        state.camera.position.z = THREE.MathUtils.lerp(10, 22, t); // Zoom way out
        state.camera.position.x = THREE.MathUtils.lerp(-6, 0, t);
        state.camera.position.y = THREE.MathUtils.lerp(-2, 8, t); // Top down
        state.camera.lookAt(0, 0, 0);
      }
    }
  });

  return (
    <mesh
      ref={mesh}
      scale={3.8}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.5}
        metalness={0.1}
        emissive={new THREE.Color("#2563eb")} // Corporate Blue Glow
        emissiveMap={texture}
        emissiveIntensity={hovered ? 2.0 : 1.5}
        wireframe={false}
        color="#ffffff" // Tint it white/light
      />
    </mesh>
  );
}