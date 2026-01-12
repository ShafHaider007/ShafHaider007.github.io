"use client"
import { useLoader, useFrame } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";
import { useRef } from "react";

export function Model() {
  const texture = useLoader(THREE.TextureLoader, "/earthmap2k.jpg");
  const mesh = useRef<THREE.Mesh>(null!);
  const scroll = useScroll();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = scroll.offset * Math.PI * 2;
    }
  });

  return (
    <mesh ref={mesh} scale={2.5}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}