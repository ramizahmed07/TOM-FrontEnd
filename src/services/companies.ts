import { createApi } from "@reduxjs/toolkit/query/react";

import { tomService } from "./restService";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: tomService({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/companies`,
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
