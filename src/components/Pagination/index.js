import React, { useEffect } from 'react'

const Pagination = ({ apiEndpoint, children }) => {
  async function getPageData() {
    const response = await fetch(`${apiEndpoint}`);
    const json = response.json();
  }

  return (
    <div>
      {children}
    </div>
  );
}

export default Pagination;
