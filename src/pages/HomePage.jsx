import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  About,
  Navbar,
  Introduction,
  Projects,
  Contact,
  Footer,
  MobileMenu,
} from "../components";
import Scene from "../components/3D/Scene";
import useWindowDimensions from "../hooks/useWindowDimensions";

const HomePage = () => {
  const dimensions = useWindowDimensions();
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [loadCanvas, setLoadCanvas] = useState(false);
  const [sideLinksLocation, setSideLinksLocation] = useState("sidebar");
  const [navbarAnimationCompleted, setNavbarAnimationCompleted] =
    useState(false);

  useEffect(() => {
    document.querySelector(".custom-cursor").classList.remove("big");
    setTimeout(() => {
      setNavbarAnimationCompleted(true);
    }, 600);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoadCanvas(true);
    }, 1200);
  }, []);

  useEffect(() => {
    document.body.addEventListener(
      "touchstart",
      function (e) {
        if (e.target.id === "drawing-board") {
          e.preventDefault();
        }
      },
      { passive: false }
    );
    document.body.addEventListener(
      "touchend",
      function (e) {
        if (e.target.id === "drawing-board") {
          e.preventDefault();
        }
      },
      { passive: false }
    );
    document.body.addEventListener(
      "touchmove",
      function (e) {
        if (e.target.id === "drawing-board") {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }, []);

  const handleChangeSideLinksLocation = (location) => {
    setSideLinksLocation(location);
  };

  return (
    <div className="home-page">
      <Navbar
        sideLinksLocation={sideLinksLocation}
        mobileMenuOpened={mobileMenuOpened}
        mobileMenuToggler={setMobileMenuOpened}
      />
      <AnimatePresence>
        {dimensions.width <= 768 && mobileMenuOpened && (
          <MobileMenu handleClose={() => setMobileMenuOpened(false)} />
        )}
      </AnimatePresence>
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
          {dimensions.width > 992 && (
            <Footer
              sideLinksLocation={sideLinksLocation}
              changeLocation={handleChangeSideLinksLocation}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
