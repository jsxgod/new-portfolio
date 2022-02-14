import React, { useState } from "react";
import { ReactComponent as Logo } from "../assets/logo_outline.svg";
import { motion } from "framer-motion";

const wrapperVariants = {
  hidden: {
    //y: -90,
    opacity: 0,
  },
  show: {
    //y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1,
    },
  },
  exit: {
    y: -90,
  },
};

const childrenVariants = {
  hidden: { opacity: "0%" },
  show: {
    opacity: "100%",
    transition: { ease: [0.6, 0.05, -0.01, 0.99] },
  },
  exit: { opacity: 0 },
};

const blockRevealVariants = {
  hidden: {},
  show: {
    height: "100%",
    transition: { ease: "circOut", duration: 0.4 },
  },
  hide: {
    y: -100,
    transition: { ease: "circOut", duration: 0.4, delay: 0.15 },
  },
};

const Navbar = () => {
  const [animationName, setAnimationName] = useState("show");

  const hideAndContinue = () => {
    setAnimationName("hide");
  };

  return (
    <motion.nav
      variants={wrapperVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="navbar-wrapper"
    >
      <motion.div
        variants={blockRevealVariants}
        animate={
          animationName === "show"
            ? {
                height: "100%",
                transition: { ease: "circOut", duration: 0.4 },
              }
            : {
                y: -100,
                height: "100%",
                transition: { ease: "circOut", duration: 0.4, delay: 0.15 },
              }
        }
        onAnimationComplete={() => hideAndContinue()}
        className="block-reveal"
      ></motion.div>
      <motion.div variants={childrenVariants} className="logo-wrapper">
        <Logo className="logo-small" />
      </motion.div>
      <motion.ul variants={wrapperVariants} className="links-container">
        <motion.li variants={childrenVariants} className="navbar-link">
          work
        </motion.li>
        <motion.li variants={childrenVariants} className="navbar-link">
          projects
        </motion.li>
        <motion.li variants={childrenVariants} className="navbar-link">
          contact
        </motion.li>
        <motion.li variants={childrenVariants} className="navbar-link">
          cv
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};

export default Navbar;
