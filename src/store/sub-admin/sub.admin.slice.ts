import { subAdminApi } from "@/services/sub.admin";
import { createSlice } from "@reduxjs/toolkit";

import { ISubAdminReducer } from "./sub.admin.types";

const initialState: ISubAdminReducer = {
    list: [],
    subAdmin: {}
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
                }
            )
            .addMatcher(
                subAdminApi.endpoints.getSubAdmin.matchFulfilled,
                (state, { payload }) => {
                    state.subAdmin = payload.data;
                }
            );

    },
});

export default slice.reducer;
