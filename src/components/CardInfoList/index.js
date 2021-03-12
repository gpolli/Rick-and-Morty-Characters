import React from 'react';
/* Components */
import InfoRow from '../InfoRow';
/* Helpers */
import { objectIsEmpty } from '../../helpers/utils';
/* Style */
import './style.css';

const CardInfoList = ({ content }) => {
  if (!objectIsEmpty(content)) {
    const key = Object.keys(content)[0];

    switch (key) {
      case 'profile':
      case 'origin':
      case 'location':
        return (
          <div className="card-info-list">
            {
              Object.keys(content[key]).map((label) => {
                return (<InfoRow label={label} value={content[key][label]} />);
              })
            }
          </div>
        );
      case 'episodes':
        return (
          <div className="card-info-list">
            {
              content[key].map(element => {
                return (<InfoRow label='episode' value={`${element['episode']} - ${element['name']}`} />);
              })
            }
          </div>
        );
      default:
        return (<div>No content available</div>);
    }
  }

  return (<div>No content available</div>);
}

export default CardInfoList;