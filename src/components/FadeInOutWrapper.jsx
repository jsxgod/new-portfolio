import React from "react";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../variants/globalVariants";

const FadeInOutWrapper = ({ children, once = true, stagger = 0.0 }) => {
  return (
    <motion.div
      initial="hide"
      whileInView="show"
      exit="hide"
      viewport={{ once: once }}
      variants={fadeUpVariants}
      transition={{ staggerChildren: stagger }}
      style={{ display: "block" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOutWrapper;
