import React, { useState } from 'react';
/* Components */
import ButtonGroup from '../ButtonGroup';
/* Style */
import './style.css';

const Pagination = ({
  content = { characters: [] },
  updateContent = function () { },
  updatingContent = false,
  totalPages = 1,
  parentClass = '',
  styleModifiers = {},
  buttonGroupSettings = {},
  render,
}) => {
  const [pagination, setPagination] = useState({ currentPage: 1, pages: totalPages });
  const { currentPage } = pagination;

  function updateCurrentPageData(pageIndex) {
    if (!updatingContent) {
      updateContent(pageIndex);
      setPagination({ ...pagination, currentPage: pageIndex });
    }
  }

  return (
    <div
      className={`${parentClass} pagination ${styleModifiers?.reverseContentOrder ? 'pagination--reverse-content-order' : ''
        }`}
    >
      {render(content)}

      <ButtonGroup
        parentClass="pagination__button-group"
        settings={{ currentPage, totalPages, ...buttonGroupSettings }}
        updateCurrentPage={updateCurrentPageData}
        updatingContent={updatingContent}
      />
    </div>
  );
};

export default Pagination;
