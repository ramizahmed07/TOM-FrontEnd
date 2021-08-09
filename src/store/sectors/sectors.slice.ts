import { createSlice } from "@reduxjs/toolkit";

// import { authApi } from "@services";
// import { IAuthState } from "./auth.types";

interface ISectorsState {
  sectors: any;
}

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
