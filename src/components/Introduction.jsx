import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ScrollExploreInfo } from "../components";
import Scene from "../components/3D/Scene";

const fadeUpVariants = {
  hide: {
    opacity: 0,
    y: "2rem",
    transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.99] },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.99] },
  },
  exit: {
    y: "-2rem",
    transition: { duration: 0.3, ease: [0.6, 0.05, -0.01, 0.99] },
  },
};

const Introduction = ({ showContent }) => {
  const copyEmailInfo = () => {
    navigator.clipboard.writeText("kacpersmyczyk@gmail.com");
    document.querySelector(".custom-cursor").classList.add("copied");
    setTimeout(() => {
      document.querySelector(".custom-cursor").classList.remove("copy");
      document.querySelector(".custom-cursor").classList.remove("copied");
    }, 500);
  };

  return (
    <div
      className="section"
      id="introduction-section"
      style={{ overflow: "visible" }}
    >
      {showContent && (
        <>
          <motion.div
            initial="hide"
            whileInView="show"
            animate="exit"
            viewport={{ amount: 0.5 }}
            transition={{ staggerChildren: 0.3 }}
            className="introduction-wrapper"
          >
            <motion.div variants={fadeUpVariants} className="text-wrapper">
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
              variants={fadeUpVariants}
              className="email-wrapper"
              onMouseEnter={() =>
                document.querySelector(".custom-cursor").classList.add("copy")
              }
              onMouseLeave={() =>
                document
                  .querySelector(".custom-cursor")
                  .classList.remove("copy")
              }
              onClick={() => copyEmailInfo()}
            >
              <h5>kacpersmyczyk@gmail.com</h5>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ScrollExploreInfo />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Introduction;
