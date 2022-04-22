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

const ContactForm = ({ selectedColor, handleChangeColor }) => {
  const canvasData = useRef(null);
  const [selectedSide, setSelectedSide] = useState("left");
  const [loadForEdit, setLoadForEdit] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name,
      surname,
      email,
      subject,
      message,
    };
    console.log({ formData });
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
    switchSide("right");
    setLoadForEdit(true);
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
        /*
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => canvasData = (reader.result);
        */
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <>
      <div
        className={`contact-form-container ${
          selectedSide === "left" ? "noise" : "paper"
        }`}
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
            />
          </AnimatePresence>
          <span className="save-info">
            <FadeInOutWrapper>
              Note: save before switching back to the form !
            </FadeInOutWrapper>
          </span>
        </div>
        {selectedSide === "left" ? (
          <div className="send-wrapper">
            <MouseInteractionWrapper addClass="medium">
              <input
                className="send-button"
                type="submit"
                value="send"
                form="contact-form"
              />
            </MouseInteractionWrapper>
          </div>
        ) : (
          <div className="send-wrapper">
            <MouseInteractionWrapper addClass="medium">
              <button className="send-button" onClick={() => handleSaveImage()}>
                save
              </button>
            </MouseInteractionWrapper>
          </div>
        )}
      </div>
      {selectedSide === "right" && (
        <Toolbox
          selectedColor={selectedColor}
          handleChangeColor={handleChangeColor}
        />
      )}
    </>
  );
};

export default ContactForm;
