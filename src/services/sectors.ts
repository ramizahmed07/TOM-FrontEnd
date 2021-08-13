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
      query: (page = 1) => {
        return {
          url: `/sectors/?page=${page}`,
          method: "GET",
        };
      },
      providesTags: ["Sectors"],
    }),
    fetchIndustries: builder.query({
      query: ({ id, page = 1 }) => ({
        url: `/sector/${id}/industries/?page=${page}`,
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
    }),
    deleteSector: builder.mutation({
      query: ({ id }) => ({
        url: `/sector/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sectors"],
    }),
    deleteIndustry: builder.mutation({
      query: ({ id }) => ({
        url: `/industry/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Industries"],
    }),
    deleteSubIndustry: builder.mutation({
      query: ({ id }) => ({
        url: `/sub-industry/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Industries"],
    }),
    updateSector: builder.mutation({
      query: body => ({
        url: `/sector/${body?.id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Sectors"],
    }),
    updateIndustry: builder.mutation({
      query: body => ({
        url: `/industry/${body?.id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Industries"],
    }),
    updateSubIndustry: builder.mutation({
      query: body => ({
        url: `/sub-industry/${body?.id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Industries"],
    }),
    uploadSectors: builder.mutation({
      query: body => ({
        url: "/sector/upload/",
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags: ["Sectors"],
    }),
    downloadSectors: builder.query({
      query: () => ({
        url: "/sector/download/",
        method: "GET",
      }),
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
  useDeleteIndustryMutation,
  useDeleteSubIndustryMutation,
  useUpdateSectorMutation,
  useUpdateIndustryMutation,
  useUpdateSubIndustryMutation,
  useUploadSectorsMutation,
  useDownloadSectorsQuery,
} = sectorsApi;
