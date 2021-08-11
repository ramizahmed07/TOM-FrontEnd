import { createApi } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

export const gradeApi = createApi({
  reducerPath: "gradeApi",
  baseQuery: tomService({
    baseUrl: `${baseUrl}/grade`,
  }),

  endpoints: builder => ({
    fetchTARanks: builder.query({
      query: () => ({
        url: "/ta-ranks/",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchTARanksQuery } = gradeApi;
