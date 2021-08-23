import { createApi } from "@reduxjs/toolkit/query/react";

import { tomService } from "./restService";

export const authApi = createApi({
  reducerPath: "authApi ",
  baseQuery: tomService({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/auth`,
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
      query: body => ({
        url: "/forgot-password/",
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: body => ({
        url: "/change-password/",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: body => ({
        url: "/logout/",
        method: "POST",
        body,
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
