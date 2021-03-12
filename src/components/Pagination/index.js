import React, { useState, useEffect } from 'react';
/* Components */
import Button from '../Button';
/* Custom Hooks */
import { useGlobal, useGlobalUpdater } from '../../helpers/hooks/context/Rick&Morty/GlobalContext';
import { actions } from '../../helpers/hooks/reducer/Rick&Morty/actions';
/* Style */
import './style.css';

const Pagination = ({ content, updateContent, render }) => {
  const [pagination, setPagination] = useState({ currentPage: 1, pages: 20 });
  const { currentPage, pages } = pagination;

  function updateCurrentPageData(pageIndex) {
    updateContent(pageIndex);
    setPagination({ ...pagination, currentPage: pageIndex });
  }

  return (
    <div className="pagination">
      {render(content.characters)}
      <section className="pagination__buttons-wrapper">
        {currentPage !== 1 ? (<Button className="pagination__button" text={currentPage - 1} clickEvent={() => updateCurrentPageData(currentPage - 1)} />) : null}
        <Button className="pagination__button" text={currentPage} disabled={true} />
        {currentPage !== pages ? <Button className="pagination__button" text={currentPage + 1} clickEvent={() => updateCurrentPageData(currentPage + 1)} /> : null}
      </section>
    </div>
  );
}

export default Pagination;
