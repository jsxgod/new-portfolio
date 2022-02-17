import { useState, useEffect, useRef } from "react";
import { HomePage } from "./pages";
import { LogoAnimation } from "./components";
import { AnimatePresence } from "framer-motion";

import "./sass/main.scss";

const App = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const customCursor = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  }, []);

  const moveCursor = (event) => {
    try {
      customCursor.current.style.left = `${event.clientX}px`;
      customCursor.current.style.top = `${event.clientY}px`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App" onMouseMove={(event) => moveCursor(event)}>
      <div className="custom-cursor" ref={customCursor}></div>
      <AnimatePresence exitBeforeEnter>
        {showAnimation ? (
          <LogoAnimation key="logo" />
        ) : (
          <HomePage key="homepage" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
