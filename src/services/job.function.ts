import { createApi } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

const description = null;

export const jobFunctionApi = createApi({
    reducerPath: "jobFunctionApi ",
    baseQuery: tomService({
        baseUrl: `${baseUrl}/job-function`,
    }),

    endpoints: builder => ({
        list: builder.mutation({
            query: () => ({
                url: "s/",
                method: "GET",
            }),
        }),
        addJF: builder.mutation({
            query: data => ({
                url: "/",
                method: "POST",
                body: { ...data, description },
            }),
        }),
        getJF: builder.mutation({
            query: id => ({
                url: `/${id}/`,
                method: "GET",
            }),
        }),
        editJF: builder.mutation({
            query: ({ id, name }) => ({
                url: `/${id}/`,
                method: "PUT",
                body: { name, description },

            }),
        }),
        deleteJF: builder.mutation({
            query: id => ({
                url: `/${id}/`,
                method: "DELETE",
            }),
        }),
        uploadJobFunctions: builder.mutation({
            query: body => ({
                url: "/upload/",
                method: "POST",
                body,
                formData: true,
            }),
        }),
        downloadJobFunctions: builder.mutation({
            query: () => ({
                url: "/download/",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useListMutation,
    useAddJFMutation,
    useGetJFMutation,
    useEditJFMutation,
    useDeleteJFMutation,
    useUploadJobFunctionsMutation,
    useDownloadJobFunctionsMutation,
} = jobFunctionApi;