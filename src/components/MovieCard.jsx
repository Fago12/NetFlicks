import { Link } from 'react-router-dom';

import { imageBaseURL } from '../API/imageBaseUrl';
import fallbackImage from '/images/400.png';

const MovieCard = ({ movie, setIsSearchModal, isSearchModal }) => {
  const { poster_path, title, vote_average, release_date, id } = movie;

  const handleMovieClick = () => {
    if (isSearchModal) {
      setIsSearchModal(false);
    }
  };

  return (
    <div className='movie-card' onClick={handleMovieClick}>
      <figure className='poster-box card-banner'>
        <img
          // src={`${imageBaseURL}w342${poster_path}`}
          src={
            poster_path ? `${imageBaseURL}w342${poster_path}` : fallbackImage
          }
          alt={title}
          className='img-cover'
          loading='lazy'
        />
      </figure>

      <h4 className='title'>{title}</h4>

      <div className='meta-list'>
        <div className='meta-item'>
          <img
            src='/images/star.png'
            width='20'
            height='20'
            loading='lazy'
            alt='rating'
          />
          <span className='span'>{vote_average.toFixed(1)}</span>
        </div>
        {release_date && (
          <div className='card-badge'>{release_date.split('-')[0]}</div>
        )}
      </div>

      <Link to={`/movie/${id}`} className='card-btn' title={title}></Link>
    </div>
  );
};

export default MovieCard;
