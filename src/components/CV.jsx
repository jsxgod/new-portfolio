import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaRegWindowClose } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import cv1 from "../assets/images/cv/CV.png";
import cv2 from "../assets/images/cv/CV_bw.png";
import cv3 from "../assets/images/cv/CV_clean.png";
import MouseInteractionWrapper from "./MouseInteractionWrapper";
import FadeInOutWrapper from "./FadeInOutWrapper";
import useWindowDimensions from "../hooks/useWindowDimensions";

const options = [
  {
    id: 0,
    name: "Color",
    mobileName: "color",
    link: "https://drive.google.com/file/d/1nYr7mFUr50Z1OcZzll6zf2J5oTinESHu/view?usp=sharing",
    image: cv1,
  },
  {
    id: 1,
    name: "Black & white",
    mobileName: "black & white",
    link: "https://drive.google.com/file/d/1w_k3ZiFRaWzUrRjw4Qlkvo4Z4R4Kk7oP/view?usp=sharing",
    image: cv2,
  },
  {
    id: 2,
    name: "Image free b&w",
    mobileName: "clean",
    link: "https://drive.google.com/file/d/1oCJQixXeaqsLPGsXvnwpMfUYgG5QjJzq/view?usp=sharing",
    image: cv3,
  },
];

const CV = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const dimensions = useWindowDimensions();

  const handleFullscreen = () => {
    if (dimensions <= 768 || window.innerWidth <= 768) {
      return;
    }
    if (showFullscreen === false) {
      // open
      setShowFullscreen(true);
    } else {
      // close
      setShowFullscreen(false);
    }
  };

  return (
    <div className="section" id={"cv-section"}>
      <AnimatePresence exitBeforeEnter>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ pointerEvents: "none" }}
            className="fullscreen-preview-wrapper"
            onMouseEnter={() => {
              document.querySelector(".custom-cursor").classList.add("close");
            }}
            onMouseLeave={() => {
              document
                .querySelector(".custom-cursor")
                .classList.remove("close");
            }}
            onMouseDown={() => {
              document
                .querySelector(".custom-cursor")
                .classList.remove("close");
            }}
            onClick={(e) => {
              if (e.target.id !== "cv-preview-image") {
                setShowFullscreen(false);
              }
            }}
          >
            <div className="image-wrapper">
              <motion.img
                key={
                  options.find((option) => option.id === selectedOption).name +
                  "-preview"
                }
                id={"cv-preview-image"}
                onMouseEnter={() => {
                  document
                    .querySelector(".custom-cursor")
                    .classList.add("zoom");
                  document
                    .querySelector(".custom-cursor")
                    .classList.remove("close");
                }}
                onMouseLeave={() => {
                  document
                    .querySelector(".custom-cursor")
                    .classList.add("close");
                  document
                    .querySelector(".custom-cursor")
                    .classList.remove("zoom");
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 1,
                    delay: 0.15,
                    ease: [0.6, 0.05, -0.01, 0.99],
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3, ease: [0.6, 0.05, -0.01, 0.99] },
                }}
                src={
                  options.find((option) => option.id === selectedOption).image
                }
                alt="cv-preview"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="cv-header">
        <FadeInOutWrapper once={true}>
          <h2>CV</h2>
        </FadeInOutWrapper>

        <MouseInteractionWrapper addClass="small">
          <div
            className="tooltip-wrapper"
            onClick={handleFullscreen}
            onMouseEnter={() => {
              if (
                document
                  .querySelector(".custom-cursor")
                  .classList.contains("close")
              ) {
                document
                  .querySelector(".custom-cursor")
                  .classList.remove("close");
              }
            }}
          >
            {dimensions.width > 768 ? (
              <p>fullscreen</p>
            ) : (
              <a href="https://drive.google.com/drive/folders/1vG1PrcMI8iznYSbidvnNDjC8hUdgIMau?usp=sharing">
                Download pdf
              </a>
            )}
            {dimensions.width > 768 ? (
              showFullscreen ? (
                <FaRegWindowClose className="arrow" />
              ) : (
                <FaArrowRight className="arrow" />
              )
            ) : (
              ""
            )}
          </div>
        </MouseInteractionWrapper>
      </div>
      <div className="image-wrapper">
        <AnimatePresence exitBeforeEnter>
          {!showFullscreen && (
            <motion.img
              key={options.find((option) => option.id === selectedOption).name}
              initial={{ x: "-110%", opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 1,
                  delay: 0.15,
                  ease: [0.6, 0.05, -0.01, 0.99],
                },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3, ease: [0.6, 0.05, -0.01, 0.99] },
              }}
              src={options.find((option) => option.id === selectedOption).image}
              alt="cv"
            />
          )}
        </AnimatePresence>
      </div>
      {dimensions.width > 768 ? (
        <div className="selection-wrapper">
          {options.map((option) => (
            <div
              className={`option-wrapper`}
              key={"option-wrapper-" + option.name}
              onClick={() => setSelectedOption(option.id)}
            >
              <div className="text-wrapper">
                <MouseInteractionWrapper>
                  <h2
                    className={selectedOption === option.id ? "selected" : ""}
                  >
                    {option.name}
                  </h2>
                </MouseInteractionWrapper>
                <MouseInteractionWrapper addClass="medium">
                  <a href={option.link} target="_blank" rel="noreferrer">
                    Link
                  </a>
                </MouseInteractionWrapper>
              </div>
              {selectedOption === option.id && (
                <motion.div
                  className="arrow-wrapper"
                  layoutId={"arrow"}
                  initial={{ scale: 2 }}
                  animate={{ scale: 1 }}
                >
                  <FaArrowLeft />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="selection-wrapper">
          {options.map((option) => (
            <div
              className={`option-wrapper`}
              key={"option-wrapper-mobile" + option.mobileName}
              onClick={() => setSelectedOption(option.id)}
            >
              <div className="text-wrapper">
                <p className={selectedOption === option.id ? "selected" : ""}>
                  {option.mobileName}
                  {option.id === selectedOption && (
                    <motion.span
                      className="underline"
                      key={option.id + "-underline"}
                      layoutId="cv-underline"
                    ></motion.span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CV;
