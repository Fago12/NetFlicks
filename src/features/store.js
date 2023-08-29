import { configureStore } from '@reduxjs/toolkit';

import genresReducer from './genres/genresSlice';
import popularMoviesReducer from './popularMovies/popularMoviesSlice';
import homePageSectionsReducer from './homepageSections/homePageSectionsSlice';
import movieDetailsReducer from './movieDetails/movieDetailsSlice';
import recommendedMoviesReducer from './recommendedMovies/recommendedMoviesSlice';
import moviesReducer from './movies/moviesSlice';
import searchReducer from './search/searchSlice';

const store = configureStore({
  reducer: {
    genres: genresReducer,
    popularMovies: popularMoviesReducer,
    homePageSections: homePageSectionsReducer,
    movieDetails: movieDetailsReducer,
    recommendedMovies: recommendedMoviesReducer,
    movies: moviesReducer,
    search: searchReducer,
  },
});

export default store;
