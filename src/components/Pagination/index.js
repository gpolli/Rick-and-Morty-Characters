import React, { useState, useEffect } from 'react';
/* Components */
import Button from '../Button';
/* Custom Hooks */
import { useGlobal, useGlobalUpdater } from '../../helpers/hooks/context/Rick&Morty/GlobalContext';
import { actions } from '../../helpers/hooks/reducer/Rick&Morty/actions';
/* Style */
import './style.css';

const Pagination = ({ children }) => {
  const state = useGlobal();
  const dispatch = useGlobalUpdater();
  const { pagination, characters } = state;
  const { currentPage, pages, apiEndpoint } = pagination;
  const { updatePagination, addCharacters } = actions;

  async function getPageData(pageIndex) {
    const response = await fetch(`${apiEndpoint}?page=${pageIndex}`);
    const json = await response.json();
    const { results } = json;

    dispatch(updatePagination({ currentPage: pageIndex }));
    dispatch(addCharacters({ list: results, pageIndex }));
  }

  function updateCurrentPageData(pageIndex) {
    if (Object.keys(characters).some(storedPage => storedPage === String(pageIndex))) {
      dispatch(updatePagination({ currentPage: pageIndex }))
    } else {
      getPageData(pageIndex);
    }
  }

  return (
    <div className="pagination">
      {children}
      <section className="pagination__buttons-wrapper">
        {currentPage !== 1 ? (<Button className="pagination__button" text={currentPage - 1} clickEvent={() => updateCurrentPageData(currentPage - 1)} />) : null}
        <Button className="pagination__button" text={currentPage} disabled={true} />
        {currentPage !== pages ? <Button className="pagination__button" text={currentPage + 1} clickEvent={() => updateCurrentPageData(currentPage + 1)} /> : null}
      </section>
    </div>
  );
}

export default Pagination;
