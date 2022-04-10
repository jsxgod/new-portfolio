import React, { useEffect, useState } from "react";
import { About, Navbar, Introduction, Projects, Contact } from "../components";

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
          <Contact />
        </>
      )}
    </div>
  );
};

export default HomePage;
