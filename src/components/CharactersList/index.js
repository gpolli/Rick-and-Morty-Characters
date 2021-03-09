import React from 'react';
/* Components */
import CharacterCard from '../CharacterCard';
/* Style */
import './style.css';

const CharactersList = ({ characters }) => {
  return (
    <section>
      {
        characters.length
          ? characters.map(character => (<CharacterCard character={character} parentClass="characters-list__character-item" />))
          : "No characters found"
      }
    </section>
  );
}

export default CharactersList;
