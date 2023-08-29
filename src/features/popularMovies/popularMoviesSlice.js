import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { APIKey } from '../../API/apiKey';

const initialState = {
  movies: [],
  status: 'idle',
  error: null,
};

export const fetchPopularMovies = createAsyncThunk(
  'popularMovies/fetchPopularMovies',
  async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&page=1`
      );
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }
);

const popularMoviesSlice = createSlice({
  name: 'popularMovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default popularMoviesSlice.reducer;
