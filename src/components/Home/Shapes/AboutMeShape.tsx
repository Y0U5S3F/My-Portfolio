import { Suspense, memo, useRef } from "react";
import type { FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type AboutMeShapeProps = {
  autoRotate?: boolean;
  scale?: number;
  position?: [number, number, number];
};

function Model({ scale = 1, position = [0, 0, 0] }: Partial<AboutMeShapeProps>) {
  const gltf = useGLTF("/3dModels/computer/scene.gltf") as any;
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    }
  });

  return (
    <group ref={meshRef}>
      <primitive object={gltf.scene} scale={scale} position={position} />
    </group>
  );
}

const AboutMeShape: FC<AboutMeShapeProps> = memo(({
  scale = 1,
  position = [0, 0, 0] as [number, number, number],
}) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{
        powerPreference: "high-performance",
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.setAnimationLoop(null);
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.0} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      <Suspense fallback={null}>
        <Model scale={scale} position={position} />
      </Suspense>
    </Canvas>
  );
});

AboutMeShape.displayName = "AboutMeShape";

useGLTF.preload("/3dModels/computer/scene.gltf");

export default AboutMeShape;