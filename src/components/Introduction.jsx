import { motion } from "framer-motion";
import React, { useState } from "react";

const Introduction = () => {
  const [showContent, setShowContent] = useState(false);

  return (
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
          <div className="text-row">
            <h1>Hi, I'm</h1>
          </div>
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
          <div className="text-row">
            <h1>who likes good design,</h1>
          </div>
          <div className="text-row">
            <h1>
              coding stuff for the <span>web</span>.
            </h1>
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
        >
          kacersmyczyk@gmail.com
        </motion.div>
      </div>
      <div className="right-section">
        <div
          className="content-wrapper block-reveal up"
          onAnimationEnd={() => setShowContent(true)}
        >
          {showContent && (
            //placeholder content
            <svg viewBox="0 0 200 200">
              <path
                d="
                         M 100, 100
                         m -75, 0
                         a 75,75 0 1,0 150,0
                         a 75,75 0 1,0 -150,0
                         "
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default Introduction;
