import React, { useState, useEffect } from 'react';
/* Components */
import ButtonGroup from '../ButtonGroup';
/* Style */
import './style.css';

const Pagination = ({ content, updateContent, updatingContent, totalPages = 20, parentClass = "", styleModifiers, buttonGroupSettings, render }) => {
  const [pagination, setPagination] = useState({ currentPage: 1, pages: totalPages });
  const { currentPage, pages } = pagination;

  function updateCurrentPageData(pageIndex) {
    console.log('pagination state: ', updatingContent);

    if (!updatingContent) {
      updateContent(pageIndex);
      setPagination({ ...pagination, currentPage: pageIndex });
    } else {
      console.log('updating content...');
    }
  }

  useEffect(function () {
    if (!updatingContent) {
      console.log('content update finished!');
    }
  }, [updatingContent]);

  return (
    <div className={`${parentClass} pagination ${styleModifiers?.reverseContentOrder ? 'pagination--reverse-content-order' : ''}`}>
      {render(content)}

      <ButtonGroup parentClass="pagination__button-group" settings={{ currentPage, totalPages, ...buttonGroupSettings }} updateCurrentPage={updateCurrentPageData} updatingContent={updatingContent} />
    </div>
  );
}

export default Pagination;
