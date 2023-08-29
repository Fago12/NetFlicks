import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { APIKey } from '../../API/apiKey';

const initialState = {
  genres: [],
  status: 'idle',
  error: null,
};

export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}`
  );

  return response.data.genres;
});

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default genresSlice.reducer;
