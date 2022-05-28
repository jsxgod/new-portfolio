import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import textureImage from "../../assets/splash-mirror.jpg";

const Wave = () => {
  const materialRef = useRef();

  useFrame(({ clock }) => {
    materialRef.current.uTime = clock.getElapsedTime();
  });

  const imageTexture = useLoader(THREE.TextureLoader, textureImage);
  const { degToRad } = THREE.MathUtils;

  return (
    <mesh rotation={[0.0, 0.0, degToRad(90)]}>
      <planeBufferGeometry args={[1.05, 1.65, 16, 16]} />
      <customShaderMaterial
        uColor="blue"
        ref={materialRef}
        uTexture={imageTexture}
        uSlowDownFactor={5.0}
      />
    </mesh>
  );
};

export default Wave;
