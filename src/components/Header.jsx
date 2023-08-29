import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({
  isSidebarActive,
  toggleSidebar,
  isSearchWrapper,
  handleInput,
}) => {
  const [isSearchBoxActive, setIsSearchBoxActive] = useState(false);

  const toggleSearchBox = () => {
    setIsSearchBoxActive(!isSearchBoxActive);
  };

  const handleSearchBtnClick = () => {
    toggleSearchBox(); // Toggle search box
    if (isSidebarActive) {
      toggleSidebar(); // Toggle sidebar only when search box is active
    }
  };

  return (
    <header className='header'>
      <Link to='/' className='logo'>
        <img src='/images/logo.svg' alt='NetFlicks' width='140' height='32' />
      </Link>

      <div className={`search-box ${isSearchBoxActive ? 'active' : ''}`}>
        <div className={`search-wrapper ${isSearchWrapper ? 'searching' : ''}`}>
          <input
            type='text'
            name='search'
            aria-label='search movies'
            placeholder='Search any movies...'
            className='search-field'
            autoComplete='off'
            onInput={handleInput}
          />

          <img
            src='/images/search.png'
            alt='search'
            width='24'
            height='24'
            className='leading-icon'
          />
        </div>

        <button className='search-btn' onClick={toggleSearchBox}>
          <img
            src='/images/close.png'
            width='24'
            height='24'
            alt='close search box'
          />
        </button>
      </div>

      <button className='search-btn' onClick={handleSearchBtnClick}>
        <img
          src='/images/search.png'
          width='24'
          height='24'
          alt='open search box'
        />
      </button>

      <button
        className={`menu-btn ${isSidebarActive ? 'active' : ''}`}
        onClick={toggleSidebar}
      >
        <img
          src='/images/menu.png'
          width='24'
          height='24'
          alt='open menu'
          className='menu'
        />
        <img
          src='/images/menu-close.png'
          width='24'
          height='24'
          alt='close menu'
          className='close'
        />
      </button>
    </header>
  );
};

export default Header;
