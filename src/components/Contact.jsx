import React, { Suspense, useState } from "react";
import PlaneFlight from "../assets/3D/PlaneFlight";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutCamera, MotionCanvas } from "framer-motion-3d";
import { FadeInOutWrapper, ContactForm, Toolbox } from "../components";

const Contact = () => {
  const [playAnimation, setPlayAnimation] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [selectedColor, setSelectedColor] = useState("black");

  const handleHideAnimation = () => {
    setShowAnimation(false);
  };

  const handleChangeColor = (color) => {
    setSelectedColor(color);
  };

  return (
    <motion.div
      className="section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      onViewportEnter={() => setPlayAnimation(true)}
      onViewportLeave={() => setPlayAnimation(false)}
      viewport={{ amount: 0.7, once: true }}
    >
      <div className="contact-header-wrapper">
        <FadeInOutWrapper once>
          <h2>Contact</h2>
        </FadeInOutWrapper>
      </div>
      <AnimatePresence exitBeforeEnter>
        {showAnimation ? (
          <MotionCanvas className="contact-canvas" exit={{ opacity: 0 }}>
            <LayoutCamera
              initial={false}
              animate={{ x: 0, y: 14, z: 8.5, fov: 80 }}
            />
            <Suspense fallback={null}>
              {playAnimation && (
                <PlaneFlight clickHandler={handleHideAnimation} />
              )}
            </Suspense>
            <ambientLight intensity={0.5} />
            <directionalLight />
          </MotionCanvas>
        ) : (
          <>
            <ContactForm
              selectedColor={selectedColor}
              handleChangeColor={setSelectedColor}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Contact;
