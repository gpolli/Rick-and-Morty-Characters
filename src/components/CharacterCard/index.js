import React from 'react';

const CharacterCard = ({ character }) => {
  const { name, status, species, type, gender, image } = character;

  return (
    <div>
      <img src={image} alt={name} />
      <section>
        <p>{name}</p>
        <p>{status}</p>
        <p>{species}</p>
        <p>{type}</p>
        <p>{gender}</p>
      </section>
    </div>
  );
}

export default CharacterCard;
