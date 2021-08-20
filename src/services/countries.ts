import { createAsyncThunk } from "@reduxjs/toolkit";

import { baseUrl } from "./constants";
import { tomService } from "./restService";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response: any = await tomService({
      baseUrl,
    })({
      method: "GET",
      url: "/countries/",
    });
    return response?.data?.data;
  }
);
