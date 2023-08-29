import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchHomePageSections } from '../features/homepageSections/homePageSectionsSlice';
import MovieCard from './MovieCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.homePageSections.sections);

  useEffect(() => {
    dispatch(fetchHomePageSections());
  }, [dispatch]);

  return (
    <div>
      {sections.map((section) => (
        <div key={section.title} className='movie-list'>
          <div className='title-wrapper'>
            <h3 className='title-large'>{section.title}</h3>
          </div>
          <div className='slider-list'>
            <div className='slider-inner'>
              {section.movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
