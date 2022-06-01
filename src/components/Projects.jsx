import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projectsData } from "../data/projectsData";
import FadeInOutWrapper from "./FadeInOutWrapper";
import { AiFillCloseCircle } from "react-icons/ai";
import useWindowDimensions from "../hooks/useWindowDimensions";

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
    x: "10%",
    transition: { type: "spring", duration: 1, stiffness: 100 },
  },
  hover: {
    opacity: 0.9,
    x: "20%",
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

const fadeUpAndScaleVariants = {
  hide: {
    opacity: 0,
    scale: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.99], delay: 2 },
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
  const dimensions = useWindowDimensions();

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
  };

  return (
    <div className="section" id="projects-section">
      <div className="projects-wrapper">
        <div className="header-wrapper">
          <FadeInOutWrapper once={showDetails}>
            <h2>Projects</h2>
          </FadeInOutWrapper>
        </div>
        {showDetails && (
          <motion.div
            className="close-button-wrapper"
            initial="hide"
            animate="show"
            exit="exit"
          >
            <motion.span
              variants={fadeUpAndScaleVariants}
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
              onClick={() => {
                document
                  .querySelector(".custom-cursor")
                  .classList.remove("medium");
                setShowDetails(false);
              }}
            >
              <AiFillCloseCircle />
            </motion.span>
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
                  onMouseEnter={() => {
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
                    setSelectedProject(i);
                    document
                      .querySelectorAll(".project-wrapper")
                      .forEach((wrapper) => {
                        wrapper.classList.add("no-pointer-events");
                      });
                    const selectedElement = document.getElementById(
                      `project-name-${i}`
                    );
                    selectedElement.classList.remove("no-pointer-events");
                    document
                      .querySelector(".custom-cursor")
                      .classList.remove("big");
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
                        {project.name}
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
              <motion.div
                className="carousel-wrapper"
                variants={fadeInVariants}
              >
                <div className="carousel left play">
                  {projectsData[selectedProject].stack.map((technology) => (
                    <span key={`${technology}-left`}>{technology}</span>
                  ))}
                </div>
                <motion.div className="carousel play" variants={fadeUpVariants}>
                  {projectsData[selectedProject].stack.map((technology) => (
                    <span key={`${technology}-middle`}>{technology}</span>
                  ))}
                </motion.div>
                <motion.div
                  className="carousel right play"
                  variants={fadeUpVariants}
                >
                  {projectsData[selectedProject].stack.map((technology) => (
                    <span key={`${technology}-right`}>{technology}</span>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                className="description-wrapper"
                variants={fadeUpVariants}
              >
                {projectsData[selectedProject].description}
              </motion.div>
              <motion.div
                className="gallery-wrapper"
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2, ease: [0.6, 0.05, -0.01, 0.99] },
                }}
              >
                <motion.img
                  src={projectsData[selectedProject].thumbnail}
                  alt="preview"
                  transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.99] }}
                  layoutId={
                    dimensions.width > 768
                      ? `project-${selectedProject}-preview-image`
                      : ""
                  }
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
                <a
                  href={projectsData[selectedProject].live}
                  target="_blank"
                  rel="noreferrer"
                >
                  LIVE
                </a>
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
                <a
                  href={projectsData[selectedProject].repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  REPO
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
