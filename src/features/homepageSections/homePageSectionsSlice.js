import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { APIKey } from '../../API/apiKey';

export const fetchHomePageSections = createAsyncThunk(
  'homePageSections/fetchHomePageSections',
  async () => {
    const homePageSections = [
      {
        title: 'Upcoming Movies',
        path: '/movie/upcoming',
      },
      {
        title: "Today's Trending Movies",
        path: '/trending/movie/week',
      },
      {
        title: 'Top Rated Movies',
        path: '/movie/top_rated',
      },
    ];

    const sectionData = [];

    for (const { title, path } of homePageSections) {
      const dynamicURL = `https://api.themoviedb.org/3${path}?api_key=${APIKey}&page=1`;
      const response = await axios.get(dynamicURL);
      sectionData.push({ title, movies: response.data.results });
    }

    return sectionData;
  }
);

const homePageSectionsSlice = createSlice({
  name: 'homePageSections',
  initialState: {
    sections: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePageSections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHomePageSections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sections = action.payload;
      })
      .addCase(fetchHomePageSections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default homePageSectionsSlice.reducer;
