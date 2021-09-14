import { createApi } from "@reduxjs/toolkit/query/react";

import { tomService } from "./restService";

export const cashAllowancesApi = createApi({
  reducerPath: "cashAllowancesApi",
  baseQuery: tomService({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/company`,
  }),
  tagTypes: ["CashAllowances", "CashAllowanceVersions"],
  endpoints: builder => ({
    fetchCashAllowances: builder.query({
      query: ({ company_id, page = 1 }) => ({
        url: `/${company_id}/cash-allowances/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["CashAllowances"],
    }),
    fetchCashAllowanceVersions: builder.query({
      query: ({ company_id, page = 1 }) => ({
        url: `/${company_id}/cash-allowance-versions/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["CashAllowanceVersions"],
    }),

    createCashAllowance: builder.mutation({
      query: ({ body, company_id }) => ({
        url: `/${company_id}/cash-allowance/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["CashAllowances"],
    }),
    deleteCashAllowance: builder.mutation({
      query: ({ id, company_id }) => ({
        url: `/${company_id}/cash-allowance/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["CashAllowances"],
    }),
    updateCashAllowance: builder.mutation({
      query: ({ id, company_id, body }) => ({
        url: `/${company_id}/cash-allowance/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["CashAllowances"],
    }),
    updateCashAllowanceVersion: builder.mutation({
      query: ({ id, company_id }) => ({
        url: `/${company_id}/cash-allowance-version/${id}/set-active/`,
        method: "PATCH",
      }),
      invalidatesTags: ["CashAllowances", "CashAllowanceVersions"],
    }),
  }),
});
export const {
  useFetchCashAllowancesQuery,
  useCreateCashAllowanceMutation,
  useDeleteCashAllowanceMutation,
  useUpdateCashAllowanceMutation,
  useFetchCashAllowanceVersionsQuery,
  useUpdateCashAllowanceVersionMutation,
} = cashAllowancesApi;
