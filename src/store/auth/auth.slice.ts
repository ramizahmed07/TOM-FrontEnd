import { permissions } from "@/router";
import { IAuthState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "@services";

const initialState: IAuthState = {
  user: null,
  token: {
    access: null,
    refresh: null,
  },
  permissions: [],
  is_one_time_password: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        if (payload?.data?.is_one_time_password) {
          state.is_one_time_password = payload?.data?.is_one_time_password;
          state.token.access = payload?.data?.token;
        } else {
          state.is_one_time_password = payload?.data?.is_one_time_password;
          state.user = payload?.data?.user;
          state.token = payload?.data?.token;
          state.permissions = !payload?.data?.permissions?.length
            ? ["all"]
            : payload?.data?.permissions;
        }
      }
    );
  },
});

export default slice.reducer;
