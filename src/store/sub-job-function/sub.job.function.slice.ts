import { createSlice } from "@reduxjs/toolkit";

import { subJobFunctionApi } from "@services";
import { ISubJobFunctionReducer } from "./sub.job.function.types";

const initialState: ISubJobFunctionReducer = {
    list: [],
};

const slice = createSlice({
    name: "subJobFunction",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(
                subJobFunctionApi.endpoints.sjfList.matchFulfilled,
                (state, { payload }) => {
                    state.list = payload;
                }
            )
    },
});

export default slice.reducer;
