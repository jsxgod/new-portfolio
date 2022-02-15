import React, { useState } from "react";
import { ReactComponent as Logo } from "../assets/logo_outline.svg";

const wrapperVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
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
  hidden: { opacity: 0 },
  show: {
    opacity: 100,
    transition: { ease: [0.6, 0.05, -0.01, 0.99] },
  },
  exit: { opacity: 0 },
};

const Navbar = () => {
  return (
    <nav className="navbar-wrapper block-reveal up">
      <div className="logo-wrapper">
        <Logo className="logo-small" />
      </div>
      <ul className="links-container">
        <li className="navbar-link">work</li>
        <li className="navbar-link">projects</li>
        <li className="navbar-link">contact</li>
        <li className="navbar-link">cv</li>
      </ul>
    </nav>
  );
};

export default Navbar;
