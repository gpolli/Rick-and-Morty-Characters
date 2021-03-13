import { ACTION_TYPES } from './actionTypes';
/* Helpers */
import { groupListByPageIndex, groupObjectByProperty, getSortedListOfObject, joinObjectsFromList } from '../../../utils';

export const initialState = {
  pagination: {
    currentPage: 1,
    totalPages: 0,
    updatingContent: false,
  },
  characters: {},
  locations: {},
  episodes: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_PAGINATION:
      const newPagination = { ...state.pagination, ...action.payload };

      return {
        ...state,
        pagination: newPagination,
      };
    case ACTION_TYPES.ADD_CHARACTERS: {
      const objectToJoin = groupListByPageIndex(action.payload.list, action.payload.pageIndex);
      const newCharacters = { ...state.characters, ...objectToJoin };

      return {
        ...state,
        characters: newCharacters
      }
    }
    case ACTION_TYPES.ADD_LOCATIONS: {
      const objectToJoin = joinObjectsFromList(action.payload.map(location => groupObjectByProperty(location, location.name)));
      const newLocations = { ...state.locations, ...objectToJoin };

      return {
        ...state,
        locations: newLocations
      }
    }
    case ACTION_TYPES.ADD_EPISODES:
      const objectToJoin = joinObjectsFromList(action.payload.map(episode => groupObjectByProperty(episode, episode.id)))
      const newEpisodes = { ...state.episodes, ...objectToJoin };

      return {
        ...state,
        episodes: newEpisodes
      }
    default:
      return state;
  }
}