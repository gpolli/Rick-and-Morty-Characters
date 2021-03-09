import React, { useState, useEffect } from 'react';
/* Components */
import Pagination from '../../components/Pagination';
import CharactersList from '../../components/CharactersList';
/* Custom Hooks */
import { useCharacters, useCharactersUpdater } from '../../helpers/hooks/CharactersContext';

const Homepage = () => {
  const charactersList = useCharacters();
  const updateCharactersList = useCharactersUpdater();
  const [paginationInfo, setPaginationInfo] = useState({ currentPage: 1, pages: 0, apiEndpoint: "https://rickandmortyapi.com/api/character" });
  const { currentPage, pages, apiEndpoint } = paginationInfo;

  useEffect(function () {
    const getInitialData = async function () {
      const response = await fetch(`${apiEndpoint}`);
      const json = await response.json();
      const { info, results } = json;

      setPaginationInfo(prevPaginationInfo => {
        return {
          ...prevPaginationInfo,
          pages: info.pages,
        };
      });

      updateCharactersList(results);
    }

    getInitialData();
  }, []);

  return (
    <>
      <h1>Rick & Morty Characters</h1>
      <main>
        <Pagination apiEndpoint={apiEndpoint} currentPage={currentPage} pages={pages}>
          <CharactersList characters={charactersList} />
        </Pagination>
      </main>
    </>
  );
}

export default Homepage;
