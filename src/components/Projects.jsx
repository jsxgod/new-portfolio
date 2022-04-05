import React, { useState } from "react";
import { motion } from "framer-motion";

import { projectsData } from "../data/projectsData";

const hoverTextOffset = -50;

const textLeftVariants = {
  rest: {
    x: 0,
    transition: { type: "spring", duration: 0.5, stiffness: 100 },
  },
  hover: {
    x: hoverTextOffset,
    zIndex: 3,
    transition: { type: "spring", duration: 0.5, stiffness: 100 },
  },
};

const textRightVariants = JSON.parse(JSON.stringify(textLeftVariants));
textRightVariants.hover.x *= -1;

const thumbnailLeftVariants = {
  rest: {
    opacity: 0,
    x: "35%",
    transition: { type: "spring", duration: 0.5, stiffness: 100 },
  },
  hover: {
    opacity: 0.9,
    x: "45%",
    transition: { type: "spring", duration: 0.5, stiffness: 100 },
  },
};
const thumbnailRightVariants = JSON.parse(
  JSON.stringify(thumbnailLeftVariants)
);
thumbnailRightVariants.rest.x = "-50%";
thumbnailRightVariants.hover.x = "-60%";

const Projects = () => {
  return (
    <div className="section">
      <div className="projects-wrapper">
        <div className="header-wrapper">
          <h1>Projects</h1>
        </div>
        <div className="projects-showcase-wrapper">
          {projectsData.map((project, i) => (
            <motion.div
              key={"project #" + i}
              className={`project-wrapper ${i % 2 === 0 ? "left" : "right"}`}
              onMouseEnter={() => {
                document.querySelector(".custom-cursor").classList.add("big");
              }}
              onMouseLeave={() => {
                document
                  .querySelector(".custom-cursor")
                  .classList.remove("big");
              }}
              initial="rest"
              animate="rest"
              whileHover="hover"
            >
              <motion.div
                className="thumbnail-wrapper"
                variants={
                  i % 2 === 0 ? thumbnailLeftVariants : thumbnailRightVariants
                }
              >
                <div className="image-wrapper">
                  <img src={project.thumbnail} alt="thumbnail" />
                </div>
              </motion.div>
              <motion.h2
                variants={i % 2 === 0 ? textLeftVariants : textRightVariants}
              >
                {project.name}
              </motion.h2>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
