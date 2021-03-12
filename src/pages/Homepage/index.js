import React, { useState, useEffect } from 'react';
/* Components */
import Pagination from '../../components/Pagination';
import CharactersList from '../../components/CharactersList';
/* Custom Hooks */
import { useGlobal, useGlobalUpdater } from '../../helpers/hooks/context/Rick&Morty/GlobalContext';
import { actions } from '../../helpers/hooks/reducer/Rick&Morty/actions';
/* Helpers */
import { objectIsEmpty, removeDuplicatesFromList, handleAPIRequest, joinObjectsFromList, groupObjectByProperty } from '../../helpers/utils';

const Homepage = () => {
  const state = useGlobal();
  const dispatch = useGlobalUpdater();
  const { currentPage, totalPages } = state.pagination;
  const { updatePagination, addCharacters, addLocations, addEpisodes } = actions;
  const [pageContent, setPageContent] = useState({ characters: [] });
  const [paginationLabels, setPaginationLabels] = useState({});

  const createPaginationLabelEnum = (total) => {
    const paginationLabelEnum = {};

    for (let i = 1; i <= total; i++) {
      paginationLabelEnum[i] = i;
    }

    return Object.freeze(paginationLabelEnum);
  }

  const formatResponse = (response) => {
    if (Array.isArray(response)) return response;

    if (response.hasOwnProperty('info')) {
      return response.results;
    }

    return [response]
  }

  function fetchCharactersData(pageIndex, successCallback) {
    const query = pageIndex ? `?page=${pageIndex}` : '';

    const callbacks = {
      200: function (response) {
        successCallback(response, pageIndex);
      },
      404: function (response) { },
      500: function (response) { },
      default: function (response) { },
    }

    handleAPIRequest({
      method: 'GET',
      url: `https://rickandmortyapi.com/api/character${query}`
    }, callbacks);
  }

  function fetchLocationsData(locationsIndexes, successCallback) {
    const query = locationsIndexes ? `/${locationsIndexes}` : '';

    const callbacks = {
      200: function (response) {
        successCallback(response.data);
      },
      404: function (response) { },
      500: function (response) { },
      default: function (response) { },
    }

    handleAPIRequest({
      method: 'GET',
      url: `https://rickandmortyapi.com/api/location${query}`
    }, callbacks);
  }

  function fetchEpisodesData(episodesIndexes, successCallback) {
    const query = episodesIndexes ? `/${episodesIndexes}` : '';

    const callbacks = {
      200: function (response) {
        successCallback(response.data);
      },
      404: function (response) { },
      500: function (response) { },
      default: function (response) { },
    }

    handleAPIRequest({
      method: 'GET',
      url: `https://rickandmortyapi.com/api/episode${query}`
    }, callbacks);
  }

  const getDataIndexesToRetrieve = (type, key, store) => {
    const regex = /[0-9]+/;
    const pageCharacters = store['characters'][key];
    const dataIndexes = { stored: [], toRequire: [] };

    switch (type) {
      case 'location':
      case 'origin': {
        if (pageCharacters) {
          const pageCharactersWithUrl = pageCharacters.filter(character => character[type]['url']);
          const dataIndexesList = pageCharactersWithUrl.map(character => character[type]['url'].match(regex)[0]);
          const dataIndexesListWithoutDuplicates = removeDuplicatesFromList(dataIndexesList);

          dataIndexesListWithoutDuplicates.forEach(index => {
            if (Object.values(store['locations']).some(location => location.id === Number(index))) {
              dataIndexes['stored'].push(index);
            } else {
              dataIndexes['toRequire'].push(index);
            }
          });
        }

        break;
      }
      case 'episode': {
        const pageCharactersWithUrl = pageCharacters.filter(character => character[type].length);
        const episodesUrlList = pageCharactersWithUrl.reduce((accumulator, currentValue) => {
          return [...accumulator, ...currentValue[type]]
        }, []);
        const dataIndexesList = episodesUrlList.map(url => url.match(regex)[0]);
        const dataIndexesListWithoutDuplicates = removeDuplicatesFromList(dataIndexesList);

        dataIndexesListWithoutDuplicates.forEach(index => {
          if (Object.values(store['episodes']).some(episode => episode.id === Number(index))) {
            dataIndexes['stored'].push(index);
          } else {
            dataIndexes['toRequire'].push(index);
          }
        });

        break;
      }
      default:
    }

    return dataIndexes;
  }

  function retrieveData(type, key, store) {
    switch (type) {
      case 'characters':
        if (Object.keys(store['characters']).some(storedKey => storedKey === String(key))) {
          setPageContent({ characters: store['characters'][key] });
        } else {
          const successCallback = function (response, pageIndex) {
            const { results } = response.data;

            dispatch(addCharacters({ list: results, pageIndex }));
            setPageContent({ characters: results })
          }

          fetchCharactersData(key, successCallback);
        }
        break;
      case 'locations': {
        const originsDataIndexes = getDataIndexesToRetrieve('origin', key, store);
        const locationsDataIndexes = getDataIndexesToRetrieve('location', key, store);

        const mergedDataIndexedStored = removeDuplicatesFromList([...originsDataIndexes['stored'], ...locationsDataIndexes['stored']]);
        const mergedDataIndexedToRequire = removeDuplicatesFromList([...originsDataIndexes['toRequire'], ...locationsDataIndexes['toRequire']]).join();

        const storedData = mergedDataIndexedStored.map(index => Object.values(store['locations']).filter(location => location.id === Number(index))[0]);

        if (mergedDataIndexedToRequire) {
          const successCallback = function (response) {
            response = formatResponse(response);

            dispatch(addLocations(response));
            setPageContent({ ...pageContent, locations: joinObjectsFromList([...storedData, ...response].map(location => groupObjectByProperty(location, location.name))) });
          }

          fetchLocationsData(mergedDataIndexedToRequire, successCallback);
        } else {
          setPageContent({ ...pageContent, locations: joinObjectsFromList(storedData.map(location => groupObjectByProperty(location, location.name))) });
        }

        break;
      }
      case 'episodes':
        const dataIndexes = getDataIndexesToRetrieve('episode', key, store);
        const storedData = dataIndexes['stored'].map(index => Object.values(store['episodes']).filter(episode => episode.id === Number(index))[0]);

        if (dataIndexes['toRequire'].join()) {
          const successCallback = function (response) {
            response = formatResponse(response);

            dispatch(addEpisodes(response));
            setPageContent({ ...pageContent, episodes: joinObjectsFromList([...storedData, ...response].map(episode => groupObjectByProperty(episode, episode.id))) });
          }

          fetchEpisodesData(dataIndexes['toRequire'], successCallback);
        } else {
          setPageContent({ ...pageContent, episodes: joinObjectsFromList(storedData.map(episode => groupObjectByProperty(episode, episode.id))) })
        }

        break;
      default:
    }
  }

  useEffect(function () {
    const successCallback = function (response, pageIndex) {
      const { info, results } = response.data;

      dispatch(updatePagination({ totalPages: info.pages }));
      dispatch(addCharacters({ list: results, pageIndex }));
      setPageContent({ ...pageContent, characters: results })
    }

    fetchCharactersData(1, successCallback);
  }, []);

  useEffect(function () {
    if (pageContent.characters.length) {
      retrieveData('locations', currentPage, state);
    }
  }, [pageContent.characters]);

  useEffect(function () {
    if (pageContent.characters.length && pageContent.locations) {
      retrieveData('episodes', currentPage, state);
    }
  }, [pageContent.locations]);

  useEffect(function () {
    setPaginationLabels(createPaginationLabelEnum(totalPages));
  }, [totalPages]);

  function updateContent(key) {
    dispatch(updatePagination({ currentPage: key }));
    retrieveData('characters', key, state);
  }


  // test
  // useEffect(function () {
  //   console.log('characters: ', pageContent);
  // }, [pageContent.characters]);
  // useEffect(function () {
  //   console.log('locations: ', pageContent);
  // }, [pageContent.locations]);
  // useEffect(function () {
  //   console.log('episodes: ', pageContent);
  // }, [pageContent.episodes]);

  return (
    <>
      <h1>Rick & Morty Characters</h1>
      <main>
        <Pagination
          content={pageContent}
          updateContent={(key) => updateContent(key)}
          totalPages={totalPages}
          buttonGroupSettings={{ labels: paginationLabels, amountToShow: 3, showStartButton: true, showEndButton: true }}
          render={content => (<CharactersList content={content} />)} />
      </main>
    </>
  );
}

export default Homepage;
