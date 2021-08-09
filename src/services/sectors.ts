import { createApi } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

export const sectorsApi = createApi({
  reducerPath: "sectorsApi ",
  baseQuery: tomService({
    baseUrl: `${baseUrl}/sector`,
  }),

  endpoints: builder => ({
    fetchSectors: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    createSector: builder.mutation({
      query: body => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useFetchSectorsQuery, useCreateSectorMutation } = sectorsApi;
