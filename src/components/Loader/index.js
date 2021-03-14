import React from 'react';
/* Style */
import './style.css';

const Loader = () => {
  return (
    <div className="loader">
      <p className="loader__text">Loading</p>
      <div className="loader__spinner"></div>
    </div>
  );
}

export default Loader;