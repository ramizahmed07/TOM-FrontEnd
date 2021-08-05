// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./constants";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi ",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/auth` }),
  endpoints: builder => ({
    getPokemonByName: builder.query({
      query: query => query,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = authApi;
