import { createApi } from "@reduxjs/toolkit/query/react";

import { tomService } from "./restService";

export const sectorsApi = createApi({
  reducerPath: "sectorsApi ",
  baseQuery: tomService({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),
  tagTypes: ["Sectors", "Industries", "Sub-Industries"],
  endpoints: builder => ({
    fetchAllSectors: builder.mutation({
      query: () => {
        return {
          url: `/sectors/all`,
          method: "GET",
        };
      },
    }),
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
    fetchSubIndustries: builder.query({
      query: ({ id, page = 1 }) => ({
        url: `/industry/${id}/sub-industries/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Sub-Industries"],
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
      invalidatesTags: ["Industries", "Sectors"],
    }),
    createSubIndustry: builder.mutation({
      query: body => ({
        url: "/sub-industry/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sub-Industries", "Industries"],
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
      invalidatesTags: ["Industries", "Sectors"],
    }),
    deleteSubIndustry: builder.mutation({
      query: ({ id }) => ({
        url: `/sub-industry/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sub-Industries", "Industries"],
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
      invalidatesTags: ["Industries", "Sectors"],
    }),
    updateSubIndustry: builder.mutation({
      query: body => ({
        url: `/sub-industry/${body?.id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Sub-Industries", "Industries"],
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
  useFetchAllSectorsMutation,
  useFetchSectorsQuery,
  useCreateSectorMutation,
  useFetchIndustriesQuery,
  useFetchSubIndustriesQuery,
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
