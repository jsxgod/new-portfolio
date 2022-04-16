import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../assets/svg/logo_outline.svg";
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

const hamburgerVariants = {
  hide: {
    opacity: 0,
    x: "-100%",
    transition: { duration: 0.3, ease: [0.6, 0.05, -0.01, 0.99] },
  },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.99] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: [0.6, 0.05, -0.01, 0.99] },
  },
};

const Navbar = () => {
  const [showChildren, setShowChildren] = useState(false);

  const [oldScrollPosition, setOldScrollPosition] = useState(0);
  const [hide, setHide] = useState(false);

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;

    if (
      //currentScrollPosition > oldScrollPosition &&
      currentScrollPosition >= 200
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
    <>
      {hide && (
        <>
          <motion.div className="side-menu-logo">
            <motion.div
              initial="hide"
              animate="show"
              variants={hamburgerVariants}
              className="side-logo-wrapper"
            >
              <Logo className="side-logo" />
            </motion.div>
          </motion.div>
          <motion.div className="side-menu-button">
            <motion.div
              className="menu-button-wrapper"
              onMouseEnter={() =>
                document.querySelector(".custom-cursor").classList.add("medium")
              }
              onMouseLeave={() =>
                document
                  .querySelector(".custom-cursor")
                  .classList.remove("medium")
              }
              onClick={() => {
                setHide(false);
                document
                  .querySelector(".custom-cursor")
                  .classList.remove("medium");
              }}
              initial="hide"
              animate="show"
              exit="exit"
              transition={{ staggerChildren: 0.15 }}
            >
              <motion.span variants={hamburgerVariants}></motion.span>
              <motion.span variants={hamburgerVariants}></motion.span>
              <motion.span variants={hamburgerVariants}></motion.span>
            </motion.div>
          </motion.div>
        </>
      )}
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
    </>
  );
};

export default Navbar;
