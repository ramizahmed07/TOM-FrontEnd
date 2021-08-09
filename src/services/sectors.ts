import { createApi } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

export const sectorsApi = createApi({
  reducerPath: "sectorsApi ",
  baseQuery: tomService({
    baseUrl: `${baseUrl}`,
  }),

  endpoints: builder => ({
    fetchSectors: builder.query({
      query: () => ({
        url: "/sectors/",
        method: "GET",
      }),
    }),
    fetchIndustries: builder.query({
      query: ({ id }) => ({
        url: `/sector/${id}/industries/`,
        method: "GET",
      }),
    }),
    createSector: builder.mutation({
      query: body => ({
        url: "/sector/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useFetchSectorsQuery,
  useCreateSectorMutation,
  useFetchIndustriesQuery,
} = sectorsApi;
