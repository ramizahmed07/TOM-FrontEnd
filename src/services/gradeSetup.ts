import { createApi } from "@reduxjs/toolkit/query/react";

import { tomService } from "./restService";

export const gradeSetupApi = createApi({
  reducerPath: "gradeSetupApi",
  baseQuery: tomService({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/company`,
  }),
  tagTypes: ["JobGrades", "JobGradeVersions"],
  endpoints: builder => ({
    fetchCompanyJobGrades: builder.query({
      query: ({ company_id, page = 1 }) => ({
        url: `/${company_id}/job-grades/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["JobGrades"],
    }),
    fetchJobGradeVersions: builder.query({
      query: ({ company_id, page = 1 }) => ({
        url: `/${company_id}/job-grade-versions/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["JobGradeVersions"],
    }),
    fetchCompanyCountries: builder.query({
      query: ({ company_id }) => ({
        url: `/${company_id}/countries/`,
        method: "GET",
      }),
    }),
    createJobGrade: builder.mutation({
      query: ({ body, company_id }) => ({
        url: `/${company_id}/job-grade/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["JobGrades"],
    }),
    deleteJobGrade: builder.mutation({
      query: ({ id, company_id }) => ({
        url: `/${company_id}/job-grade/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["JobGrades"],
    }),
    updateJobGrade: builder.mutation({
      query: ({ id, company_id, body }) => ({
        url: `/${company_id}/job-grade/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["JobGrades"],
    }),
    updateJobGradeVersion: builder.mutation({
      query: ({ id, company_id }) => ({
        url: `/${company_id}/job-grade-version/${id}/set-active/`,
        method: "PATCH",
      }),
      invalidatesTags: ["JobGrades", "JobGradeVersions"],
    }),
  }),
});
export const {
  useFetchCompanyJobGradesQuery,
  useFetchCompanyCountriesQuery,
  useFetchJobGradeVersionsQuery,
  useCreateJobGradeMutation,
  useDeleteJobGradeMutation,
  useUpdateJobGradeMutation,
  useUpdateJobGradeVersionMutation,
} = gradeSetupApi;
