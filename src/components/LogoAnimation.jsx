import React from "react";
import { ReactComponent as Logo } from "../assets/logo_outline.svg";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.25,
      duration: 0.6,
      ease: [0.6, 0.05, -0.01, 0.99],
    },
  },
  hide: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.6, 0.05, -0.01, 0.99] },
  },
};

const LogoAnimation = () => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      exit="hide"
      className="logo-animation"
    >
      <div className="logo-wrapper">
        <Logo className="logo" />
      </div>
    </motion.div>
  );
};

export default LogoAnimation;
