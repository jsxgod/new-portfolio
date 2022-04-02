import React, { useState, useEffect } from "react";
import { motion, useTransform, useViewportScroll } from "framer-motion";

const ScrollExploreInfo = () => {
  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [125, 0], [0, 1]);

  const [playAnimation, setPlayAnimation] = useState(() => {
    return window.scrollY === 0;
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setPlayAnimation(window.scrollY === 0);
  };

  return (
    <motion.div
      className={`scroll-info-wrapper ${playAnimation ? "animate" : ""}`}
      style={{ opacity }}
    >
      <div className="line-wrapper">
        <span></span>
      </div>
      <div className="text-wrapper">scroll to explore</div>
    </motion.div>
  );
};

export default ScrollExploreInfo;
