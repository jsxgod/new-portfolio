import { useState, useRef } from "react";
import { HomePage } from "./pages";
import { LogoButton } from "./components";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

import "./sass/main.scss";

const App = () => {
  const [showSite, setShowSite] = useState(false);
  const customCursor = useRef(null);

  const moveCursor = (event) => {
    try {
      customCursor.current.style.left = `${event.clientX}px`;
      customCursor.current.style.top = `${event.clientY}px`;
    } catch (error) {
      console.log(error);
    }
  };

  const handleProgressToSite = () => {
    setShowSite(true);
    document.querySelector(".custom-cursor").classList.remove("big");
  };

  return (
    <div className="App" onMouseMove={(event) => moveCursor(event)}>
      <motion.div
        className="custom-cursor enabled"
        ref={customCursor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      ></motion.div>
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence exitBeforeEnter>
          {showSite ? (
            <HomePage key="homepage" />
          ) : (
            <LogoButton key="logo" onClickHandler={handleProgressToSite} />
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
};

export default App;
