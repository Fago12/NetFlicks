import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';

import { fetchMovies, resetMovies } from '../features/movies/moviesSlice';
import { fetchGenres } from '../features/genres/genresSlice';
import MovieCard from '../components/MovieCard';

const MoviesList = () => {
  const dispatch = useDispatch();
  const { genreId } = useParams();

  const { movies, loading, page, totalPages, status } = useSelector(
    (state) => state.movies
  );

  const genres = useSelector((state) => state.genres.genres);

  // Find the genre object based on genre ID or language ID
  const selectedGenre = genres.find(
    (genre) => genre.id === parseInt(genreId, 10)
  );

  // Access the genre name from the selected genre object
  const genreName = selectedGenre ? selectedGenre.name : 'Unknown Genre';

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (page < totalPages) {
      setIsLoadingMore(true);
      await dispatch(fetchMovies({ genreId, page: page + 1 }));
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    dispatch(fetchMovies({ genreId, page: 1 }));
    dispatch(resetMovies());
  }, [dispatch, genreId]);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <>
      <section className='movie-list genre-list'>
        <div className='title-wrapper'>
          <h1 className='heading'>All {genreName} Movies</h1>
        </div>

        {status === 'loading' ? (
          // Display the loader while movies are loading
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ScaleLoader color='#ffffff' loading={true} css={override} />
          </div>
        ) : (
          // Display movies if loading is complete
          <div className='grid-list'>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        <button
          className={`btn load-more ${isLoadingMore ? 'loading' : ''}`}
          onClick={handleLoadMore}
          disabled={isLoadingMore || page >= totalPages || loading}
        >
          {isLoadingMore ? 'Loading...' : 'Load More'}
        </button>
      </section>
    </>
  );
};

export default MoviesList;
