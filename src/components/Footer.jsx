import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as Logo } from "../assets/svg/logo_outline.svg";
import MouseInteractionWrapper from "./MouseInteractionWrapper";

const staggerVariants = {
  hide: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  show: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.15,
    },
  },
};

const linksVariants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.6, 0.05, -0.01, 0.99],
    },
  },
};

const Footer = ({ sideLinksLocation, changeLocation }) => {
  return (
    <motion.div
      className="footer-wrapper"
      onViewportEnter={() => changeLocation("footer")}
      onViewportLeave={() => changeLocation("sidebar")}
      viewport={{ amount: 0.4 }}
    >
      <AnimatePresence>
        {sideLinksLocation === "footer" && (
          <motion.div
            className="footer-links-wrapper"
            initial="hide"
            animate="show"
            exit="hide"
            variants={staggerVariants}
          >
            <motion.span className="footer-link" variants={linksVariants}>
              <MouseInteractionWrapper addClass="medium">
                <FaLinkedin />
              </MouseInteractionWrapper>
            </motion.span>
            <motion.span className="footer-link" variants={linksVariants}>
              <MouseInteractionWrapper addClass="medium">
                <FaGithub />
              </MouseInteractionWrapper>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="footer-credits-wrapper">
        <p>
          <span className="up">Design</span> &{" "}
          <span className="down">Code</span> <span></span>by<span></span>
          <span>
            <Logo className="footer-logo" />
          </span>
        </p>
      </div>
      <div className="footer-credits-wrapper year">
        <p>2022</p>
      </div>
    </motion.div>
  );
};

export default Footer;
