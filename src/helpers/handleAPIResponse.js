import { removeDuplicatesFromList, handleAPIRequest } from './utils';

export const formatResponse = (response) => {
  if (Array.isArray(response)) return response;

  if (response.hasOwnProperty('info')) {
    return response.results;
  }

  return [response];
};

export function fetchCharactersData(pageIndex, successCallback) {
  const query = pageIndex ? `?page=${pageIndex}` : '';

  const callbacks = {
    200: function (response) {
      successCallback(response, pageIndex);
    },
    default: function (response) { },
  };

  handleAPIRequest(
    {
      method: 'GET',
      url: `https://rickandmortyapi.com/api/character${query}`,
    },
    callbacks,
  );
}

export function fetchLocationsData(locationsIndexes, successCallback) {
  const query = locationsIndexes ? `/${locationsIndexes}` : '';

  const callbacks = {
    200: function (response) {
      successCallback(response.data);
    },
    default: function (response) { },
  };

  handleAPIRequest(
    {
      method: 'GET',
      url: `https://rickandmortyapi.com/api/location${query}`,
    },
    callbacks,
  );
}

export function fetchEpisodesData(episodesIndexes, successCallback) {
  const query = episodesIndexes ? `/${episodesIndexes}` : '';

  const callbacks = {
    200: function (response) {
      successCallback(response.data);
    },
    default: function (response) { },
  };

  handleAPIRequest(
    {
      method: 'GET',
      url: `https://rickandmortyapi.com/api/episode${query}`,
    },
    callbacks,
  );
}

export const getDataIndexesToRetrieve = (type, key, store) => {
  const regex = /[0-9]+/;
  const pageCharacters = store['characters'][key];
  const dataIndexes = { stored: [], toRequire: [] };

  switch (type) {
    case 'location':
    case 'origin': {
      if (pageCharacters) {
        const pageCharactersWithUrl = pageCharacters.filter(
          (character) => character[type]['url'],
        );
        const dataIndexesList = pageCharactersWithUrl.map(
          (character) => character[type]['url'].match(regex)[0],
        );
        const dataIndexesListWithoutDuplicates = removeDuplicatesFromList(dataIndexesList);

        dataIndexesListWithoutDuplicates.forEach((index) => {
          if (
            Object.values(store['locations']).some((location) => location.id === Number(index))
          ) {
            dataIndexes['stored'].push(index);
          } else {
            dataIndexes['toRequire'].push(index);
          }
        });
      }

      break;
    }
    case 'episode': {
      const pageCharactersWithUrl = pageCharacters.filter((character) => character[type].length);
      const episodesUrlList = pageCharactersWithUrl.reduce((accumulator, currentValue) => {
        return [...accumulator, ...currentValue[type]];
      }, []);
      const dataIndexesList = episodesUrlList.map((url) => url.match(regex)[0]);
      const dataIndexesListWithoutDuplicates = removeDuplicatesFromList(dataIndexesList);

      dataIndexesListWithoutDuplicates.forEach((index) => {
        if (Object.values(store['episodes']).some((episode) => episode.id === Number(index))) {
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
};
