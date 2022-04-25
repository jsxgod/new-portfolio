import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../assets/svg/logo_outline.svg";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { MouseInteractionWrapper } from "../components";
import FadeInOutWrapper from "./FadeInOutWrapper";

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
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
  }, []);

  return (
    <motion.div
      className="section"
      style={{ paddingTop: 0, marginBottom: 0 }}
      variants={variants}
      initial="hidden"
      animate="show"
      exit="hide"
    >
      <motion.div className="intro-logo-wrapper">
        <div className="svg-wrapper">
          <Logo
            className="logo"
            onMouseEnter={() => {
              document.querySelector(".custom-cursor").classList.add("big");
            }}
            onMouseLeave={() => {
              document.querySelector(".custom-cursor").classList.remove("big");
            }}
            onMouseDown={() => {
              document.querySelector(".custom-cursor").classList.remove("big");
            }}
            onClick={() => onClickHandler()}
          />
        </div>
        {showTooltip && (
          <FadeInOutWrapper gentle>
            <MouseInteractionWrapper addClass="medium">
              <div className="tooltip-wrapper" onClick={() => onClickHandler()}>
                <p>proceed to site</p>
                <FaArrowRight className="arrow" />
              </div>
            </MouseInteractionWrapper>
          </FadeInOutWrapper>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LogoButton;
