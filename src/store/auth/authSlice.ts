import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth";
// import type { RootState } from "@/store";

const initialState = {
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
      }
    );
  },
});

export default slice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
