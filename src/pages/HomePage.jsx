import React, { useEffect, useState } from "react";
import { About, Navbar, Introduction, Projects } from "../components";

const HomePage = () => {
  // change variable name
  const [navbarAnimationCompleted, setNavbarAnimationCompleted] =
    useState(false);
  useEffect(() => {
    setTimeout(() => {
      setNavbarAnimationCompleted(true);
    }, 600);
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      {navbarAnimationCompleted && (
        <>
          <Introduction />
          <About />
          <Projects />
        </>
      )}
    </div>
  );
};

export default HomePage;
