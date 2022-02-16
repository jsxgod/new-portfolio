import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { LogoAnimation, Navbar } from "../components";

const HomePage = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  }, []);

  return (
    <div className="home-page">
      <AnimatePresence exitBeforeEnter>
        {showAnimation ? <LogoAnimation key="logo" /> : <Navbar key="navbar" />}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
