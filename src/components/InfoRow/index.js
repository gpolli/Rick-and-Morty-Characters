import React from 'react';
/* Style */
import './style.css';

const InfoRow = ({ label, value }) => {
  return (
    <div className={`info-row ${!label ? 'info-row--only-value' : ''}`}>
      { label ? <p className="info-row__label">{label}: </p> : null}
      <p className="info-row__value">{value}</p>
    </div>
  )
}

export default InfoRow;