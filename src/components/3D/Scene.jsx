import React, { Suspense } from "react";
import { Canvas, extend } from "@react-three/fiber";
import CustomShaderMaterial from "../../shaders/CustomShaderMaterial";
import Wave from "./Wave";
import { MotionCanvas } from "framer-motion-3d";
extend({ CustomShaderMaterial });

const Scene = () => {
  return (
    <MotionCanvas camera={{ fov: 10 }}>
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </MotionCanvas>
  );
};

export default Scene;
