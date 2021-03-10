import React, { useState, useEffect } from 'react';
/* Components */
import Pagination from '../../components/Pagination';
import CharactersList from '../../components/CharactersList';
/* Custom Hooks */
import { useGlobal, useGlobalUpdater } from '../../helpers/hooks/context/Rick&Morty/GlobalContext';
import { actions } from '../../helpers/hooks/reducer/Rick&Morty/actions';

const Homepage = () => {
  const state = useGlobal();
  const dispatch = useGlobalUpdater();
  const { pagination, characters } = state;
  const { currentPage, pages, apiEndpoint } = pagination;
  const { updatePagination, addCharacters } = actions;

  useEffect(function () {
    const getInitialData = async function () {
      const response = await fetch(`${apiEndpoint}?page=${currentPage}`);
      const json = await response.json();
      const { info, results } = json;

      dispatch(updatePagination({ pages: info.pages }));
      dispatch(addCharacters({ list: results, pageIndex: currentPage }));
    }

    getInitialData();
  }, []);

  // Per controllo
  useEffect(function () {
    console.log(characters);
  }, [characters]);

  return (
    <>
      <h1>Rick & Morty Characters</h1>
      <main>
        <Pagination>
          <CharactersList characters={characters[currentPage]} />
        </Pagination>
      </main>
    </>
  );
}

export default Homepage;
