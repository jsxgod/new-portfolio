const MouseInteractionWrapper = ({
  children,
  addClass = "big",
  removeClass,
}) => {
  return (
    <span
      onMouseEnter={() => {
        document.querySelector(".custom-cursor").classList.add(addClass);
      }}
      onMouseLeave={() => {
        document.querySelector(".custom-cursor").classList.remove(addClass);
      }}
      onMouseDown={() => {
        document
          .querySelector(".custom-cursor")
          .classList.remove(removeClass !== undefined ? removeClass : addClass);
      }}
    >
      {children}
    </span>
  );
};

export default MouseInteractionWrapper;
