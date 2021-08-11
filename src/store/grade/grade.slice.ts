import { gradeApi } from "@/services";
import { createSlice } from "@reduxjs/toolkit";
import { IGradeCompany, ITARank } from "./grade.types";

interface IGradeState {
  taRanks: ITARank[];
  allGradeCompanies: IGradeCompany[];
}

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
          state.taRanks = payload;
        }
      )
      .addMatcher(
        gradeApi.endpoints.fetchAllGradeCompanies.matchFulfilled,
        (state, { payload }) => {
          state.allGradeCompanies = payload;
        }
      );
  },
});

export default slice.reducer;
