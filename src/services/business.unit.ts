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
    addBusinessUnit: builder.mutation({
      query: ({ company_id, body }) => ({
        url: `/${company_id}/business-unit/`,
        method: "POST",
        body,
      }),
    }),
    editBusinessUnit: builder.mutation({
      query: ({ company_id, business_unit_id, body }) => ({
        url: `/${company_id}/business-unit/${business_unit_id}/`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useFetchBusinessUnitMutation,
  useDeleteBusinessUnitMutation,
  useAddBusinessUnitMutation,
  useEditBusinessUnitMutation,
} = businessUnitApi;
