import { createSlice } from "@reduxjs/toolkit";

import { fetchCountries } from "@services";
import { ICountriesState } from "./countries.types";

const INITIAL_STATE: ICountriesState = {
  countries: [],
};

const countriesReducer = createSlice({
  name: "countriesReducer",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload.reverse();
    });
  },
});

export default countriesReducer.reducer;
