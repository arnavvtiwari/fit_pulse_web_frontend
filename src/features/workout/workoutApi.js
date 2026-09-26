import { api } from "../../service/api";

export const workoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorkouts: builder.query({
      query: () => ({
        url: "/workout/workoutList",
        method: "GET",
      }),
      providesTags: ["Workout"],
    }),
    getWorkoutDetails: builder.query({
      query: (workoutId) => ({
        url: `/workout/workoutDetails/${workoutId}`,
        method: "GET",
      }),
      providesTags: ["Workout"],
    }),

    // Create a new exercise
    createWorkout: builder.mutation({
      query: (data) => ({
        url: "/workout/createWorkout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Workout"],
    }),

    // Create a workout record
    createWorkoutRecord: builder.mutation({
      query: ({ workoutId, ...data }) => ({
        url: `/workout/updateRecord/${workoutId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Workout"],
    }),

    // Update an existing workout record
    updateWorkoutRecord: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/workout/updateWorkout/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Workout"],
    }),

    // Delete an existing workout record
    deleteWorkoutRecord: builder.mutation({
      query: (id) => ({
        url: `/workout/records/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workout"],
    }),
  }),
});

export const {
  useGetWorkoutsQuery,
  useGetWorkoutDetailsQuery,
  useCreateWorkoutMutation,
  useCreateWorkoutRecordMutation,
  useUpdateWorkoutRecordMutation,
  useDeleteWorkoutRecordMutation,
} = workoutApi;
