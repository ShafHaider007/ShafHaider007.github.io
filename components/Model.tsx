"use client"
import { useLoader, useFrame } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";
import { useRef } from "react";

export function Model() {
  const svgData = useLoader(SVGLoader, "/logo.svg");
  const shapes = svgData.paths.flatMap((path) => path.toShapes(true));

  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth: 10,
    bevelEnabled: false,
  });

  geometry.center();

  const mesh = useRef<THREE.Mesh>(null!);
  const scroll = useScroll();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = scroll.offset * Math.PI * 2;
      mesh.current.position.z = scroll.offset * 10;
    }
  });

  return (
    <mesh ref={mesh} geometry={geometry} scale={0.1}>
      <meshPhongMaterial attach="material" color="red" />
    </mesh>
  );
}