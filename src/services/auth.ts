import { createApi } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

export const authApi = createApi({
  reducerPath: "authApi ",
  baseQuery: tomService({
    baseUrl: `${baseUrl}/auth`,
  }),

  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: "/login/",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: data => ({
        url: "/forgot-password/",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: data => ({
        url: "/change-password/",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: data => ({
        url: "/logout/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLogoutMutation,
} = authApi;
