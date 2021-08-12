import { createApi } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

const description = null;

export const subAdminApi = createApi({
    reducerPath: "subAdminApi ",
    baseQuery: tomService({
        baseUrl: `${baseUrl}/admin/tom-user`,
    }),

    endpoints: builder => ({
        addSubAdmin: builder.mutation({
            query: data => ({
                url: "/",
                method: "POST",
                body: { ...data, },
            }),
        }),
        // getJSF: builder.mutation({
        //     query: id => ({
        //         url: `/${id}/`,
        //         method: "GET",
        //     }),
        // }),
        // editJSF: builder.mutation({
        //     query: ({ id, name, job_function_id }) => ({
        //         url: `/${id}/`,
        //         method: "PUT",
        //         body: { name, job_function_id, description },

        //     }),
        // }),
        // deleteJSF: builder.mutation({
        //     query: id => ({
        //         url: `/${id}/`,
        //         method: "DELETE",
        //     }),
        // }),
    }),
});

export const {
    useAddSubAdminMutation,
} = subAdminApi;