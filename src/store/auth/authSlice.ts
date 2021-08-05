import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth";
// import type { RootState } from "@/store";

const initialState = {
  user: null,
  token: {
    access: null,
    refresh: null,
  },
  permissions: [],
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
        state.token = payload.token;
        state.permissions = payload.permissions;
      }
    );
  },
});

export default slice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
