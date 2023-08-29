import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { fetchMovies } from '../features/search/searchSlice';
import SearchMovies from '../components/SearchMovies';

const RootLayout = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.search.movies);
  const status = useSelector((state) => state.search.status);

  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const [isSearchWrapper, setIsSearchWrapper] = useState(false);
  const [isSearchModal, setIsSearchModal] = useState(false);

  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  let newSearchTerm = '';

  const handleInput = (event) => {
    const newSearchTerm = event.target;
    setSearchTerm(newSearchTerm.value);

    if (!newSearchTerm.value.trim()) {
      setIsSearchModal(false);
      setIsSearchWrapper(false);
      clearTimeout(searchTimeout);
      dispatch(fetchMovies(''));
      return;
    }

    setIsSearchWrapper(true);
    clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(() => {
        dispatch(fetchMovies(newSearchTerm.value));
        setIsSearchWrapper(false);
        setIsSearchModal(true);
      }, 500)
    );
  };

  return (
    <>
      <Header
        isSidebarActive={isSidebarActive}
        toggleSidebar={toggleSidebar}
        isSearchWrapper={isSearchWrapper}
        handleInput={handleInput}
      />
      <main>
        <Sidebar
          isSidebarActive={isSidebarActive}
          toggleSidebar={toggleSidebar}
        />
        <article className='container'>
          <Outlet />
        </article>
        <SearchMovies
          movies={movies}
          status={status}
          searchTerm={searchTerm}
          isSearchModal={isSearchModal}
          setIsSearchModal={setIsSearchModal}
        />
      </main>
    </>
  );
};

export default RootLayout;
