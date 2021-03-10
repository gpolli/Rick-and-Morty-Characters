import React, { useState, useEffect } from 'react';
/* Components */
import Pagination from '../../components/Pagination';
import CharactersList from '../../components/CharactersList';
/* Custom Hooks */
import { useGlobal, useGlobalUpdater } from '../../helpers/hooks/context/Rick&Morty/GlobalContext';
import { actions } from '../../helpers/hooks/reducer/Rick&Morty/actions';
/* Helpers */
import { objectIsEmpty, removeDuplicatesFromList, handleAPIRequest } from '../../helpers/utils';

const Homepage = () => {
  const state = useGlobal();
  const dispatch = useGlobalUpdater();
  const { pagination, characters, locations } = state;
  const { currentPage, pages, apiEndpoint } = pagination;
  const { updatePagination, addCharacters, addLocations } = actions;

  function updateLocations(response) {
    dispatch(addLocations(response));
  }

  const removeLocationsAlreadyStored = (list, storedLocations) => {
    console.log('location already stored: ', list, storedLocations);

    return list.filter(item => !Object.values(storedLocations).some(location => location.id === Number(item)));
  }

  useEffect(function () {
    const getInitialData = async function () {
      const response = await fetch(`${apiEndpoint}?page=${currentPage}`);
      const json = await response.json();
      const { info, results } = json;

      dispatch(addCharacters({ list: results, pageIndex: currentPage }));
      dispatch(updatePagination({ pages: info.pages }));
    }

    getInitialData();
  }, []);

  useEffect(function () {
    const regex = /[0-9]+/;

    if (!objectIsEmpty(characters) && characters[String(currentPage)].length) {
      const locationsIndex = removeLocationsAlreadyStored(removeDuplicatesFromList(characters[currentPage].filter(character => character.location.url).map(character => {
        return character.location.url.match(regex)[0];
      })), locations).join();

      if (locationsIndex) {
        handleAPIRequest(`https://rickandmortyapi.com/api/location/${locationsIndex}`, updateLocations);
      }
    }
  }, [pagination]);

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
