import { MouseInteractionWrapper } from "../components";

const CustomLabel = (props) => {
  return (
    <label className={`input-wrapper ${props.name}`}>
      <span className="input-header">{`${props.name[0].toUpperCase()}${props.name.slice(
        1
      )}${props.required ? " *" : ""}`}</span>
      <MouseInteractionWrapper addClass="medium">
        <input
          className="input"
          type="text"
          value={props.value}
          required={props.required}
          spellCheck={false}
          onChange={props.handler}
        ></input>
      </MouseInteractionWrapper>
      <span className="border"></span>
    </label>
  );
};

export default CustomLabel;
