import { createApi } from "@reduxjs/toolkit/query/react";

import { tomService } from "./restService";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: tomService({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/companies`,
  }),
  tagTypes: ["Companies", "Regions"],

  endpoints: builder => ({
    /**
     * @Services - Companies
     */
    fetchCompanies: builder.query({
      query: () => ({
        url: "/companies/",
        method: "GET",
      }),
      providesTags: ["Companies"],
    }),

    updateCompanyStatus: builder.mutation({
      query: ({ status, company_id }) => ({
        url: `/company/${company_id}/?active=${status}/`,
        method: "PATCH",
      }),
      invalidatesTags: ["Companies"],
    }),

    /**
     * @Services - Regions
     */
    fetchRegions: builder.query({
      query: ({ id, page = 1 }) => ({
        url: `/company/${id}/regions/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Regions"],
    }),
    createRegion: builder.mutation({
      query: ({ body, company_id }) => ({
        url: `/company/${company_id}/region/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Regions"],
    }),
    deleteRegion: builder.mutation({
      query: ({ company_id, region_id }) => ({
        url: `/company/${company_id}/region/${region_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Regions"],
    }),
    updateRegion: builder.mutation({
      query: ({ body, company_id }) => ({
        url: `/company/${company_id}/region/${body?.id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Regions"],
    }),
  }),
});

export const {
  useFetchCompaniesQuery,
  useUpdateCompanyStatusMutation,
  useFetchRegionsQuery,
  useCreateRegionMutation,
  useDeleteRegionMutation,
  useUpdateRegionMutation,
} = companiesApi;
