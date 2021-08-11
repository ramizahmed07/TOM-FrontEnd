import { createSlice } from "@reduxjs/toolkit";

import { jobFunctionApi } from "@services";
import { IJobFunctionReducer } from "./job.function.types";

const initialState: IJobFunctionReducer = {
    list: [],
    jobFunctionItem: {},
};

const slice = createSlice({
    name: "jobFunction",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(
                jobFunctionApi.endpoints.list.matchFulfilled,
                (state, { payload }) => {
                    state.list = payload;
                }
            )
            .addMatcher(
                jobFunctionApi.endpoints.getJF.matchFulfilled,
                (state, { payload }) => {
                    console.log('Payload: ', payload);
                    state.jobFunctionItem = payload;
                }
            );
    },
});

export default slice.reducer;
