import React, { useState, useEffect } from 'react';
/* Components */
import Pagination from '../Pagination';
import CardInfoList from '../CardInfoList';
/* Helpers */
import { objectIsEmpty } from '../../helpers/utils';
/* Style */
import './style.css';

const CharacterCard = ({ content, character, parentClass }) => {
  const { name, image } = character;
  const [cardContent, setCardContent] = useState({});
  const [paginationLabels, setPaginationLabels] = useState({});

  const createPaginationLabelEnum = (content) => {
    if (!objectIsEmpty(content['dynamic'])) {
      const paginationLabelEnum = Object.keys(content['dynamic']).reduce((accumulator, currentValue, index) => {
        return { ...accumulator, [index + 1]: currentValue }
      }, {});

      return Object.freeze(paginationLabelEnum);
    }

    return {};
  };

  function updateContent(key) {
    if (!objectIsEmpty(paginationLabels)) {
      const currentContent = paginationLabels[key];

      setCardContent({ [currentContent]: content['dynamic'][currentContent] });
    }
  }

  useEffect(function () {
    if (!objectIsEmpty(paginationLabels)) {
      const currentContent = paginationLabels[1];

      setCardContent({ [currentContent]: content['dynamic'][currentContent] });
    }
  }, [paginationLabels]);

  useEffect(function () {
    setPaginationLabels(createPaginationLabelEnum(content));
  }, [content]);

  return (
    <div className={`${parentClass} character-card`}>
      <img className="character-card__image" src={image} alt={name} />

      <section className="character-card__info-wrapper">
        <h3 className="character-card__name">{name}</h3>
        <Pagination
          content={cardContent}
          updateContent={key => updateContent(key)}
          totalPages={Object.keys(content['dynamic']).length}
          styleModifiers={{ reverseContentOrder: true }}
          buttonGroupSettings={{ labels: paginationLabels, amountToShow: 4, showStartButton: false, showEndButton: false, reinitOnContentUpdate: true }}
          render={(content) => (<CardInfoList parentClass="pagination__content" content={content} />)}
        />
      </section>
    </div>
  );
}

export default CharacterCard;
