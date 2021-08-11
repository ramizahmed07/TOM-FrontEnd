import { createApi } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

export const gradeApi = createApi({
  reducerPath: "gradeApi",
  baseQuery: tomService({
    baseUrl: `${baseUrl}/grade`,
  }),

  endpoints: builder => ({
    fetchAllGradeCompanies: builder.query({
      query: () => ({
        url: "/company/all",
        method: "GET",
      }),
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
    }),
    fetchGradeCompanies: builder.query({
      query: () => ({
        url: "/company/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchTARanksQuery,
  useFetchAllGradeCompaniesQuery,
  useFetchGradeClientCompaniesQuery,
  useFetchGradeCompaniesQuery,
} = gradeApi;
