import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';

import {
  clearMovieDetails,
  fetchMovieDetails,
} from '../features/movieDetails/movieDetailsSlice';
import MovieCard from '../components/MovieCard';
import { imageBaseURL } from '../API/imageBaseUrl';
import {
  getGenres,
  getCasts,
  getDirectors,
  filterVideos,
} from '../utilities/movieDetailsUtils';
import RecommendedMovies from '../components/RecommendedMovies';
import fallbackImageLg from '/images/600.png';
import fallbackImageSm from '/images/400.png';

const MovieDetails = () => {
  const { movieID } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movieDetails.movie);
  const status = useSelector((state) => state.movieDetails.status);

  useEffect(() => {
    dispatch(fetchMovieDetails(movieID));
    return () => {
      dispatch(clearMovieDetails());
    };
  }, [dispatch, movieID]);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  if (status === 'loading') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ScaleLoader color='#ffffff' loading={true} css={override} />
      </div>
    );
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    runtime,
    vote_average,
    releases,
    genres,
    overview,
    casts: { cast, crew },
    videos: { results: videos },
  } = movie;

  return (
    <>
      <div className='movie-detail'>
        <div
          className='backdrop-image'
          style={{
            backgroundImage: `url(${
              backdrop_path
                ? `${imageBaseURL}w1280${backdrop_path}`
                : poster_path
                ? `${imageBaseURL}w1280${poster_path}`
                : fallbackImageLg
            })`,
          }}
        ></div>

        <figure className='poster-box movie-poster'>
          <img
            src={
              poster_path
                ? `${imageBaseURL}w342${poster_path}`
                : fallbackImageSm
            }
            alt={`${title} poster`}
            className='img-cover'
          />
        </figure>

        <div className='detail-box'>
          <div className='detail-content'>
            <h1 className='heading'>{title}</h1>

            <div className='meta-list'>
              <div className='meta-item'>
                <img
                  src='/images/star.png'
                  width='20'
                  height='20'
                  alt='rating'
                />

                <span className='span'>{vote_average.toFixed(1)}</span>
              </div>

              <div className='seperator'></div>

              <div className='meta-item'>{runtime}m</div>

              <div className='seperator'></div>

              <div className='meta-item'>{release_date.split('-')[0]}</div>

              <div className='meta-item card-badge'>
                {releases?.countries.length
                  ? releases.countries[0].certification
                  : 'N/A'}
              </div>
            </div>

            <p className='genre'>{getGenres(genres)}</p>

            <p className='overview'>{overview}</p>

            <ul className='detail-list'>
              {/*  list item  */}
              <div className='list-item'>
                <p className='list-name'>Starring</p>

                <p>{cast && cast.length > 0 ? getCasts(cast) : 'N/A'}</p>
              </div>
              {/*  end of list item  */}

              {/*  list item  */}
              <div className='list-item'>
                <p className='list-name'>Directed By</p>

                <p>{crew && crew.length > 0 ? getDirectors(crew) : 'N/A'}</p>
              </div>
              {/*  end of list item  */}
            </ul>
          </div>

          <div className='title-wrapper'>
            <h3 className='title-large'>Trailers and Clips</h3>
          </div>

          <div className='slider-list'>
            <div className='slider-inner'>
              {videos.length > 0 ? (
                filterVideos(videos).map(({ key, name }) => (
                  <div key={key} className='video-card'>
                    <iframe
                      width='500'
                      height='500'
                      src={`https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0`}
                      frameBorder='0'
                      allowFullScreen='1'
                      title={name}
                      className='img-cover'
                      loading='lazy'
                    ></iframe>
                  </div>
                ))
              ) : (
                <div style={{ paddingLeft: '2rem' }}>No Videos Available</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <RecommendedMovies movieID={movieID} />
    </>
  );
};

export default MovieDetails;
