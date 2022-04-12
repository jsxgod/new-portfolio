import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { projectsData } from "../data/projectsData";

import FadeInOutWrapper from "./FadeInOutWrapper";

const textLeftVariants = {
  rest: {
    x: 0,
    transition: { type: "spring", duration: 1, stiffness: 100 },
  },
  hover: {
    x: -50,
    zIndex: 3,
    transition: { type: "spring", duration: 1, stiffness: 100 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.6, 0.05, -0.01, 0.99] },
  },
};

const textRightVariants = JSON.parse(JSON.stringify(textLeftVariants));
textRightVariants.hover.x *= -1;

const thumbnailLeftVariants = {
  rest: {
    opacity: 0,
    x: "25%",
    transition: { type: "spring", duration: 1, stiffness: 100 },
  },
  hover: {
    opacity: 0.9,
    x: "35%",
    transition: { type: "spring", duration: 1, stiffness: 100 },
  },
};
const thumbnailRightVariants = JSON.parse(
  JSON.stringify(thumbnailLeftVariants)
);
thumbnailRightVariants.rest.x = "-50%";
thumbnailRightVariants.hover.x = "-60%";

const fadeUpVariants = {
  hide: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.99], delay: 0.6 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.6, 0.05, -0.01, 0.99] },
  },
};

const fadeInVariants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, -0.01, 0.99],
      delay: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.6, 0.05, -0.01, 0.99] },
  },
};

