import React from "react";
import { ReactComponent as Logo } from "../assets/logo_outline.svg";

const LogoAnimation = () => {
  return (
    <div className="logo-animation">
      <div className="logo-wrapper">
        <Logo className="logo" />
      </div>
    </div>
  );
};

export default LogoAnimation;
