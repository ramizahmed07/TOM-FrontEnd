import { createApi } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

const description = null;

export const subJobFunctionApi = createApi({
    reducerPath: "jobFunctionApi ",
    baseQuery: tomService({
        baseUrl: `${baseUrl}/job-sub-function`,
    }),

    endpoints: builder => ({
        sjfList: builder.mutation({
            query: () => ({
                url: "s/",
                method: "GET",
            }),
        }),
        addJSF: builder.mutation({
            query: data => ({
                url: "/",
                method: "POST",
                body: { ...data, },
            }),
        }),
        getJSF: builder.mutation({
            query: id => ({
                url: `/${id}/`,
                method: "GET",
            }),
        }),
        editJSF: builder.mutation({
            query: ({ id, name, job_function_id }) => ({
                url: `/${id}/`,
                method: "PUT",
                body: { name, job_function_id, description },

            }),
        }),
        deleteJSF: builder.mutation({
            query: id => ({
                url: `/${id}/`,
                method: "DELETE",
            }),
        }),

    }),
});

export const {
    useSjfListMutation,
    useAddJSFMutation,
    useGetJSFMutation,
    useEditJSFMutation,
    useDeleteJSFMutation,
} = subJobFunctionApi;