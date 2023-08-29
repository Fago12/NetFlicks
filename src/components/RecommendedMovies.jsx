import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRecommendedMovies } from '../features/recommendedMovies/recommendedMoviesSlice';
import MovieCard from './MovieCard';

const RecommendedMovies = ({ movieID }) => {
  const dispatch = useDispatch();
  const recommendedMovies = useSelector(
    (state) => state.recommendedMovies.recommendedMovies
  );

  const recommendedMoviesStatus = useSelector(
    (state) => state.recommendedMovies.status
  );

  useEffect(() => {
    dispatch(fetchRecommendedMovies(movieID));
  }, [dispatch, movieID]);

  if (recommendedMovies.length === 0) {
    return (
      <section className='movie-list' aria-label='You May Also Like'>
        <div className='title-wrapper'>
          <h3 className='title-large'>You May Also Like</h3>
        </div>
        <p>No Recommended Movies</p>
      </section>
    );
  }

  return (
    <section className='movie-list' aria-label='You May Also Like'>
      <div className='title-wrapper'>
        <h3 className='title-large'>You May Also Like</h3>
      </div>
      <div className='slider-list'>
        <div className='slider-inner'>
          {recommendedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedMovies;
