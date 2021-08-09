import { createSlice } from "@reduxjs/toolkit";

import { ISectorsState } from "./sectors.types";

const initialState: ISectorsState = {
  sectors: [],
};

const slice = createSlice({
  name: "sectors",
  initialState,
  reducers: {},
  extraReducers: builder => {},
});

export default slice.reducer;
