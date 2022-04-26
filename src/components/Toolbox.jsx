import React from "react";
import { motion } from "framer-motion";
import { ReactComponent as Crayon } from "../assets/svg/crayon.svg";

const Toolbox = ({ selectedColor, handleChangeColor }) => {
  return (
    <div className="toolbox-wrapper">
      {[
        "black",
        "#c2cece",
        "#b72124",
        "pink",
        "orange",
        "yellow",
        "lightgreen",
        "lightblue",
      ].map((color) => (
        <motion.div
          className={`pen-wrapper ${selectedColor === color ? "active" : ""}`}
          key={color}
          animate={selectedColor === color ? { marginRight: 60 } : {}}
          whileHover={selectedColor === color ? {} : { marginRight: 25 }}
          onClick={() => {
            handleChangeColor(color);
          }}
        >
          <Crayon fill={color} stroke={color === "black" ? "white" : ""} />
        </motion.div>
      ))}
    </div>
  );
};

export default Toolbox;
