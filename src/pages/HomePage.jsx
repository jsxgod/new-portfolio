import React, { useEffect, useState } from "react";
import { About, Navbar, Introduction } from "../components";

const HomePage = () => {
  const [showIntroduction, setShowIntroduction] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowIntroduction(true);
    }, 1350);
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      {showIntroduction && (
        <>
          <Introduction />
          <About />
        </>
      )}
    </div>
  );
};

export default HomePage;
