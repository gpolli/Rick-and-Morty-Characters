import React from 'react';
/* Components */
import Pagination from '../../components/Pagination';
import CharactersList from '../../components/CharactersList';

const Homepage = () => {
  return (
    <>
      <h1>Rick & Morty Characters</h1>
      <main>
        <Pagination endpointUrl='https://rickandmortyapi.com/api/character'>
          <CharactersList />
        </Pagination>
      </main>
    </>
  );
}

export default Homepage;
