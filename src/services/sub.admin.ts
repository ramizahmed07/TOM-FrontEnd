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
        subAdminList: builder.mutation({
            query: () => ({
                url: "s/",
                method: "GET",
            }),
        }),
        addSubAdmin: builder.mutation({
            query: data => ({
                url: "/",
                method: "POST",
                body: { ...data, },
            }),
        }),
        toggleSubAdmin: builder.mutation({
            query: ({ id, is_active }) => ({
                url: `/${id}/?active=${is_active}`,
                method: "PATCH",
            }),
        }),
        getSubAdmin: builder.mutation({
            query: id => ({
                url: `/${id}/`,
                method: "GET",
            }),
        }),
        editSubAdmin: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/${id}/`,
                method: "PUT",
                body: payload
            }),
        }),
    }),
});

export const {
    useSubAdminListMutation,
    useAddSubAdminMutation,
    useToggleSubAdminMutation,
    useGetSubAdminMutation,
    useEditSubAdminMutation,
} = subAdminApi;