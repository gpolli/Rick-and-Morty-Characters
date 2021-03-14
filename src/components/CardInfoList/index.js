import React from 'react';
/* Components */
import InfoRow from '../InfoRow';
/* Helpers */
import { objectIsEmpty } from '../../helpers/utils';
/* Style */
import './style.css';

const CardInfoList = ({ parentClass, content }) => {
  if (!objectIsEmpty(content)) {
    const key = Object.keys(content)[0];

    switch (key) {
      case 'profile':
      case 'origin':
      case 'location':
        return (
          <div className={`${parentClass ? parentClass : ''} card-info-list`}>
            {Object.keys(content[key]).map((label, index) => {
              return <InfoRow label={label} value={content[key][label]} key={index} />;
            })}
          </div>
        );
      case 'episodes':
        return (
          <div className={`${parentClass ? parentClass : ''} card-info-list`}>
            {content[key].map((element, index) => {
              return <InfoRow value={`${element['episode']} - ${element['name']}`} key={index} />;
            })}
          </div>
        );
      default:
        return (
          <div className={`${parentClass ? parentClass : ''} card-info-list`}>
            No content available
          </div>
        );
    }
  }

  return (
    <div className={`${parentClass ? parentClass : ''} card-info-list`}>No content available</div>
  );
};

export default CardInfoList;
