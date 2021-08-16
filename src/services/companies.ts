import { createApi } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: tomService({
    baseUrl: `${baseUrl}/companies`,
  }),

  endpoints: builder => ({
    fetchCompanies: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchCompaniesQuery } = companiesApi;
