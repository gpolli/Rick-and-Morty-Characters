import React, { useState, useEffect } from 'react';
/* Assets */
import logo from '../../assets/images/rick_morty_logo.png';
/* Components */
import Overlay from '../../components/Overlay';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import CharactersList from '../../components/CharactersList';
import Footer from '../../components/Footer';
/* Custom Hooks */
import { useGlobal, useGlobalUpdater } from '../../helpers/hooks/context/Rick&Morty/GlobalContext';
import { actions } from '../../helpers/hooks/reducer/Rick&Morty/actions';
/* Helpers */
import {
  removeDuplicatesFromList,
  joinObjectsFromList,
  groupObjectByProperty,
} from '../../helpers/utils';
import {
  formatResponse,
  fetchCharactersData,
  fetchLocationsData,
  fetchEpisodesData,
  getDataIndexesToRetrieve,
} from '../../helpers/handleAPIResponse';
/* Style */
import './style.css';

const Homepage = () => {
  const state = useGlobal();
  const dispatch = useGlobalUpdater();
  const { overlay } = state;
  const { currentPage, totalPages, updatingContent } = state.pagination;
  const { updateOverlay, updatePagination, addCharacters, addLocations, addEpisodes } = actions;
  const [pageContent, setPageContent] = useState({ characters: [] });
  const [paginationLabels, setPaginationLabels] = useState({});

  const createPaginationLabelEnum = (total) => {
    const paginationLabelEnum = {};

    for (let i = 1; i <= total; i++) {
      paginationLabelEnum[i] = i;
    }

    return Object.freeze(paginationLabelEnum);
  };

  function updateContent(key) {
    dispatch(updatePagination({ currentPage: key, updatingContent: true }));
    dispatch(updateOverlay({ isVisible: true }));
    retrieveData('characters', key, state);
  }

  function handleCharactersSuccessResponse(response, pageIndex) {
    const { results } = response.data;

    dispatch(addCharacters({ list: results, pageIndex }));
    setPageContent({ characters: results });
  }

  function handleLocationsSuccessResponse(response, storedData) {
    response = formatResponse(response);

    dispatch(addLocations(response));
    setPageContent({
      ...pageContent,
      locations: joinObjectsFromList(
        [...storedData, ...response].map((location) =>
          groupObjectByProperty(location, location.name),
        ),
      ),
    });
  }

  function handleEpisodesSuccessResponse(response, storedData) {
    response = formatResponse(response);

    dispatch(addEpisodes(response));
    setPageContent({
      ...pageContent,
      episodes: joinObjectsFromList(
        [...storedData, ...response].map((episode) => groupObjectByProperty(episode, episode.id)),
      ),
    });
    dispatch(updatePagination({ ...state.pagination, updatingContent: false }));

    if (overlay.isVisible) {
      window.scrollTo(0, document.body.scrollHeight);
      dispatch(updateOverlay({ isVisible: false }));
    }
  }

  function retrieveData(type, key, store) {
    switch (type) {
      case 'characters':
        if (Object.keys(store['characters']).some((storedKey) => storedKey === String(key))) {
          setPageContent({ characters: store['characters'][key] });
        } else {
          fetchCharactersData(key, handleCharactersSuccessResponse);
        }
        break;
      case 'locations': {
        const originsDataIndexes = getDataIndexesToRetrieve('origin', key, store);
        const locationsDataIndexes = getDataIndexesToRetrieve('location', key, store);

        const mergedDataIndexedStored = removeDuplicatesFromList([
          ...originsDataIndexes['stored'],
          ...locationsDataIndexes['stored'],
        ]);
        const mergedDataIndexedToRequire = removeDuplicatesFromList([
          ...originsDataIndexes['toRequire'],
          ...locationsDataIndexes['toRequire'],
        ]).join();

        const storedData = mergedDataIndexedStored.map(
          (index) =>
            Object.values(store['locations']).filter(
              (location) => location.id === Number(index),
            )[0],
        );

        if (mergedDataIndexedToRequire) {
          fetchLocationsData(mergedDataIndexedToRequire, (response) =>
            handleLocationsSuccessResponse(response, storedData),
          );
        } else {
          setPageContent({
            ...pageContent,
            locations: joinObjectsFromList(
              storedData.map((location) => groupObjectByProperty(location, location.name)),
            ),
          });
        }

        break;
      }
      case 'episodes':
        const dataIndexes = getDataIndexesToRetrieve('episode', key, store);
        const storedData = dataIndexes['stored'].map(
          (index) =>
            Object.values(store['episodes']).filter((episode) => episode.id === Number(index))[0],
        );

        if (dataIndexes['toRequire'].join()) {
          fetchEpisodesData(dataIndexes['toRequire'], (response) =>
            handleEpisodesSuccessResponse(response, storedData),
          );
        } else {
          setPageContent({
            ...pageContent,
            episodes: joinObjectsFromList(
              storedData.map((episode) => groupObjectByProperty(episode, episode.id)),
            ),
          });
          dispatch(updatePagination({ ...state.pagination, updatingContent: false }));

          if (overlay.isVisible) {
            window.scrollTo(0, document.body.scrollHeight);
            dispatch(updateOverlay({ isVisible: false }));
          }
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
      setPageContent({ ...pageContent, characters: results });
    };

    fetchCharactersData(1, successCallback);
  }, []);

  useEffect(
    function () {
      if (pageContent.characters.length) {
        retrieveData('locations', currentPage, state);
      }
    },
    [pageContent.characters],
  );

  useEffect(
    function () {
      if (pageContent.characters.length && pageContent.locations) {
        retrieveData('episodes', currentPage, state);
      }
    },
    [pageContent.locations],
  );

  useEffect(
    function () {
      setPaginationLabels(createPaginationLabelEnum(totalPages));
    },
    [totalPages],
  );

  return (
    <>
      <Overlay isVisible={overlay.isVisible}>
        <Loader />
      </Overlay>
      <main className="homepage">
        <img className="homepage__logo" src={logo} alt="Rick&Morty logo" />
        <h2 className="homepage__subtitle">Characters List</h2>
        <Pagination
          content={pageContent}
          updateContent={(key) => updateContent(key)}
          updatingContent={updatingContent}
          totalPages={totalPages}
          parentClass="homepage__pagination"
          buttonGroupSettings={{
            labels: paginationLabels,
            amountToShow: 3,
            showStartButton: true,
            showEndButton: true,
            reinitOnContentUpdate: false,
            styleModifiers: { size: 'big', buttonWidth: 'fixed' },
          }}
          render={(content) => (
            <CharactersList parentClass="pagination__content" content={content} />
          )}
        />
      </main>
      <Footer />
    </>
  );
};

export default Homepage;
