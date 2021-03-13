import React, { useContext, useReducer } from 'react';
/* Reducer Hooks */
import { initialState, reducer } from '../../reducer/Rick&Morty/reducer';

const GlobalContext = React.createContext();
const GlobalUpdaterContext = React.createContext();

export const useGlobal = () => useContext(GlobalContext);
export const useGlobalUpdater = () => useContext(GlobalUpdaterContext);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function updateState(action) {
    dispatch(action);
  }

  return (
    <GlobalContext.Provider value={state}>
      <GlobalUpdaterContext.Provider value={updateState}>
        {children}
      </GlobalUpdaterContext.Provider>
    </GlobalContext.Provider>
  );
}