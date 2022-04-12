import React, { Suspense, useState } from "react";
import PlaneFlight from "../assets/3D/PlaneFlight";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutCamera, MotionCanvas } from "framer-motion-3d";
import FadeInOutWrapper from "./FadeInOutWrapper";

const Contact = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [nameValue, setNameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <motion.div
      className="section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      onViewportEnter={() => setShowAnimation(true)}
      onViewportLeave={() => setShowAnimation(false)}
      viewport={{ amount: 0.7, once: true }}
    >
      <div className="contact-header-wrapper">
        <FadeInOutWrapper once={false}>
          <h2>Contact</h2>
        </FadeInOutWrapper>
      </div>
      <AnimatePresence exitBeforeEnter>
        {!showForm ? (
          <MotionCanvas className="contact-canvas" exit={{ opacity: 0 }}>
            <LayoutCamera
              initial={false}
              animate={{ x: 0, y: 14, z: 8.5, fov: 80 }}
            />
            <Suspense fallback={null}>
              {showAnimation && <PlaneFlight clickHandler={handleShowForm} />}
            </Suspense>
            <ambientLight intensity={0.5} />
            <directionalLight />
          </MotionCanvas>
        ) : (
          <div className="contact-form-container">
            <div className="selection-wrapper">standard</div>
            <div className="selection-wrapper">paper</div>
            <form className="form-wrapper" onSubmit={() => handleSubmit()}>
              <label className="input-wrapper name">
                <span className="input-header">Name *</span>
                <input
                  className="input"
                  type="text"
                  value={nameValue}
                  required
                  spellCheck={false}
                  onChange={(e) => setNameValue(e.target.value)}
                ></input>
              </label>
              <label className="input-wrapper surname">
                <span className="input-header">Surname</span>
                <input
                  className="input"
                  type="text"
                  value={surnameValue}
                  spellCheck={false}
                  onChange={(e) => setSurnameValue(e.target.value)}
                ></input>
              </label>
              <label className="input-wrapper email">
                <span className="input-header">Email *</span>
                <input
                  className="input"
                  type="text"
                  value={emailValue}
                  required
                  spellCheck={false}
                  onChange={(e) => setEmailValue(e.target.value)}
                ></input>
              </label>
              <label className="input-wrapper subject">
                <span className="input-header subject">Subject *</span>
                <input
                  className="input"
                  type="text"
                  value={subjectValue}
                  required
                  spellCheck={false}
                  onChange={(e) => setSubjectValue(e.target.value)}
                ></input>
              </label>
              <label className="input-wrapper message">
                <span className="input-header subject">Message *</span>
                <textarea
                  className="message-input"
                  value={messageValue}
                  required
                  spellCheck={false}
                  onChange={(e) => setMessageValue(e.target.value)}
                ></textarea>
              </label>
            </form>
            <div className="send-wrapper">send</div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Contact;
