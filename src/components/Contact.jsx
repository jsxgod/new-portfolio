import React, { Suspense, useState } from "react";
import PlaneFlight from "../assets/3D/PlaneFlight";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutCamera, MotionCanvas } from "framer-motion-3d";
import FadeInOutWrapper from "./FadeInOutWrapper";
import { ReactComponent as Crayon } from "../assets/crayon.svg";
import DrawingCanvas from "./DrawingCanvas";

const CustomLabel = (props) => {
  return (
    <label
      className={`input-wrapper ${props.name}`}
      onMouseEnter={() => {
        document.querySelector(".custom-cursor").classList.add("medium");
      }}
      onMouseLeave={() => {
        document.querySelector(".custom-cursor").classList.remove("medium");
      }}
      onMouseDown={() => {
        document.querySelector(".custom-cursor").classList.remove("medium");
      }}
    >
      <span className="input-header">{`${props.name[0].toUpperCase()}${props.name.slice(
        1
      )}${props.required ? " *" : ""}`}</span>
      <input
        className="input"
        type="text"
        value={props.value}
        required={props.required}
        spellCheck={false}
        onChange={(e) => props.handler(e.target.value)}
      ></input>
      <span className="border"></span>
    </label>
  );
};

const Contact = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showForm, setShowForm] = useState(false);
  // 0 - left, 1 - right
  const [selectedSide, setSelectedSide] = useState(0);
  const [selectedTool, setSelectedTool] = useState("black");

  const [nameValue, setNameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const handleShowForm = () => {
    setShowForm(true);
  };

  const switchSide = (n) => {
    setSelectedSide(n);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name: nameValue,
      surname: surnameValue,
      email: emailValue,
      subject: subjectValue,
      message: messageValue,
    };
    console.log(formData);
  };

  const handleSaveImage = () => {};

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
        <FadeInOutWrapper once>
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
          <div
            className={`contact-form-container ${
              selectedSide === 0 ? "noise" : "paper"
            }`}
          >
            <div
              className={`selection-wrapper ${
                selectedSide === 0 ? "active" : ""
              }`}
            >
              <span
                onMouseEnter={() => {
                  document
                    .querySelector(".custom-cursor")
                    .classList.add("medium");
                }}
                onMouseLeave={() => {
                  document
                    .querySelector(".custom-cursor")
                    .classList.remove("medium");
                }}
                onMouseDown={() => {
                  document
                    .querySelector(".custom-cursor")
                    .classList.remove("medium");
                }}
                onClick={() => switchSide(0)}
              >
                standard
                {selectedSide === 0 && (
                  <motion.div
                    className="underline"
                    layoutId="underline"
                  ></motion.div>
                )}
              </span>
            </div>
            <div
              className={`selection-wrapper ${
                selectedSide === 1 ? "active" : ""
              }`}
            >
              <span
                onMouseEnter={() => {
                  document
                    .querySelector(".custom-cursor")
                    .classList.add("medium");
                }}
                onMouseLeave={() => {
                  document
                    .querySelector(".custom-cursor")
                    .classList.remove("medium");
                }}
                onMouseDown={() => {
                  document
                    .querySelector(".custom-cursor")
                    .classList.remove("medium");
                }}
                onClick={() => switchSide(1)}
              >
                paper
                {selectedSide === 1 && (
                  <motion.div
                    className="underline"
                    layoutId="underline"
                  ></motion.div>
                )}
              </span>
            </div>
            {selectedSide === 0 ? (
              <form
                id="contact-form"
                className="form-wrapper"
                onSubmit={(e) => handleSubmit(e)}
              >
                <CustomLabel
                  name={"name"}
                  value={nameValue}
                  required
                  handler={setNameValue}
                ></CustomLabel>
                <CustomLabel
                  name={"surname"}
                  value={surnameValue}
                  handler={setSurnameValue}
                ></CustomLabel>
                <CustomLabel
                  name={"email"}
                  value={emailValue}
                  required
                  handler={setEmailValue}
                ></CustomLabel>
                <CustomLabel
                  name={"subject"}
                  value={subjectValue}
                  required
                  handler={setSubjectValue}
                ></CustomLabel>
                <label
                  className="input-wrapper message"
                  onMouseEnter={() => {
                    document
                      .querySelector(".custom-cursor")
                      .classList.add("medium");
                  }}
                  onMouseLeave={() => {
                    document
                      .querySelector(".custom-cursor")
                      .classList.remove("medium");
                  }}
                  onMouseDown={() => {
                    document
                      .querySelector(".custom-cursor")
                      .classList.remove("medium");
                  }}
                >
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
            ) : (
              <div className="paper-note-wrapper">
                <AnimatePresence>
                  <DrawingCanvas color={selectedTool} />
                </AnimatePresence>
                <span className="save-info">
                  <FadeInOutWrapper>
                    Note: save before switching back to the form !
                  </FadeInOutWrapper>
                </span>
              </div>
            )}
            {selectedSide === 0 ? (
              <div className="send-wrapper">
                <input
                  className="send-button"
                  type="submit"
                  value="send"
                  form="contact-form"
                  onMouseEnter={() => {
                    document
                      .querySelector(".custom-cursor")
                      .classList.add("medium");
                  }}
                  onMouseLeave={() => {
                    document
                      .querySelector(".custom-cursor")
                      .classList.remove("medium");
                  }}
                  onMouseDown={() => {
                    document
                      .querySelector(".custom-cursor")
                      .classList.remove("medium");
                  }}
                />
              </div>
            ) : (
              <div className="send-wrapper">
                <button
                  className="send-button"
                  onMouseEnter={() => {
                    document
                      .querySelector(".custom-cursor")
                      .classList.add("medium");
                  }}
                  onMouseLeave={() => {
                    document
                      .querySelector(".custom-cursor")
                      .classList.remove("medium");
                  }}
                  onMouseDown={() => {
                    document
                      .querySelector(".custom-cursor")
                      .classList.remove("medium");
                  }}
                  onClick={() => handleSaveImage()}
                >
                  save
                </button>
              </div>
            )}
          </div>
        )}

        {selectedSide === 1 && (
          <div className="toolbox-wrapper">
            {[
              "black",
              "#c2cece",
              "#b72124",
              "pink",
              "orange",
              "yellow",
              "lightgreen",
              "lightblue",
            ].map((color) => (
              <motion.div
                className={`pen-wrapper ${
                  selectedTool === color ? "active" : ""
                }`}
                key={color}
                animate={selectedTool === color ? { marginRight: 100 } : {}}
                whileHover={selectedTool === color ? {} : { marginRight: 50 }}
                onClick={() => {
                  setSelectedTool(color);
                }}
              >
                <Crayon
                  fill={color}
                  stroke={color === "black" ? "white" : ""}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Contact;
