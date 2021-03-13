import React from 'react';
/* Style */
import './style.css';

const Button = ({ className = "", type = "button", text = "", clickEvent = function () { }, disabled = false, children }) => {
  return (
    <button className={`button ${className}`} type={type} onClick={clickEvent} disabled={disabled}>
      {text}{children}
    </button>
  );
}

export default Button;
