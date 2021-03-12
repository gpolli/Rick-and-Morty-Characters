import React, { useState, useEffect } from 'react';
/* Components */
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
/* Style */
import './style.css';

const Pagination = ({ content, updateContent, totalPages = 20, buttonGroupSettings, render }) => {
  const [pagination, setPagination] = useState({ currentPage: 1, pages: totalPages });
  const { currentPage, pages } = pagination;

  function updateCurrentPageData(pageIndex) {
    updateContent(pageIndex);
    setPagination({ ...pagination, currentPage: pageIndex }); // TODO: potrebbe essere da spostare in homepage
  }

  useEffect(function () {
    console.log('pagination content: ', content);
  }, [content]);

  return (
    <div className="pagination">
      {render(content)}

      <ButtonGroup settings={{ currentPage, totalPages, ...buttonGroupSettings }} updateCurrentPage={updateCurrentPageData} />
    </div>
  );
}

export default Pagination;
