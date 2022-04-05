import { motion } from "framer-motion";
import React from "react";
import { ScrollExploreInfo } from "../components";

const Introduction = () => {
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
            <h1>
              <span>Kacper</span>, a software engineer
            </h1>
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
          onMouseEnter={() =>
            document.querySelector(".custom-cursor").classList.add("copy")
          }
          onMouseLeave={() =>
            document.querySelector(".custom-cursor").classList.remove("copy")
          }
          onClick={() => copyEmailInfo()}
        >
          <h5>kacpersmyczyk@gmail.com</h5>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <ScrollExploreInfo />
      </motion.div>
    </div>
  );
};

export default Introduction;
