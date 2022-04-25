import React, { useEffect, useState } from "react";
import {
  About,
  Navbar,
  Introduction,
  Projects,
  Contact,
  Footer,
} from "../components";

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

  const [sideLinksLocation, setSideLinksLocation] = useState("sidebar");

  const handleChangeSideLinksLocation = (location) => {
    setSideLinksLocation(location);
  };

  return (
    <div className="home-page">
      <Navbar sideLinksLocation={sideLinksLocation} />
      {navbarAnimationCompleted && (
        <>
          <Introduction />
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
