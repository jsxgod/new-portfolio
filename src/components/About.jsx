import React, { useState } from "react";
import { motion } from "framer-motion";
import FadeInOutWrapper from "./FadeInOutWrapper";
import useWindowDimensions from "../hooks/useWindowDimensions";

const cardOffsets = [5, 0, -5];

const About = () => {
  const [technologies, setTechnologies] = useState([
    { name: "html", icon: require("../assets/html_icon.png") },
    { name: "javascript", icon: require("../assets/js_icon.png") },
    { name: "react", icon: require("../assets/react_icon.png") },
    { name: "css", icon: require("../assets/css_icon.png") },
    { name: "sass", icon: require("../assets/sass_icon.png") },
  ]);

  const [hideIcon, setHideIcon] = useState(false);
  const [blockScroll, setBlockScroll] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const dimensions = useWindowDimensions();

  const handleWheel = (e) => {
    // scroll down
    if (!blockScroll && animateCards) {
      if (e.deltaY < 0) {
        setTechnologies((technologies) =>
          technologies.slice(1).concat(technologies.slice(0, 1))
        );
      } // scroll up
      else if (e.deltaY > 0) {
        setTechnologies((technologies) =>
          technologies.slice(-1).concat(technologies.slice(0, -1))
        );
      }
      setHideIcon(true);
      setBlockScroll(true);
      setTimeout(() => {
        setHideIcon(false);
        setTimeout(() => {
          setBlockScroll(false);
        }, 100);
      }, 100);
    }
  };

  const handleTap = () => {
    if (dimensions.width <= 768) {
      setTechnologies((technologies) =>
        technologies.slice(1).concat(technologies.slice(0, 1))
      );
    }
  };

  const handleClick = () => {
    if (dimensions.width <= 768) {
      return;
    }
    if (animateCards) {
      setAnimateCards(false);
      document.querySelector(".custom-cursor").classList.remove("scroll");
      document.querySelector("body").classList.remove("no-scroll");
    } else if (!animateCards) {
      setAnimateCards(true);
      document.querySelector(".custom-cursor").classList.add("scroll");
      document.querySelector("body").classList.add("no-scroll");
    }
  };

  return (
    <div className="section" id="about-section">
      <div className="about-me-wrapper">
        <div className="info-wrapper text">
          <div className="text-wrapper">
            <FadeInOutWrapper once={false}>
              <h2>About me</h2>
              <p>
                My main interests are coding and web design. I like building
                good looking sites that are thoughtful and interactive. In the
                future I would like to craft amazing web experiences that spark
                joy. Further down the road of my career I hope to gain excellent
                knowledge of the web development eco system as well as dive
                deeper into 3D and design.
              </p>
              <p>
                My hobbies beside programming are video games, music, chess and
                rubik's cube speedsolving.
              </p>
              <p>
                I'm available for web projects remotely or on site in Wroc??aw,
                Poland. Feel free to get in touch at the bottom of the page if
                you're interested in working together.
              </p>
            </FadeInOutWrapper>
          </div>
          <div className="text-wrapper">
            <FadeInOutWrapper once={false}>
              <h2>Education</h2>
              <p>
                I studied computer science at the Wroc??aw University of Science
                and Technology. There I have learned about topics ranging from
                pure mathematics (algebra, calculus, discrete mathematics,
                logic, statistics) through various low and high level
                programming languages (C, C++, Java, Javascript, Python, GO,
                Julia, Prolog, Assembly) as well as databases, data analysis or
                even compiler design and implementation.
              </p>
            </FadeInOutWrapper>
          </div>
        </div>
        <div className="info-wrapper technology">
          <FadeInOutWrapper once={false}>
            <h2>Technological stack</h2>
          </FadeInOutWrapper>
          <motion.div
            className={`technology-showcase-wrapper ${
              animateCards ? "animate-cards" : ""
            }`}
            onMouseEnter={() => {
              document.querySelector(".custom-cursor").classList.add("explore");
            }}
            onMouseLeave={() => {
              setAnimateCards(false);
              document
                .querySelector(".custom-cursor")
                .classList.remove("scroll");
              document
                .querySelector(".custom-cursor")
                .classList.remove("explore");
              document.querySelector("body").classList.remove("no-scroll");
            }}
            onClick={handleClick}
            onWheel={(e) => handleWheel(e)}
          >
            {cardOffsets.map((offset, i) => (
              <motion.div
                key={"tech-stack-card-" + i}
                className="card"
                style={{ top: `${50 + offset}%`, zIndex: { i } }}
                onTap={handleTap}
              >
                <motion.img
                  src={technologies[i].icon}
                  alt={technologies[i].name}
                  animate={hideIcon ? { opacity: 0 } : { opacity: 1 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
