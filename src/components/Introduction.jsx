import { motion } from "framer-motion";
import React, { useState } from "react";
import DevSVG from "../assets/svgs/devPerson.svg";

const Introduction = () => {
  const [showContent, setShowContent] = useState(false);

  const copyEmailInfo = () => {
    navigator.clipboard.writeText("kacpersmyczyk@gmail.com");
    document.querySelector(".custom-cursor").classList.add("copied");
    setTimeout(() => {
      document.querySelector(".custom-cursor").classList.remove("copy");
      document.querySelector(".custom-cursor").classList.remove("copied");
    }, 500);
  };

  return (
    <div className="section">
      <div className="introduction-wrapper">
        <div className="left-section">
          <motion.div
            initial={{ opacity: 0, y: "2rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.6, 0.05, -0.01, 0.99],
              delay: 0.6,
            }}
            className="text-wrapper"
          >
            <div className="text-row">Hi, I'm</div>
            <div className="text-row">
              <span className="name">
                Kac
                <span className="p-wrapper">
                  p<span className="line"></span>
                </span>
                er
              </span>
              , a software engineer
            </div>
            <div className="text-row">who likes good design,</div>
            <div className="text-row">
              coding stuff for the <span>web</span>.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: "1rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.6, 0.05, -0.01, 0.99],
              delay: 0.9,
            }}
            className="email-wrapper"
            onMouseEnter={() =>
              document.querySelector(".custom-cursor").classList.add("copy")
            }
            onMouseLeave={() =>
              document.querySelector(".custom-cursor").classList.remove("copy")
            }
            onClick={() => copyEmailInfo()}
          >
            kacpersmyczyk@gmail.com
          </motion.div>
        </div>
        <div className="right-section">
          <div
            className="content-wrapper block-reveal up"
            onAnimationEnd={() => setShowContent(true)}
          >
            {showContent && (
              //placeholder content
              <img src={DevSVG} alt="" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
