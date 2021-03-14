import React from 'react';
/* Style */
import './style.css';

const Loader = ({ parentClass = "" }) => {
  return (
    <div className={`${parentClass ? parentClass : ''} loader`}>
      <p className="loader__text">Loading</p>
      <div className="loader__spinner"></div>
    </div>
  );
}

export default Loader;