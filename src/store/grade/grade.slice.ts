import { createSlice } from "@reduxjs/toolkit";

import { gradeApi } from "@services";
import { IGradeState } from "./grade.types";

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
