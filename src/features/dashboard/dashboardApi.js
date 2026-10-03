import { api } from "../../service/api";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    pr: builder.query({
      query: () => ({
        url: "/dashboard/pr",
        method: "GET",
      }),
    }),

    session: builder.query({
      query: () => ({
        url: "/dashboard/sessions",
        method: "GET",
      }),
    }),
  }),
});

export const { usePrQuery, useSessionQuery } = dashboardApi;
