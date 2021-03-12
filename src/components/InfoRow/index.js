import React from 'react';
/* Style */
import './style.css';

const InfoRow = ({ label, value }) => {
  return (
    <div className="info-row">
      <p className="info-row__label">{label}: </p>
      <p className="info-row__value">{value}</p>
    </div>
  )
}

export default InfoRow;