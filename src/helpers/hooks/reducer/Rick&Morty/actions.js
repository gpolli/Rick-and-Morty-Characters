import { ACTION_TYPES } from './actionTypes';

export const actions = {
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
  addLocation: (payload) => {
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
}
