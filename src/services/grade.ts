import { createApi } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

export const gradeApi = createApi({
  reducerPath: "gradeApi",
  baseQuery: tomService({
    baseUrl: `${baseUrl}/grade`,
  }),
  tagTypes: ["AllGradeCompanies", "ClientCompanies"],

  endpoints: builder => ({
    fetchAllGradeCompanies: builder.query({
      query: () => ({
        url: "/company/all",
        method: "GET",
      }),
      providesTags: ["AllGradeCompanies"],
    }),
    fetchTARanks: builder.query({
      query: () => ({
        url: "/ta-ranks/",
        method: "GET",
      }),
    }),
    fetchGradeClientCompanies: builder.query({
      query: () => ({
        url: "/client-companies/",
        method: "GET",
      }),
      providesTags: ["ClientCompanies"],
    }),
    fetchGradeCompanies: builder.query({
      query: () => ({
        url: "/company/",
        method: "GET",
      }),
      providesTags: ["ClientCompanies"],
    }),
    createGradeCompany: builder.mutation({
      query: body => ({
        url: "/company/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AllGradeCompanies", "ClientCompanies"],
    }),
    deleteGradeCompany: builder.mutation({
      query: ({ id }) => ({
        url: `/company/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllGradeCompanies", "ClientCompanies"],
    }),
    updateGradeCompany: builder.mutation({
      query: body => ({
        url: `/company/${body?.id}/`,
        method: "PUT",
        body: { grades: body?.grades },
      }),
      invalidatesTags: ["AllGradeCompanies"],
    }),
  }),
});

export const {
  useFetchTARanksQuery,
  useFetchAllGradeCompaniesQuery,
  useFetchGradeClientCompaniesQuery,
  useFetchGradeCompaniesQuery,
  useCreateGradeCompanyMutation,
  useDeleteGradeCompanyMutation,
  useUpdateGradeCompanyMutation,
} = gradeApi;
