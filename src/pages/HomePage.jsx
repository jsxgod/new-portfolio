import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  About,
  Navbar,
  Introduction,
  Projects,
  Contact,
  Footer,
} from "../components";
import Scene from "../components/3D/Scene";

const HomePage = () => {
  // change variable name
  const [navbarAnimationCompleted, setNavbarAnimationCompleted] =
    useState(false);
  useEffect(() => {
    document.querySelector(".custom-cursor").classList.remove("big");
    setTimeout(() => {
      setNavbarAnimationCompleted(true);
    }, 600);
  }, []);
  const [loadCanvas, setLoadCanvas] = useState(false);

  const [sideLinksLocation, setSideLinksLocation] = useState("sidebar");

  const handleChangeSideLinksLocation = (location) => {
    setSideLinksLocation(location);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoadCanvas(true);
    }, 1200);
  }, []);

  return (
    <div className="home-page">
      <Navbar sideLinksLocation={sideLinksLocation} />
      {loadCanvas && (
        <motion.div
          className="scene-wrapper"
          initial={{ opacity: 0 }}
          animate={
            loadCanvas
              ? { opacity: 1, transition: { delay: 0.3, duration: 1 } }
              : {}
          }
        >
          <Scene />
        </motion.div>
      )}
      {navbarAnimationCompleted && (
        <>
          <Introduction showContent={navbarAnimationCompleted} />
          <About />
          <Projects />
          <Contact />
          <Footer
            sideLinksLocation={sideLinksLocation}
            changeLocation={handleChangeSideLinksLocation}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
