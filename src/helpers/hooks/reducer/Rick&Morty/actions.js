import { ACTION_TYPES } from './actionTypes';

export const actions = {
  updateOverlay: (payload) => {
    return {
      type: ACTION_TYPES.UPDATE_OVERLAY,
      payload,
    };
  },
  updatePagination: (payload) => {
    return {
      type: ACTION_TYPES.UPDATE_PAGINATION,
      payload,
    };
  },
  addCharacters: (payload) => {
    return {
      type: ACTION_TYPES.ADD_CHARACTERS,
      payload,
    };
  },
  addLocations: (payload) => {
    return {
      type: ACTION_TYPES.ADD_LOCATIONS,
      payload,
    };
  },
  addEpisodes: (payload) => {
    return {
      type: ACTION_TYPES.ADD_EPISODES,
      payload,
    };
  },
};
