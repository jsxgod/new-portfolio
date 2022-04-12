export const fadeUpVariants = {
  hide: {
    opacity: 0,
    y: "2rem",
    transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.99] },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.99] },
  },
};
