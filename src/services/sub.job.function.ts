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
    }),
});

export const {
    useSjfListMutation,
} = subJobFunctionApi;