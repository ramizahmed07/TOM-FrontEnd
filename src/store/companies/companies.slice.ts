import { ICompaniesState } from "@types";
import { createSlice } from "@reduxjs/toolkit";

import { companiesApi } from "@services";

const initialState: ICompaniesState = {
  companies: [],
};

const slice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      companiesApi.endpoints.fetchCompanies.matchFulfilled,
      (state, { payload }) => {
        state.companies = payload?.data;
      }
    );
  },
});

export default slice.reducer;
