import { createApi } from "@reduxjs/toolkit/query/react";

import { tomService } from "./restService";

export const longTermIPApi = createApi({
  reducerPath: "longTermIPApi",
  baseQuery: tomService({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),
  tagTypes: [
    "LongTermPlanTypes",
    "LongTermPlans",
    "LongTermIncentives",
    "LongTermIncentiveVersions",
  ],

  // Short Term Plans
  endpoints: builder => ({
    fetchLongTermPlanTypes: builder.query({
      query: () => ({
        url: `/long-term-incentive-plan-types/`,
        method: "GET",
      }),
      providesTags: ["LongTermPlanTypes"],
    }),
    fetchCurrencies: builder.query({
      query: () => ({
        url: `/currencies/`,
        method: "GET",
      }),
    }),
    // fetchShortTermIncentiveVersions: builder.query({
    //   query: ({ company_id, page = 1 }) => ({
    //     url: `/company/${company_id}/short-term-incentive-versions/?page=${page}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["LongTermIncentiveVersions"],
    // }),
    fetchLongTermPlans: builder.query({
      query: ({ company_id, page = 1 }) => ({
        url: `/company/${company_id}/long-term-incentive-plans/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["LongTermPlans"],
    }),
    createLongTermPlan: builder.mutation({
      query: ({ company_id, body }) => ({
        url: `/company/${company_id}/long-term-incentive-plan/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["LongTermPlans"],
    }),
    updateLongTermPlan: builder.mutation({
      query: ({ company_id, body, id }) => ({
        url: `/company/${company_id}/long-term-incentive-plan/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["LongTermPlans"],
    }),
    deleteLongTermPlan: builder.mutation({
      query: ({ company_id, id }) => ({
        url: `/company/${company_id}/long-term-incentive-plan/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["LongTermPlans"],
    }),

    // Short Term Incentives
    // fetchShortTermIncentives: builder.query({
    //   query: ({ company_id, page = 1 }) => ({
    //     url: `/company/${company_id}/short-term-incentives/?page=${page}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["LongTermIncentives"],
    // }),
    // createShortTermIncentive: builder.mutation({
    //   query: ({ company_id, body }) => ({
    //     url: `/company/${company_id}/short-term-incentive/`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["LongTermIncentives"],
    // }),
    // updateShortTermIncentive: builder.mutation({
    //   query: ({ company_id, body, id }) => ({
    //     url: `/company/${company_id}/short-term-incentive/${id}/`,
    //     method: "PUT",
    //     body,
    //   }),
    //   invalidatesTags: ["LongTermIncentives"],
    // }),
    // deleteShortTermIncentive: builder.mutation({
    //   query: ({ company_id, id }) => ({
    //     url: `/company/${company_id}/short-term-incentive/${id}/`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["LongTermIncentives"],
    // }),
    // updateShortTermIncentiveVersion: builder.mutation({
    //   query: ({ id, company_id }) => ({
    //     url: `/company/${company_id}/short-term-incentive-version/${id}/set-active/`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: ["LongTermIncentives", "LongTermIncentiveVersions"],
    // }),
  }),
});

export const {
  useFetchCurrenciesQuery,
  useFetchLongTermPlanTypesQuery,
  useFetchLongTermPlansQuery,
  useDeleteLongTermPlanMutation,
  useCreateLongTermPlanMutation,
  useUpdateLongTermPlanMutation,
  //   useUpdateShortTermPlanMutation,
  //   useDeleteShortTermPlanMutation,
  //   useFetchShortTermIncentivesQuery,
  //   useCreateShortTermIncentiveMutation,
  //   useUpdateShortTermIncentiveMutation,
  //   useDeleteShortTermIncentiveMutation,
  //   useFetchShortTermIncentiveVersionsQuery,
  //   useUpdateShortTermIncentiveVersionMutation,
} = longTermIPApi;
