import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseURL = "https://o4gnaf7sce.execute-api.af-south-1.amazonaws.com/prod/api"

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: 'include',
    }),
    tagTypes: ['Session', 'Profile'],
    endpoints: builder => ({})
})