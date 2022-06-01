import React, { Suspense } from "react";
import { extend } from "@react-three/fiber";
import CustomShaderMaterial from "../../shaders/CustomShaderMaterial";
import Wave from "./Wave";
import { MotionCanvas } from "framer-motion-3d";
extend({ CustomShaderMaterial });

const Scene = () => {
  return (
    <MotionCanvas camera={{ fov: 10 }}>
      <Suspense fallback={null}>
        <Wave cancelNoise={window.innerWidth <= 768} />
      </Suspense>
    </MotionCanvas>
  );
};

export default Scene;
