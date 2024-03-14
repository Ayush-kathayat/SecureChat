import React from "react";
import "./button.css";

interface ButtonProps {
  text: string;
  children?: React.ReactNode;  // optional children 
  onClick?: () => void; // optional onClick  its not really optional aana hi hain ye toh 
}

const Button: React.FC<ButtonProps> = ({ text, children, onClick}) => {
  return (
    <div className="btn-container" onClick={onClick}>
      <a href="#" className="button">
        <div className="button__content">
          {children} {/* optional children */}
          <span className="button__text">{text}</span>
          <div className="button__reflection-1"></div>
          <div className="button__reflection-2"></div>
        </div>
      </a>
    </div>
  );
};

export default Button;