import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../assets/logo_outline.svg";
import { motion } from "framer-motion";

const navbarLinks = ["about", "projects", "contact", "cv"];

const staggerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
  exit: {},
};

const fadeInOutVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 100,
    transition: { duration: 5 },
  },
  exit: { opacity: 0 },
};

const Navbar = () => {
  const [showChildren, setShowChildren] = useState(false);

  const [oldScrollPosition, setOldScrollPosition] = useState(0);
  const [hide, setHide] = useState(false);

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;

    if (
      currentScrollPosition > oldScrollPosition &&
      currentScrollPosition >= 100
    ) {
      setHide(true);
    } else {
      setHide(false);
    }

    setOldScrollPosition(currentScrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [oldScrollPosition]);

  return (
    <nav
      className={`navbar-wrapper block-reveal up ${hide ? "hide" : ""}`}
      onAnimationEnd={() => setShowChildren(true)}
    >
      <motion.div
        variants={fadeInOutVariants}
        initial="hidden"
        animate={showChildren ? "show" : ""}
        exit="exit"
        className="logo-wrapper"
      >
        <Logo
          className="logo-small"
          onMouseEnter={() =>
            document.querySelector(".custom-cursor").classList.add("big")
          }
          onMouseLeave={() =>
            document.querySelector(".custom-cursor").classList.remove("big")
          }
        />
      </motion.div>
      <motion.ul
        variants={staggerVariants}
        initial="hidden"
        animate={showChildren ? "show" : ""}
        exit="exit"
        className="links-container"
      >
        {navbarLinks.map((link) => (
          <motion.li
            key={link}
            variants={fadeInOutVariants}
            className="navbar-link"
            onMouseEnter={() =>
              document.querySelector(".custom-cursor").classList.add("big")
            }
            onMouseLeave={() =>
              document.querySelector(".custom-cursor").classList.remove("big")
            }
          >
            {link}
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  );
};

export default Navbar;
