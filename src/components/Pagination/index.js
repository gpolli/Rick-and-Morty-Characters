import React, { useState } from 'react';
/* Components */
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
/* Style */
import './style.css';

const Pagination = ({ content, updateContent, totalPages = 20, render }) => {
  const [pagination, setPagination] = useState({ currentPage: 1, pages: totalPages });
  const { currentPage, pages } = pagination;

  function updateCurrentPageData(pageIndex) {
    updateContent(pageIndex);
    setPagination({ ...pagination, currentPage: pageIndex });
  }

  return (
    <div className="pagination">
      {render(content.characters)}

      <ButtonGroup settings={{ currentPage, totalPages, amountToShow: 3, showStartButton: true, showEndButton: true }} updateCurrentPage={updateCurrentPageData} />
    </div>
  );
}

export default Pagination;
