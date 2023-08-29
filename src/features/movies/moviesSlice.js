import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { APIKey } from '../../API/apiKey';

const initialState = {
  movies: [],
  page: 1,
  totalPages: 0,
  status: 'idle',
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ genreId, page }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          api_key: APIKey,
          include_adult: false,
          page: page,
          sort_by: 'popularity.desc',
          with_genres: genreId,
        },
      }
    );

    return response.data;
  }
);

const resetMovies = createAction('movies/resetMovies');

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetMovies, (state) => {
        state.movies = [];
      })
      .addCase(fetchMovies.pending, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.status = 'loading';
        } else {
          state.status = 'succeeded';
        }
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newMovies = action.payload.results.filter(
          (newMovie) => !state.movies.some((movie) => movie.id === newMovie.id)
        );
        state.movies = [...state.movies, ...newMovies];
        state.totalPages = action.payload.total_pages;
        state.page = action.payload.page;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export { resetMovies };

export default moviesSlice.reducer;
