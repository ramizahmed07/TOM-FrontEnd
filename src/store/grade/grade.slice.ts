import { createSlice } from "@reduxjs/toolkit";

import { IGradeState } from "@types";
import { gradeApi } from "@services";

const initialState: IGradeState = {
  taRanks: [],
  allGradeCompanies: [],
};

const slice = createSlice({
  name: "gradeCompanies",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        gradeApi.endpoints.fetchTARanks.matchFulfilled,
        (state, { payload }) => {
          state.taRanks = payload?.data;
        }
      )
      .addMatcher(
        gradeApi.endpoints.fetchAllGradeCompanies.matchFulfilled,
        (state, { payload }) => {
          state.allGradeCompanies = payload?.data;
        }
      );
  },
});

export default slice.reducer;
