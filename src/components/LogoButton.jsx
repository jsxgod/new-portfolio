import React from "react";
import { ReactComponent as Logo } from "../assets/logo_outline.svg";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 0.6,
      ease: [0.6, 0.05, -0.01, 0.99],
    },
  },
  hide: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.6, 0.05, -0.01, 0.99] },
  },
};

const LogoButton = ({ onClickHandler }) => {
  return (
    /*
    <motion.div

      className="logo-animation"
    >*/
    <motion.div
      className="section"
      style={{ paddingTop: 0 }}
      variants={variants}
      initial="hidden"
      animate="show"
      exit="hide"
    >
      <div className="logo-wrapper">
        <Logo
          className="logo"
          onMouseEnter={() =>
            document.querySelector(".custom-cursor").classList.add("big")
          }
          onMouseLeave={() =>
            document.querySelector(".custom-cursor").classList.remove("big")
          }
          onClick={() => onClickHandler()}
        />
      </div>
    </motion.div>
  );
};

export default LogoButton;
