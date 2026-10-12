import { api } from "../../service/api";

export const weight = api.injectEndpoints({
  endpoints: (builder) => ({
    currentWeight: builder.query({
      query: () => ({
        url: "/weight/getCurrentWeight",
        method: "GET",
      }),
    }),
    weightList: builder.query({
      query: () => ({
        url: "/weight/getWeight",
        method: "GET",
      }),
    }),
    addWeight: builder.mutation({
      query: (data) => ({
        url: "/weight/addWeight",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCurrentWeightQuery, useWeightListQuery, useAddWeightMutation } = weight;
