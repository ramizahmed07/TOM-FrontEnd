import { createSlice } from "@reduxjs/toolkit";

import { companiesApi } from "@services";
import { ICompaniesState } from "./companies.types";

const initialState: ICompaniesState = {
  companies: [],
};

const slice = createSlice({
  name: "gradeCompanies",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      companiesApi.endpoints.fetchCompanies.matchFulfilled,
      (state, { payload }) => {
        console.log("payload", payload);
      }
    );
  },
});

export default slice.reducer;
