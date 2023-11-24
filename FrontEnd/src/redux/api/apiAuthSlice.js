import { apiSlice } from "./apiIndexSlice";

export const extendedSessionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          phoneNumber: user.phoneNumber,
          password: user.password,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        if (Boolean(result) === true) {
          return [
            { type: "Session", userId: result.userId },
            { type: "Session", userId: "GENERIC" },
          ];
        }
      },
    }),
    signup: builder.mutation({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: {
          phoneNumber: user.phoneNumber,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Session", userId: result.userId },
        { type: "Session", userId: "GENERIC" },
      ],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Session", userId: result.userId },
      ],
    }),
    getSession: builder.query({
      query: () => ({
        url: "/auth/obtain_session",
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        if (Boolean(result) === true) {
          return [
            { type: "Session", userId: result.userId },
            { type: "Session", userId: "GENERIC" },
          ];
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useGetSessionQuery,
} = extendedSessionSlice;
