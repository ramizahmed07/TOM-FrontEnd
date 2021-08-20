import { createApi } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

export const businessUnitApi = createApi({
  reducerPath: "businessUnitApi",
  baseQuery: tomService({
    baseUrl: `${baseUrl}/company`,
  }),

  endpoints: builder => ({
    fetchBusinessUnit: builder.mutation({
      query: ({ company_id }) => ({
        url: `/${company_id}/business-units/`,
        method: "GET",
      }),
    }),
    deleteBusinessUnit: builder.mutation({
      query: ({ company_id, business_unit_id }) => ({
        url: `/${company_id}/business-unit/${business_unit_id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFetchBusinessUnitMutation, useDeleteBusinessUnitMutation } =
  businessUnitApi;
