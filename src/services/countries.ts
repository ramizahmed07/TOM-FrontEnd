import { createAsyncThunk } from "@reduxjs/toolkit";

import { tomService } from "./restService";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response: any = await tomService({
      baseUrl: process.env.REACT_APP_BASE_URL,
    })({
      method: "GET",
      url: "/countries/",
    });
    return response?.data?.data;
  }
);
