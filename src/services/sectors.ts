import { createApi } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

export const sectorsApi = createApi({
  reducerPath: "sectorsApi ",
  baseQuery: tomService({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["Sectors", "Industries"],
  endpoints: builder => ({
    fetchSectors: builder.query({
      query: () => ({
        url: "/sectors/",
        method: "GET",
      }),
      providesTags: ["Sectors"],
    }),
    fetchIndustries: builder.query({
      query: ({ id }) => ({
        url: `/sector/${id}/industries/`,
        method: "GET",
      }),
      providesTags: ["Industries"],
    }),
    createSector: builder.mutation({
      query: body => ({
        url: "/sector/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sectors"],
    }),
    createIndustry: builder.mutation({
      query: body => ({
        url: "/industry/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Industries"],
    }),
    createSubIndustry: builder.mutation({
      query: body => ({
        url: "/sub-industry/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Industries"],
    }),
    deleteSector: builder.mutation({
      query: ({ id }) => ({
        url: `/sector/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sectors"],
    }),
    updateSector: builder.mutation({
      query: body => ({
        url: `/sector/${body?.id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Sectors"],
    }),
  }),
});

export const {
  useFetchSectorsQuery,
  useCreateSectorMutation,
  useFetchIndustriesQuery,
  useCreateIndustryMutation,
  useCreateSubIndustryMutation,
  useDeleteSectorMutation,
  useUpdateSectorMutation,
} = sectorsApi;
