import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  grade: [],
};

const slice = createSlice({
  name: "gradeCompanies",
  initialState,
  reducers: {},
});

export default slice.reducer;
