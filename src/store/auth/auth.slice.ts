import { permissions } from "@/router";
import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "@services";
import { IAuthState } from "./auth.types";

const initialState: IAuthState = {
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
        state.user = payload?.data?.user;
        state.token = payload?.data?.token;
        state.permissions = !payload?.data?.permissions?.length
          ? ["all"]
          : payload?.data?.permissions;
      }
    );
  },
});

export default slice.reducer;
