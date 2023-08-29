import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';

import { fetchGenres } from '../features/genres/genresSlice';
import { fetchPopularMovies } from '../features/popularMovies/popularMoviesSlice';
import { imageBaseURL } from '../API/imageBaseUrl';
import SliderControl from './SliderControl';

import { mapGenreIdsToNames } from '../utilities/genreIDsToNames';

const Hero = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres.genres);
  const popularMovies = useSelector((state) => state.popularMovies.movies);
  const status = useSelector((state) => state.popularMovies.status);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  const handleControlClick = (index) => {
    setActiveIndex(index);
  };

  const override = css`
    display: block;
    margin: 0 auto;
    height: calc(100vh - 96px);
  `;

  return (
    <>
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
      ) : (
        <section className='banner' aria-label='Popular Movies'>
          <div className='banner-slider'>
            {popularMovies.map((movie, index) => {
              const {
                backdrop_path,
                title,
                release_date,
                genre_ids,
                overview,
                poster_path,
                vote_average,
                id,
              } = movie;

              const sliderItemClasses = `slider-item ${
                activeIndex === index ? 'active' : ''
              }`;

              return (
                <div key={id} className={sliderItemClasses}>
                  <img
                    src={`${imageBaseURL}w1280${backdrop_path}`}
                    alt={title}
                    className='img-cover'
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />

                  <div className='banner-content'>
                    <h2 className='heading'>{title}</h2>

                    <div className='meta-list'>
                      <div className='meta-item'>
                        {release_date.split('-')[0]}
                      </div>
                      <div className='meta-item card-badge'>
                        {vote_average.toFixed(1)}
                      </div>
                    </div>

                    {genres.length > 0 && (
                      <p className='genre'>
                        {mapGenreIdsToNames(movie.genre_ids, genres).join(', ')}
                      </p>
                    )}

                    <p className='banner-text'>{overview}</p>

                    <Link to={`movie/${id}`} className='btn'>
                      <img
                        src='/images/play_circle.png'
                        width='24'
                        height='24'
                        aria-hidden='true'
                        alt='play circle'
                      />

                      <span className='span'>Watch Now</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <SliderControl
            sliderItems={popularMovies}
            activeIndex={activeIndex}
            onControlClick={handleControlClick}
          />
        </section>
      )}
    </>
  );
};

export default Hero;
