import React from 'react';
/* Components */
import CharacterCard from '../CharacterCard';

const CharactersList = ({ characters }) => {
  return (
    <section>
      {
        characters.length
          ? characters.map(character => (<CharacterCard character={character} />))
          : "No characters found"
      }
    </section>
  );
}

export default CharactersList;
