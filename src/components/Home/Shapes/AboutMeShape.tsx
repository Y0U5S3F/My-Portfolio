import { Suspense } from "react";
import type { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Stage } from "@react-three/drei";

type AboutMeShapeProps = {
  className?: string;
  autoRotate?: boolean;
  scale?: number;
  position?: [number, number, number];
};

function Model({ scale = 1, position = [0, 0, 0] }: Partial<AboutMeShapeProps>) {
  const gltf = useGLTF("/3dModels/computer/scene.gltf") as any;
  return <primitive object={gltf.scene} scale={scale} position={position} />;
}

const AboutMeShape: FC<AboutMeShapeProps> = ({
  // change default to fill parent
  className = "w-full h-full",
  autoRotate = true,
  scale = 1,
  position = [0, 0, 0],
}) => {
  return (
    // ensure the wrapper actually has full width/height and is a flex center
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 0, // helps with flex parents
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas
        // force canvas to fill the wrapper
        style={{ width: "100%", height: "100%", display: "block" }}
        camera={{ position: [0, 0, 4], fov: 45 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />

        <Suspense fallback={null}>
          <Stage intensity={0.5} shadows={false}>
            <Float rotationIntensity={0.2} floatIntensity={0.8}>
              <Model scale={scale} position={position} />
            </Float>
          </Stage>
        </Suspense>

        <OrbitControls enablePan={false} enableZoom={false} autoRotate={autoRotate} />
      </Canvas>
    </div>
  );
};

useGLTF.preload("/3dModels/computer/scene.gltf");

export default AboutMeShape;