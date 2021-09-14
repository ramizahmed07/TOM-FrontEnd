import { createApi } from "@reduxjs/toolkit/query/react";

import { tomService } from "./restService";

export const salaryRangeApi = createApi({
  reducerPath: "salaryRangeApi",
  baseQuery: tomService({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/company`,
  }),
  tagTypes: ["SalaryRanges", "SalaryRangeVersions"],
  endpoints: builder => ({
    fetchCompanySalaryRanges: builder.query({
      query: ({ company_id, page = 1 }) => ({
        url: `/${company_id}/salary-ranges/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["SalaryRanges"],
    }),
    fetchSalaryRangeVersions: builder.query({
      query: ({ company_id, page = 1 }) => ({
        url: `/${company_id}/salary-range-versions/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["SalaryRangeVersions"],
    }),
    createSalaryRange: builder.mutation({
      query: ({ body, company_id }) => ({
        url: `/${company_id}/salary-range/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["SalaryRanges"],
    }),
    deleteSalaryRange: builder.mutation({
      query: ({ id, company_id }) => ({
        url: `/${company_id}/salary-range/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["SalaryRanges"],
    }),
    updateSalaryRange: builder.mutation({
      query: ({ id, company_id, body }) => ({
        url: `/${company_id}/salary-range/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SalaryRanges"],
    }),
    updateSalaryRangeVersion: builder.mutation({
      query: ({ id, company_id }) => ({
        url: `/${company_id}/job-grade-version/${id}/set-active/`,
        method: "PATCH",
      }),
      invalidatesTags: ["SalaryRanges", "SalaryRangeVersions"],
    }),
  }),
});
export const {
  useFetchCompanySalaryRangesQuery,
  useCreateSalaryRangeMutation,
  useUpdateSalaryRangeMutation,
  useDeleteSalaryRangeMutation,
  useFetchSalaryRangeVersionsQuery,
  useUpdateSalaryRangeVersionMutation,
} = salaryRangeApi;
