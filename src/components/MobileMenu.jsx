import React from "react";
import { motion } from "framer-motion";

const options = ["About", "Projects", "Contact", "CV"];

const menuItemVariants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const topVariants = {
  hide: {
    y: "-100%",
  },
  show: {
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};
const bottomVariants = {
  hide: {
    y: "100%",
  },
  show: {
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    y: "100%",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const MobileMenu = ({ handleClose }) => {
  const handleScrollToSection = (sectionName) => {
    handleClose();
    setTimeout(() => {
      const section = document.getElementById(`${sectionName}-section`);
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  return (
    <motion.div
      initial={{ backdropFilter: "blur(0px)" }}
      animate={{ backdropFilter: "blur(2px)", transition: { duration: 0.6 } }}
      exit={{ backdropFilter: "blur(0px)" }}
      className={"mobile-menu-wrapper"}
    >
      <motion.ul
        initial="hide"
        animate="show"
        exit="exit"
        variants={topVariants}
        transition={{ staggerChildren: 0.15 }}
        className="menu-options-top"
      >
        {options.slice(0, 2).map((option) => (
          <motion.li
            key={"mobile-menu-option-#" + option}
            variants={menuItemVariants}
            className="menu-option"
            onClick={() => handleScrollToSection(option.toLowerCase())}
          >
            {option}
          </motion.li>
        ))}
      </motion.ul>
      <motion.ul
        initial="hide"
        animate="show"
        exit="exit"
        variants={bottomVariants}
        transition={{ staggerChildren: 0.15 }}
        className="menu-options-bottom"
      >
        {options.slice(2, 4).map((option) => (
          <motion.li
            key={"mobile-menu-option-#" + option}
            variants={menuItemVariants}
            className="menu-option"
            onClick={() => handleScrollToSection(option.toLowerCase())}
          >
            {option}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default MobileMenu;
