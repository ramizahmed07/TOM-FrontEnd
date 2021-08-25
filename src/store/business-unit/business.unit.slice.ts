import { businessUnitApi } from "@services";
import { createSlice } from "@reduxjs/toolkit";
import { IBusinessUnitState } from "./business.unit.types";

const initialState: IBusinessUnitState = {
  list: [],
};

const slice = createSlice({
  name: "businessUnit",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      businessUnitApi.endpoints.fetchBusinessUnit.matchFulfilled,
      (state, { payload }) => {
        state.list = payload.data;
      }
    );
  },
});

export default slice.reducer;
