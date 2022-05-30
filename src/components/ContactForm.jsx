import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CustomLabel,
  DrawingCanvas,
  FadeInOutWrapper,
  MouseInteractionWrapper,
} from "../components";
import * as htmlToImage from "html-to-image";
import Toolbox from "./Toolbox";
import axios from "axios";

const ContactForm = ({
  selectedColor,
  handleChangeColor,
  handleEmailSent,
  dimensions,
}) => {
  const canvasData = useRef(null);
  const [selectedSide, setSelectedSide] = useState("left");
  const [loadForEdit, setLoadForEdit] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);
  const canvasBlobRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowLoading(true);
    const formData = {
      name,
      surname,
      email,
      subject,
      message,
      attachment: canvasBlobRef.current !== null ? canvasBlobRef.current : "",
    };
    axios
      .post("https://emailserver-ksdev.herokuapp.com/api/email", formData, {
        headers: { "content-type": "application/json" },
        timeout: 30000,
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          setTimeout(() => {
            clearForm();
            setShowLoading(false);
            setEmailSent(true);
          }, 3500);
        }
      })
      .catch((error) => {
        console.log("ERROR: %s", error);
      });
  };

  const switchSide = (side) => {
    setSelectedSide(side);
  };

  useEffect(() => {
    setLoadForEdit(false);
    if (!canvasData.current) {
      return;
    }
    if (selectedSide === "right") {
      return;
    }
    const editTooltip = document.createElement("div");
    editTooltip.className = "edit-tooltip-wrapper";
    const editSpan = document.createElement("span");
    editSpan.textContent = "edit";
    editSpan.addEventListener("click", (e) => {
      handleEdit();
    });
    editSpan.addEventListener("mouseenter", (e) => {
      document.querySelector(".custom-cursor").classList.add("medium");
    });

    editSpan.addEventListener("mouseleave", (e) => {
      document.querySelector(".custom-cursor").classList.remove("medium");
    });
    editSpan.addEventListener("mousedown", (e) => {
      document.querySelector(".custom-cursor").classList.remove("medium");
    });
    editTooltip.appendChild(editSpan);
    const imageWrapper = document.querySelector(".doodle-wrapper");
    imageWrapper.replaceChildren(...[canvasData.current, editTooltip]);
    imageWrapper.classList.add("red-line");
  }, [selectedSide]);

  const handleEdit = () => {
    canvasContextRef.current?.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    canvasContextRef.current?.drawImage(canvasData.current, 0, 0);
    switchSide("right");
  };

  const handleSaveImage = () => {
    //var canvas = document.getElementById("drawing-board");
    //var dataURL = canvas.toDataURL("image/png", 1.0);
    //setCanvasData(dataURL);
    var node = document.getElementById("drawing-board");

    htmlToImage
      .toBlob(node)
      .then(function (blob) {
        var img = new Image();
        img.src = URL.createObjectURL(blob);
        setSelectedSide("left");
        canvasData.current = img;

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => (canvasBlobRef.current = reader.result);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const handleClearImage = () => {
    canvasContextRef.current?.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const clearForm = () => {
    setName("");
    setSurname("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <>
      <div
        className={`contact-form-container ${
          selectedSide === "left" ? "noise" : "paper"
        }`}
        style={{ pointerEvents: (showLoading || emailSent) && "none" }}
      >
        <div
          className={`selection-wrapper ${
            selectedSide === "left" ? "active" : ""
          }`}
        >
          <MouseInteractionWrapper addClass="medium">
            <span onClick={() => setSelectedSide("left")}>
              standard
              {selectedSide === "left" && (
                <motion.div
                  className="underline"
                  layoutId="underline"
                ></motion.div>
              )}
            </span>
          </MouseInteractionWrapper>
        </div>
        <div
          className={`selection-wrapper ${
            selectedSide === "right" ? "active" : ""
          }`}
        >
          <MouseInteractionWrapper addClass="medium">
            <span onClick={() => setSelectedSide("right")}>
              paper
              {selectedSide === "right" && (
                <motion.div
                  className="underline"
                  layoutId="underline"
                ></motion.div>
              )}
            </span>
          </MouseInteractionWrapper>
        </div>
        <form
          id="contact-form"
          className="form-wrapper"
          onSubmit={(e) => handleSubmit(e)}
          style={selectedSide === "left" ? {} : { visibility: "hidden" }}
          method="post"
        >
          <div className="doodle-wrapper"></div>
          <CustomLabel
            name={"name"}
            required
            value={name}
            handler={(e) => setName(e.target.value)}
          ></CustomLabel>
          <CustomLabel
            name={"surname"}
            value={surname}
            handler={(e) => setSurname(e.target.value)}
          ></CustomLabel>
          <CustomLabel
            name={"email"}
            value={email}
            required
            handler={(e) => setEmail(e.target.value)}
          ></CustomLabel>
          <CustomLabel
            name={"subject"}
            value={subject}
            required
            handler={(e) => setSubject(e.target.value)}
          ></CustomLabel>
          <label
            className="input-wrapper message"
            onMouseEnter={() => {
              document.querySelector(".custom-cursor").classList.add("medium");
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
              value={message}
              required
              spellCheck={false}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </label>
        </form>
        <div
          className="paper-note-wrapper"
          style={selectedSide === "right" ? {} : { visibility: "hidden" }}
        >
          <AnimatePresence>
            <DrawingCanvas
              color={selectedColor}
              initial={loadForEdit ? canvasData.current : null}
              canvasRef={canvasRef}
              canvasContextRef={canvasContextRef}
            />
          </AnimatePresence>
          <span className="save-info">
            <FadeInOutWrapper>
              Note: save before sending the form !
            </FadeInOutWrapper>
          </span>
        </div>
        {selectedSide === "left" ? (
          <div
            className="send-wrapper"
            style={{ pointerEvents: (showLoading || emailSent) && "none" }}
          >
            <MouseInteractionWrapper addClass="medium">
              <input
                className="send-button"
                type="submit"
                value="send"
                form="contact-form"
                disabled={showLoading}
              />
            </MouseInteractionWrapper>
          </div>
        ) : (
          <>
            <div className="send-wrapper">
              <MouseInteractionWrapper addClass="medium">
                <button
                  className="send-button"
                  onClick={() => handleSaveImage()}
                >
                  save
                </button>
              </MouseInteractionWrapper>
            </div>
            <div className="send-wrapper right">
              <MouseInteractionWrapper addClass="medium">
                <button
                  className="send-button"
                  onClick={() => handleClearImage()}
                >
                  clear
                </button>
              </MouseInteractionWrapper>
            </div>
          </>
        )}
        {showLoading && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="blur-wall"
            ></motion.div>
            <div className="loading-bar-wrapper">
              <span></span>
            </div>
            <span></span>
          </>
        )}
        {emailSent && (
          <motion.div
            initial={{ opacity: 0.8, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit="exit"
            transition={{
              duration: 2.5,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="email-sent-note-wrapper"
          >
            <motion.div
              initial="hide"
              animate="show"
              exit="exit"
              transition={{ delayChildren: 0.5, staggerChildren: 0.15 }}
              className="text-wrapper"
            >
              <div className="header-text-wrapper">
                <motion.h2
                  variants={{
                    hide: { y: "4rem" },
                    show: {
                      y: 0,
                      transition: {
                        duration: 0.75,
                        ease: "easeInOut",
                      },
                    },
                    exit: { opacity: 0 },
                  }}
                >
                  Email sent
                </motion.h2>
              </div>
              <div className="header-text-wrapper">
                <motion.h3
                  variants={{
                    hide: { y: "4rem" },
                    show: {
                      y: 0,
                      transition: {
                        duration: 0.75,
                        ease: "easeInOut",
                      },
                    },
                    exit: { opacity: 0 },
                  }}
                >
                  Thanks for reaching out
                </motion.h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
      {selectedSide === "right" && dimensions.width > 768 && (
        <Toolbox
          selectedColor={selectedColor}
          handleChangeColor={handleChangeColor}
        />
      )}
    </>
  );
};

export default ContactForm;
