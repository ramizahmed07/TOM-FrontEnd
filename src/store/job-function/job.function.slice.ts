import { createSlice } from "@reduxjs/toolkit";

import { jobFunctionApi } from "@services";
import { IJobFunctionReducer } from "@/types";

const initialState: IJobFunctionReducer = {
  list: [],
  jobFunctionItem: {},
};

const slice = createSlice({
  name: "jobFunction",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        jobFunctionApi.endpoints.list.matchFulfilled,
        (state, { payload }) => {
          state.list = payload.data;
        }
      )
      .addMatcher(
        jobFunctionApi.endpoints.getJF.matchFulfilled,
        (state, { payload }) => {
          state.jobFunctionItem = payload.data;
        }
      );
  },
});

export default slice.reducer;
