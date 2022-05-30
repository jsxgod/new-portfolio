import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../assets/svg/logo_outline.svg";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MouseInteractionWrapper } from "../components";
import useWindowDimensions from "../hooks/useWindowDimensions";

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

const linksWrapperVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  show: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.15,
      staggerDirection: -1,
    },
  },
};

const linksVariants = {
  hidden: {
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

const Navbar = ({ sideLinksLocation, mobileMenuOpened, mobileMenuToggler }) => {
  const [showChildren, setShowChildren] = useState(false);

  const [oldScrollPosition, setOldScrollPosition] = useState(0);
  const [hide, setHide] = useState(false);

  const dimensions = useWindowDimensions();

  const handleScroll = () => {
    if (window.innerWidth <= 768) {
      return;
    }

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

  const handleScrollToSection = (sectionName) => {
    const section = document.getElementById(`${sectionName}-section`);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOpenMenu = () => {
    if (window.innerWidth <= 768) {
      mobileMenuToggler((state) => !state);
    }
    setHide(false);
    document.querySelector(".custom-cursor").classList.remove("medium");
  };

  return (
    <>
      {(hide || dimensions.width <= 768) && (
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
              onClick={handleOpenMenu}
              initial="hide"
              animate="show"
              exit="exit"
              transition={
                dimensions.width <= 768
                  ? { delayChildren: 0.6, staggerChildren: 0.15 }
                  : { staggerChildren: 0.15 }
              }
            >
              <motion.span
                className={mobileMenuOpened ? "hidden" : ""}
                variants={hamburgerVariants}
              ></motion.span>
              <motion.span variants={hamburgerVariants}></motion.span>
              <motion.span
                className={mobileMenuOpened ? "hidden" : ""}
                variants={hamburgerVariants}
              ></motion.span>
            </motion.div>
          </motion.div>
          <AnimatePresence>
            {sideLinksLocation === "sidebar" && (
              <motion.div
                className="side-links-wrapper"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={linksWrapperVariants}
              >
                <motion.span className="side-link" variants={linksVariants}>
                  <MouseInteractionWrapper addClass="medium">
                    <FaGithub />
                  </MouseInteractionWrapper>
                </motion.span>
                <motion.span className="side-link" variants={linksVariants}>
                  <MouseInteractionWrapper addClass="medium">
                    <FaLinkedin />
                  </MouseInteractionWrapper>
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
      <nav
        className={`navbar-wrapper block-reveal up ${hide ? "hide" : ""} ${
          window.scrollY >= 200 && "glassmorphism"
        } ${dimensions.width <= 768 && "mobile-glassmorphism"}`}
        onAnimationEnd={() => setShowChildren(true)}
      >
        <motion.div
          variants={fadeInOutVariants}
          initial="hidden"
          animate={showChildren ? "show" : ""}
          exit="exit"
          className="logo-wrapper"
        >
          <MouseInteractionWrapper>
            <Logo
              className="logo-small"
              onClick={() => handleScrollToSection("introduction")}
            />
          </MouseInteractionWrapper>
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
              onClick={() => handleScrollToSection(link)}
            >
              <MouseInteractionWrapper>{link}</MouseInteractionWrapper>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </>
  );
};

export default Navbar;
