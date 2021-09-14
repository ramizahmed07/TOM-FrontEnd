import { createApi } from "@reduxjs/toolkit/query/react";

import { tomService } from "./restService";

export const shortTermIPApi = createApi({
  reducerPath: "shortTermIPApi",
  baseQuery: tomService({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),
  tagTypes: [
    "ShortTermPlanTypes",
    "ShortTermPlans",
    "ShortTermIncentives",
    "ShortTermIncentiveVersions",
  ],

  // Short Term Plans
  endpoints: builder => ({
    fetchShortTermPlanTypes: builder.query({
      query: () => ({
        url: `/short-term-incentive-plan-types/`,
        method: "GET",
      }),
      providesTags: ["ShortTermPlanTypes"],
    }),
    fetchShortTermIncentiveVersions: builder.query({
      query: ({ company_id, page = 1 }) => ({
        url: `/company/${company_id}/short-term-incentive-versions/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["ShortTermIncentiveVersions"],
    }),
    fetchShortTermPlans: builder.query({
      query: ({ company_id, page = 1 }) => ({
        url: `/company/${company_id}/short-term-incentive-plans/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["ShortTermPlans"],
    }),
    createShortTermPlan: builder.mutation({
      query: ({ company_id, body }) => ({
        url: `/company/${company_id}/short-term-incentive-plan/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ShortTermPlans"],
    }),
    updateShortTermPlan: builder.mutation({
      query: ({ company_id, body, id }) => ({
        url: `/company/${company_id}/short-term-incentive-plan/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ShortTermPlans"],
    }),
    deleteShortTermPlan: builder.mutation({
      query: ({ company_id, id }) => ({
        url: `/company/${company_id}/short-term-incentive-plan/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ShortTermPlans"],
    }),

    // Short Term Incentives
    fetchShortTermIncentives: builder.query({
      query: ({ company_id, page = 1 }) => ({
        url: `/company/${company_id}/short-term-incentives/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["ShortTermIncentives"],
    }),
    createShortTermIncentive: builder.mutation({
      query: ({ company_id, body }) => ({
        url: `/company/${company_id}/short-term-incentive/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ShortTermIncentives"],
    }),
    updateShortTermIncentive: builder.mutation({
      query: ({ company_id, body, id }) => ({
        url: `/company/${company_id}/short-term-incentive/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ShortTermIncentives"],
    }),
    deleteShortTermIncentive: builder.mutation({
      query: ({ company_id, id }) => ({
        url: `/company/${company_id}/short-term-incentive/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ShortTermIncentives"],
    }),
    updateShortTermIncentiveVersion: builder.mutation({
      query: ({ id, company_id }) => ({
        url: `/company/${company_id}/short-term-incentive-version/${id}/set-active/`,
        method: "PATCH",
      }),
      invalidatesTags: ["ShortTermIncentives", "ShortTermIncentiveVersions"],
    }),
  }),
});

export const {
  useFetchShortTermPlanTypesQuery,
  useFetchShortTermPlansQuery,
  useCreateShortTermPlanMutation,
  useUpdateShortTermPlanMutation,
  useDeleteShortTermPlanMutation,
  useFetchShortTermIncentivesQuery,
  useCreateShortTermIncentiveMutation,
  useUpdateShortTermIncentiveMutation,
  useDeleteShortTermIncentiveMutation,
  useFetchShortTermIncentiveVersionsQuery,
  useUpdateShortTermIncentiveVersionMutation,
} = shortTermIPApi;
