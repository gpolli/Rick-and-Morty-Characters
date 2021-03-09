import React, { useState, useContext } from 'react';

const CharactersContext = React.createContext();
const CharactersUpdaterContext = React.createContext();

export const useCharacters = () => useContext(CharactersContext);
export const useCharactersUpdater = () => useContext(CharactersUpdaterContext);

export const CharactersProvider = ({ children }) => {
  const [charactersList, setCharactersList] = useState([]);

  function updateCharactersList(newCharacterList) {
    setCharactersList(newCharacterList);
  }

  return (
    <CharactersContext.Provider value={charactersList}>
      <CharactersUpdaterContext.Provider value={updateCharactersList}>
        {children}
      </CharactersUpdaterContext.Provider>
    </CharactersContext.Provider>
  );
}