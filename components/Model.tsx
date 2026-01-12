"use client"
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";
import { useRef } from "react";

export function Model() {
  const texture = useLoader(THREE.TextureLoader, "/earthmap2k.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  const mesh = useRef<THREE.Mesh>(null!);
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (mesh.current) {
      // Base rotation - always spinning slowly
      mesh.current.rotation.y += delta * 0.1;

      // Scroll-based animation
      const offset = scroll.offset; // 0 to 1

      // Dynamic Rotation: Spin faster as you scroll down
      mesh.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 0.25, offset);
      mesh.current.rotation.y += offset * delta * 2.0; // Speed up rotation on scroll

      // Camera Animation Path
      // 0.0 - 0.3: Hero -> Zoom In
      // 0.3 - 0.6: About -> Pan Side
      // 0.6 - 1.0: Projects -> Pull Back & Tilt

      if (offset < 0.3) {
        // Phase 1: Zoom In
        const t = offset / 0.3;
        state.camera.position.z = THREE.MathUtils.lerp(20, 8, t);
        state.camera.position.y = THREE.MathUtils.lerp(0, 0, t);
        state.camera.position.x = THREE.MathUtils.lerp(0, 3, t);
      } else if (offset < 0.6) {
        // Phase 2: Side View / Inspection
        const t = (offset - 0.3) / 0.3;
        state.camera.position.z = THREE.MathUtils.lerp(8, 12, t);
        state.camera.position.x = THREE.MathUtils.lerp(3, -5, t); // Pan across
        state.camera.position.y = THREE.MathUtils.lerp(0, 2, t);
      } else {
        // Phase 3: High Orbit
        const t = (offset - 0.6) / 0.4;
        state.camera.position.z = THREE.MathUtils.lerp(12, 18, t);
        state.camera.position.x = THREE.MathUtils.lerp(-5, 0, t);
        state.camera.position.y = THREE.MathUtils.lerp(2, 6, t); // Look from above
      }

      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <mesh ref={mesh} scale={3.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.6}
        metalness={0.4}
        emissive={new THREE.Color("#4a00e0")} // Electric Purple Glow
        emissiveMap={texture}
        emissiveIntensity={0.8} // High intensity for "Maximalist" feel
        wireframe={false}
      />
    </mesh>
  );
}