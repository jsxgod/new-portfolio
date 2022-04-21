const MouseInteractionWrapper = ({ children, size = "big" }) => {
  return (
    <div
      onMouseEnter={() => {
        document.querySelector(".custom-cursor").classList.add(size);
      }}
      onMouseLeave={() => {
        document.querySelector(".custom-cursor").classList.remove(size);
      }}
      onMouseDown={() => {
        document.querySelector(".custom-cursor").classList.remove(size);
      }}
    >
      {children}
    </div>
  );
};

export default MouseInteractionWrapper;
