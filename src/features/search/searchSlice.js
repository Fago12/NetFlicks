import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { APIKey } from '../../API/apiKey';

export const fetchMovies = createAsyncThunk(
  'search/fetchMovies',
  async (searchQuery) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: APIKey,
          query: searchQuery,
          page: 1,
          include_adult: false,
        },
      }
    );

    return response.data.results;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    movies: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.movies = action.payload;
    });
    // case to reset movies
    builder.addCase(fetchMovies.pending, (state) => {
      state.movies = [];
      state.status = 'loading';
    });
  },
});

export default searchSlice.reducer;
