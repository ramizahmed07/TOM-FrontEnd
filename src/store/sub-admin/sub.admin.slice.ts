import { subAdminApi } from "@/services/sub.admin";
import { createSlice } from "@reduxjs/toolkit";

import { ISubAdminReducer } from "./sub.admin.types";

const initialState: ISubAdminReducer = {
    list: [],
    subAdmin: {},
    pagination: {},
};

const slice = createSlice({
    name: "subAdmin",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(
                subAdminApi.endpoints.subAdminList.matchFulfilled,
                (state, { payload }) => {
                    state.list = payload.data;

                    state.pagination = payload.pagination;
                }
            )
            .addMatcher(
                subAdminApi.endpoints.getSubAdmin.matchFulfilled,
                (state, { payload }) => {
                    state.subAdmin = payload.data;
                    state.pagination = payload.pagination;
                }
            );

    },
});

export default slice.reducer;
