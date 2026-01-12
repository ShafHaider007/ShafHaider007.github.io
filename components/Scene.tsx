"use client"
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Text } from "@react-three/drei";
import { Model } from "./Model";
import { Suspense } from "react";

const Loading = () => {
  return (
    <Text>
      Loading...
    </Text>
  );
};

const SceneContent = () => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    <Model />
  </>
);

export function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 20] }} style={{ background: 'none' }}>
        <Suspense fallback={<Loading />}>
          <ScrollControls pages={3} damping={0.1}>
            <SceneContent />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}