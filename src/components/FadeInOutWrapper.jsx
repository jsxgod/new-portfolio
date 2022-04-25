import React from "react";
import { motion } from "framer-motion";
import {
  fadeUpVariants,
  fadeUpVariantsGentle,
} from "../variants/globalVariants";

const FadeInOutWrapper = ({
  children,
  once = true,
  stagger = 0.0,
  gentle = false,
}) => {
  return (
    <motion.div
      initial="hide"
      whileInView="show"
      exit="hide"
      viewport={{ once: once }}
      variants={gentle ? fadeUpVariantsGentle : fadeUpVariants}
      transition={{ staggerChildren: stagger }}
      style={{ display: "block" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOutWrapper;