const Projects = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);

  const handleMoveThumbnailWithCursor = (e, element) => {
    const rect = element.getBoundingClientRect();
    const middleX = rect.x + rect.width / 2;
    const middleY = rect.y + rect.height / 2;
    const idx = element.id.slice(-1);
    const thumbnail = document.getElementById(`project-thumbnail-${idx}`);

    const directionX = e.pageX < middleX ? 1 : -1; // left : right side
    const directionY = e.pageY < middleY ? 1 : -1; // up : down  side

    const xOffset =
      directionX > 0
        ? ((middleX - e.pageX) / (middleX - rect.x)) * 10 * directionX
        : ((e.pageX - middleX) / (middleX - rect.x)) * 10 * directionX;
    const yOffset =
      directionY > 0
        ? ((middleY - e.clientY) / (middleY - rect.y)) * 10 * directionY
        : ((e.clientY - middleY) / (middleY - rect.y)) * 10 * directionY;
    //console.log("X: " + xOffset + "%  Y: " + yOffset + "%");
    const style = window.getComputedStyle(thumbnail);
    const matrix = style.transform;
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
    const trX = matrixValues[4];
    const trY = matrixValues[5];

    if (directionX > 0) {
      thumbnail.style.marginLeft = `${xOffset}px`;
    } else {
      thumbnail.style.paddingRight = `${xOffset}px`;
    }
    if (directionY < 0) {
      thumbnail.style.marginTop = `${yOffset}px`;
    } else {
      thumbnail.style.marginBottom = `${yOffset}px`;
    }
    /*
    const newX =
      parseInt(trX) === 0
        ? xOffset.toPrecision(1)
        : parseInt(trX) + (parseInt(trX) * xOffset.toPrecision(1)) / 100;
    const newY =
      parseInt(trY) === 0
        ? yOffset.toPrecision(1)
        : parseInt(trY) + (parseInt(trY) * yOffset.toPrecision(1)) / 100;
    console.log("new x: " + newX + " new y: " + newY);
    thumbnail.style.transform = `translate(${newX}px,${newY}px)`;*/
  };

  return (
    <div className="section">
      <div className="projects-wrapper">
        <div className="header-wrapper">
          <FadeInOutWrapper once={false}>
            <h2>Projects</h2>
          </FadeInOutWrapper>
        </div>
        {showDetails && (
          <motion.div
            className="close-button-wrapper"
            initial="hide"
            animate="show"
            exit="exit"
            onMouseEnter={() => {
              document.querySelector(".custom-cursor").classList.add("medium");
            }}
            onMouseLeave={() => {
              document
                .querySelector(".custom-cursor")
                .classList.remove("medium");
            }}
            onClick={() => {
              document
                .querySelector(".custom-cursor")
                .classList.remove("medium");
              setShowDetails(false);
            }}
          >
            <motion.span variants={fadeUpVariants}>X</motion.span>
          </motion.div>
        )}
        <AnimatePresence exitBeforeEnter>
          {!showDetails ? (
            <div className="projects-showcase-wrapper" key="projects-showcase">
              {projectsData.map((project, i) => (
                <motion.div
                  key={"project #" + i}
                  id={`project-name-${i}`}
                  className={`project-wrapper ${i} ${
                    i % 2 === 0 ? "left" : "right"
                  }`}
                  onMouseEnter={(e) => {
                    document
                      .querySelector(".custom-cursor")
                      .classList.add("big");
                  }}
                  onMouseLeave={() => {
                    document
                      .querySelector(".custom-cursor")
                      .classList.remove("big");
                  }}
                  onMouseMove={(e) => {
                    const element = document.getElementById(
                      `project-name-${i}`
                    );
                    handleMoveThumbnailWithCursor(e, element);
                  }}
                  onClick={() => {
                    document
                      .querySelector(".custom-cursor")
                      .classList.remove("big");
                    setSelectedProject(i);
                    setShowDetails(true);
                  }}
                  initial="rest"
                  animate="rest"
                  exit="exit"
                  whileHover="hover"
                >
                  <motion.div
                    className="thumbnail-wrapper"
                    id={`project-thumbnail-${i}`}
                    variants={
                      i % 2 === 0
                        ? thumbnailLeftVariants
                        : thumbnailRightVariants
                    }
                  >
                    <div className="image-wrapper">
                      <motion.img
                        src={project.thumbnail}
                        alt="thumbnail"
                        layoutId={`project-${i}-preview-image`}
                      />
                    </div>
                  </motion.div>
                  <motion.h2
                    variants={
                      i % 2 === 0 ? textLeftVariants : textRightVariants
                    }
                  >
                    {
                      <FadeInOutWrapper once={false}>
                        project.name
                      </FadeInOutWrapper>
                    }
                  </motion.h2>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="projects-showcase-wrapper details"
              key="project-details"
              initial="hide"
              animate="show"
              exit="exit"
            >
              <motion.h2
                className="project-details-header"
                variants={fadeUpVariants}
              >
                {projectsData[selectedProject].name}
              </motion.h2>
              {/*
              <motion.div
                className="project-type-wrapper"
                variants={fadeUpVariants}
              >
                <span className="info">front-end</span>
              </motion.div>
              {[0, 1, 2, 3, 4, 5, 6].map((info, i) => (
                <motion.div
                  className="info-bean"
                  style={{ gridArea: `info-${i + 1}` }}
                  variants={fadeUpVariants}
                >
                  <span className="info">{`info-${i}`}</span>
                </motion.div>
              ))}*/}
              <motion.div
                className="carousel-wrapper"
                variants={fadeInVariants}
              >
                <div className="carousel left play">
                  <span>front-end</span>
                  <span>design</span>
                  <span>framer-motion</span>
                  <span>sass</span>
                  <span>javascript</span>
                  <span>react</span>
                  <span>blender</span>
                  <span>three.js</span>
                </div>
                <motion.div className="carousel play" variants={fadeUpVariants}>
                  <span>front-end</span>
                  <span>design</span>
                  <span>framer-motion</span>
                  <span>sass</span>
                  <span>javascript</span>
                  <span>react</span>
                  <span>blender</span>
                  <span>three.js</span>
                </motion.div>
              </motion.div>
              <motion.div
                className="description-wrapper"
                variants={fadeUpVariants}
              >
                <p>Project description here qweqe qwewqedwqkd</p>
                <p>
                  qwdjqwpdqwjpdqwpdojqw
                  dojwqodjqwojqweqweqwjdojqwdoqwdjoqwdjqwodjqwodjqwodjqwjqwodjqw
                  qweojqwoejwqoejwqoejwqoejqowjeoqjeoqwjeoqwje
                </p>
                <p>
                  Project description here
                  qweqeqweojqwoejwqoejwqoejwqoejqowjeoqjeoqwjeoqwje wqe
                </p>
              </motion.div>
              <motion.div
                className="gallery-wrapper"
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2, ease: [0.6, 0.05, -0.01, 0.99] },
                }}
              >
                <motion.img
                  src="https://gainbitcoin.com/wp-content/uploads/2020/04/Automatic-Fortunes-Investing-in-the-Number-One-Tech-Stock-696x449.jpg"
                  alt="preview"
                  transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.99] }}
                  layoutId={`project-${selectedProject}-preview-image`}
                />
              </motion.div>
              <motion.div
                className="info-bean bottom-link live"
                variants={fadeUpVariants}
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
              >
                <a href="/">LIVE</a>
              </motion.div>
              <motion.div
                className="info-bean bottom-link repo"
                variants={fadeUpVariants}
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
              >
                <a href="/">REPO</a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
