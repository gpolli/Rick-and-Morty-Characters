import React from 'react';
/* Style */
import './style.css';

export const Overlay = ({ isVisible = false, clickEvent = function () {}, children }) => {
  const closeOverlay = function (event, callback) {
    const currentTarget = event.currentTarget;
    const target = event.target;

    if (currentTarget === target) {
      callback();
    }
  };

  return (
    <div
      className={`overlay ${isVisible ? 'overlay--is-visible' : ''}`}
      onClick={(event) => closeOverlay(event, clickEvent)}
    >
      {children}
    </div>
  );
};

export default Overlay;
