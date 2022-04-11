import React, { Suspense, useState } from "react";
import PlaneFlight from "../assets/3D/PlaneFlight";
import { motion } from "framer-motion";
import { LayoutCamera, MotionCanvas } from "framer-motion-3d";

const Contact = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  return (
    <motion.div
      className="section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      onViewportEnter={() => setShowAnimation(true)}
      onViewportLeave={() => setShowAnimation(false)}
      viewport={{ amount: 0.8, once: true }}
    >
      <MotionCanvas className="contact-canvas">
        <LayoutCamera
          initial={false}
          animate={{ x: 0, y: 14, z: 8.5, fov: 80 }}
        />
        <Suspense fallback={null}>{showAnimation && <PlaneFlight />}</Suspense>
        <ambientLight intensity={0.5} />
        <directionalLight />
      </MotionCanvas>
    </motion.div>
  );
};

export default Contact;
