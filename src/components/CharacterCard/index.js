import React from 'react';
/* Style */
import './style.css';

const CharacterCard = ({ character, parentClass }) => {
  const { name, status, species, type, gender, image } = character;

  return (
    <div className={`${parentClass} character-card`}>
      <img className="character-card__image" src={image} alt={name} />
      <section className="character-card__registry">
        <div className="character-card__info-group">
          <p className="character-card__info-label">Name: </p>
          <p className="character-card__info-value">{name}</p>
        </div>
        <div className="character-card__info-group">
          <p className="character-card__info-label">Status: </p>
          <p className="character-card__info-value">{status}</p>
        </div>
        <div className="character-card__info-group">
          <p className="character-card__info-label">Species: </p>
          <p className="character-card__info-value">{species}</p>
        </div>
        <div className="character-card__info-group">
          <p className="character-card__info-label">Type: </p>
          <p className="character-card__info-value">{type}</p>
        </div>
        <div className="character-card__info-group">
          <p className="character-card__info-label">Gender: </p>
          <p className="character-card__info-value">{gender}</p>
        </div>
      </section>
    </div>
  );
}

export default CharacterCard;
