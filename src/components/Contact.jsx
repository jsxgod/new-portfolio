import React, { Suspense, useState } from "react";
import PlaneFlight from "../assets/3D/PlaneFlight";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutCamera, MotionCanvas } from "framer-motion-3d";
import { FadeInOutWrapper, ContactForm } from "../components";

const Contact = () => {
  const [playAnimation, setPlayAnimation] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [selectedColor, setSelectedColor] = useState("black");

  const handleHideAnimation = () => {
    setShowAnimation(false);
  };

  return (
    <motion.div
      className="section"
      id={"contact-section"}
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
            <div className="contact-info-wrapper">
              <FadeInOutWrapper gentle>
                <p>
                  Do you have a job offer for me? Do you want to build a website
                  together? Simply want to get in touch? Whatever it is you are
                  reaching out to me I will make sure to respond as quickly as
                  possible.
                </p>
                <p>
                  Feel free to draw a note or a doodle you would like to attach
                  by using the paper tab next to the form tab. Make sure to save
                  it before sending.
                </p>
              </FadeInOutWrapper>
            </div>
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
