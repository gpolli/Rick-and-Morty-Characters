import React, { useState, useEffect } from 'react';
/* Components */
import Button from '../Button';
/* Custom Hooks */
import { useCharactersUpdater } from '../../helpers/hooks/CharactersContext';
/* Style */
import './style.css';

const Pagination = ({ initialPage, pages, apiEndpoint, children }) => {
  const [paginationInfo, setPaginationInfo] = useState({ currentPage: initialPage, pages, apiEndpoint });
  const { currentPage } = paginationInfo;
  const updateCharactersList = useCharactersUpdater();

  async function getPageData(pageIndex) {
    const response = await fetch(`${apiEndpoint}?page=${pageIndex}`);
    const json = await response.json();
    const { results } = json;

    updateCharactersList(results);
    setPaginationInfo({
      ...paginationInfo,
      currentPage: pageIndex,
    });
  }

  return (
    <div className="pagination">
      {children}
      <section className="pagination__buttons-wrapper">
        {currentPage !== 1 ? (<Button className="pagination__button" text={currentPage - 1} clickEvent={() => getPageData(currentPage - 1)} />) : null}
        <Button className="pagination__button" text={currentPage} disabled={true} />
        {currentPage !== pages ? <Button className="pagination__button" text={currentPage + 1} clickEvent={() => getPageData(currentPage + 1)} /> : null}
      </section>
    </div>
  );
}

export default Pagination;
