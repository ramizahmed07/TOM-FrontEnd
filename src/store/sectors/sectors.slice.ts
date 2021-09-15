import { createSlice } from "@reduxjs/toolkit";

import { sectorsApi } from "@services";
import { ISectorsState } from "@types";

const initialState: ISectorsState = {
  allSectors: [],
  sectors: [],
};

const slice = createSlice({
  name: "sectors",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        sectorsApi.endpoints.fetchAllSectors.matchFulfilled,
        (state, { payload }) => {
          state.allSectors = payload.data;
        }
      )
      .addMatcher(
        sectorsApi.endpoints.fetchSectors.matchFulfilled,
        (state, { payload }) => {
          state.sectors = payload.data;
        }
      );
  },
});

export default slice.reducer;
