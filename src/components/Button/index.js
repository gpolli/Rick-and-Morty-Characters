import React from 'react';

const Button = ({ className = "", type = "button", text = "", clickEvent = function () { }, disabled = false }) => {
  return (
    <button className={className} type={type} onClick={clickEvent} disabled={disabled}>{text}</button>
  );
}

export default Button;
