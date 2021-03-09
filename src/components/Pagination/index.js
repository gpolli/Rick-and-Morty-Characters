import React, { useEffect } from 'react'

const Pagination = ({ endpointUrl, children }) => {
  useEffect(function () {
    const getFirstPageData = async function () {
      const response = await fetch(`${endpointUrl}`);
      const json = response.json();
    }

    getFirstPageData();
  }, []);

  return (
    <div>
      {children}
    </div>
  );
}

export default Pagination;
