import { createApi } from "@reduxjs/toolkit/query/react";

import { tomService } from "./restService";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: tomService({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),
  tagTypes: ["Companies", "Regions", "LegalEntities"],

  endpoints: builder => ({
    /**
     * @Services - Companies
     */
    fetchCompanies: builder.query({
      query: (page = 1) => ({
        url: `/companies/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Companies"],
    }),

    fetchCompany: builder.query({
      query: ({ company_id }) => ({
        url: `/company/${company_id}/`,
        method: "GET",
      }),
    }),
    createCompany: builder.mutation({
      query: ({ body }) => ({
        url: `/company/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Companies"],
    }),
    updateCompany: builder.mutation({
      query: ({ body, company_id }) => ({
        url: `/company/${company_id}/`,
        method: "PATCH",
        body,
      }),
    }),
    updateCompanyStatus: builder.mutation({
      query: ({ status, company_id }) => ({
        url: `/company/${company_id}/?active=${status}/`,
        method: "PATCH",
      }),
      invalidatesTags: ["Companies"],
    }),

    /**
     * @Services - Business Units
     */
    fetchAllBusinessUnits: builder.query({
      query: ({ company_id }) => ({
        url: `/company/${company_id}/business-unit/all`,
        method: "GET",
      }),
    }),

    fetchBusinessUnit: builder.query({
      query: ({ company_id, id }) => ({
        url: `/company/${company_id}/business-unit/${id}/`,
        method: "GET",
      }),
    }),

    /**
     * @Services - Legal Entities
     */
    fetchLegalEntities: builder.query({
      query: ({ company_id, business_unit_id, region_id, country_id }) => ({
        url: `/company/${company_id}/business-unit/${business_unit_id}/region/${region_id}/country/${country_id}/legal-entities/`,
        method: "GET",
      }),
      providesTags: ["LegalEntities"],
    }),

    createLegalEntity: builder.mutation({
      query: ({ body, company_id }) => ({
        url: `/company/${company_id}/legal-entity/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["LegalEntities"],
    }),

    deleteLegalEntity: builder.mutation({
      query: ({ company_id, id }) => ({
        url: `/company/${company_id}/legal-entity/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["LegalEntities"],
    }),

    updateLegalEntity: builder.mutation({
      query: ({ name, id, company_id }) => ({
        url: `/company/${company_id}/legal-entity/${id}/`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["LegalEntities"],
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
    fetchRegion: builder.query({
      query: ({ company_id, id }) => ({
        url: `/company/${company_id}/region/${id}/`,
        method: "GET",
      }),
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
  useCreateCompanyMutation,
  useFetchCompanyQuery,
  useUpdateCompanyMutation,
  useFetchBusinessUnitQuery,
  useFetchAllBusinessUnitsQuery,
  useFetchLegalEntitiesQuery,
  useCreateLegalEntityMutation,
  useDeleteLegalEntityMutation,
  useUpdateLegalEntityMutation,
  useFetchRegionsQuery,
  useFetchRegionQuery,
  useCreateRegionMutation,
  useDeleteRegionMutation,
  useUpdateRegionMutation,
} = companiesApi;
