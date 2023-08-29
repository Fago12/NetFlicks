import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';

import MovieCard from './MovieCard';

const SearchMovies = ({
  movies,
  status,
  isSearchModal,
  setIsSearchModal,
  searchTerm,
}) => {
  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <>
      <div className={`search-modal ${isSearchModal ? 'active' : ''}`}>
        <p className='label'>Results for</p>

        <h1 className='heading'>{searchTerm}</h1>

        <div className='movie-list'>
          {status === 'loading' ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ScaleLoader color='#ffffff' loading={true} css={override} />
            </div>
          ) : movies.length > 0 ? (
            <div className='grid-list'>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  setIsSearchModal={setIsSearchModal}
                  isSearchModal={isSearchModal}
                />
              ))}
            </div>
          ) : (
            <p className='no-matches'>No matches found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchMovies;
