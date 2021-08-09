import { sectorsApi } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

import { ISectorsState } from "./sectors.types";

const initialState: ISectorsState = {
  sectors: [],
};

const slice = createSlice({
  name: "sectors",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        sectorsApi.endpoints.fetchSectors.matchFulfilled,
        (state, { payload }) => {
          state.sectors = payload;
        }
      )
      .addMatcher(
        sectorsApi.endpoints.createSector.matchFulfilled,
        (state, { payload }) => {
          state.sectors = [...state.sectors, payload];
        }
      );
  },
});

export default slice.reducer;
