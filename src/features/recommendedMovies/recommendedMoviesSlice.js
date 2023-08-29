import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { APIKey } from '../../API/apiKey';

const initialState = {
  recommendedMovies: [],
  status: 'idle',
  error: null,
};

export const fetchRecommendedMovies = createAsyncThunk(
  'movieDetails/fetchRecommendedMovies',
  async (movieID) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${APIKey}&page=1`
      );
      return response.data.results;
    } catch (error) {
      console.error('Error fetching recommended movies:', error);
      throw error;
    }
  }
);

const recommendedMoviesSlice = createSlice({
  name: 'recommendedMovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecommendedMovies.fulfilled, (state, action) => {
        state.recommendedMovies = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchRecommendedMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default recommendedMoviesSlice.reducer;
