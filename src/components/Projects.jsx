import React from "react";
import { projectsData } from "../data/projectsData";

const Projects = () => {
  return (
    <div className="section">
      <div className="projects-wrapper">
        <div className="header-wrapper">
          <h1>Projects</h1>
        </div>
        <div className="projects-showcase-wrapper">
          {projectsData.map((project, i) => (
            <div
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
            >
              <h2>{project.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
