import { subAdminApi } from "@/services/sub.admin";
import { createSlice } from "@reduxjs/toolkit";

import { ISubAdminReducer } from "./sub.admin.types";

const initialState: ISubAdminReducer = {
    list: [],
};

const slice = createSlice({
    name: "subAdmin",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        // .addMatcher(
        //     subAdminApi.endpoints.list.matchFulfilled,
        //     (state, { payload }) => {
        //         state.list = payload;
        //     }
        // )

    },
});

export default slice.reducer;
