import { createSlice } from "@reduxjs/toolkit";

import { subJobFunctionApi } from "@services";
import { ISubJobFunctionReducer } from "@types";

const initialState: ISubJobFunctionReducer = {
  list: [],
  jsf: {},
};

const slice = createSlice({
  name: "subJobFunction",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        subJobFunctionApi.endpoints.sjfList.matchFulfilled,
        (state, { payload }) => {
          state.list = payload.data;
        }
      )
      .addMatcher(
        subJobFunctionApi.endpoints.getJSF.matchFulfilled,
        (state, { payload }) => {
          state.jsf = payload.data;
        }
      );
  },
});

export default slice.reducer;
