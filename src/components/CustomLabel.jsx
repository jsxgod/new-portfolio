const CustomLabel = (props) => {
  return (
    <label
      className={`input-wrapper ${props.name}`}
      onMouseEnter={() => {
        document.querySelector(".custom-cursor").classList.add("medium");
      }}
      onMouseLeave={() => {
        document.querySelector(".custom-cursor").classList.remove("medium");
      }}
      onMouseDown={() => {
        document.querySelector(".custom-cursor").classList.remove("medium");
      }}
    >
      <span className="input-header">{`${props.name[0].toUpperCase()}${props.name.slice(
        1
      )}${props.required ? " *" : ""}`}</span>
      <input
        className="input"
        type="text"
        value={props.value}
        required={props.required}
        spellCheck={false}
        onChange={props.handler}
      ></input>
      <span className="border"></span>
    </label>
  );
};

export default CustomLabel;
