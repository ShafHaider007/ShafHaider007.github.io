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
      // Gentle rotation
      mesh.current.rotation.y += delta * 0.05;

      // Scroll-based animation
      const offset = scroll.offset;
      mesh.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 0.1, offset);
      state.camera.position.z = THREE.MathUtils.lerp(20, 10, offset);
      state.camera.position.y = THREE.MathUtils.lerp(0, 2, offset);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <mesh ref={mesh} scale={3}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.4}
        metalness={0.1}
        emissive={new THREE.Color("#333")}
        emissiveMap={texture}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}