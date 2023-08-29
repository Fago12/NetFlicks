import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGenres } from '../features/genres/genresSlice';

const Sidebar = ({ isSidebarActive, toggleSidebar }) => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres.genres);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  // const languageToParam = {
  //   English: 'en',
  //   Hindi: 'hi',
  //   Bengali: 'bn',
  // };

  return (
    <>
      <nav className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
        <div className='sidebar-list'>
          <p className='title'>Genres</p>
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/movies/${genre.id}`}
              className='sidebar-link'
              onClick={toggleSidebar}
            >
              {genre.name}
            </Link>
          ))}
        </div>

        {/* <div className='sidebar-list'>
          <p className='title'>Language</p>
          {Object.keys(languageToParam).map((language) => (
            <Link
              key={language}
              to={`/movies/${languageToParam[language]}`}
              className='sidebar-link'
              onClick={toggleSidebar}
            >
              {language}
            </Link>
          ))}
        </div> */}

        <div className='sidebar-footer'>
          <p className='copyright'>
            Copyright 2023 <Link to='https://github.com/Fago12'>Fago12</Link>
          </p>

          <img
            src='/images/tmdb-logo.svg'
            width='130'
            height='17'
            alt='the movie database logo'
          />
        </div>
      </nav>

      <div
        className={`overlay ${isSidebarActive ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

export default Sidebar;
