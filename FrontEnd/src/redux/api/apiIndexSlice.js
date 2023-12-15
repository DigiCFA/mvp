import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

/* RTK Query has the following prominent features: 

    automatic caching, 
    built-in API slicing (managing their state/caching automatically), 
    auto-generated hooks (simplifies integrating the API), 
    polling/prefetching, 
    data mutations, 
    cache invalidation, 
    essentially simplified state management overall. 
*/

/* Benefits compared to Axios:

    No need to manually handle request states
    Redux state integration - more unified way to manage both local/server state
    Optimized performance
    Consistent data management
    Ease of use
    ...

    Much more holistic solution for managing server state in Redux apps - great for complex apps with efficiency, maintainability and consistency
*/


export const baseURL = "https://zs6sljffd3.execute-api.af-south-1.amazonaws.com/prod/api"
// export const profilePicBaseURL = "https://digicfa-profilepics.s3.af-south-1.amazonaws.com/";
// Do not need profilePicBaseURL in the frontend. Only call the backend function to upload.
// Had this field before for fetching reasons - but now it's stored in MDB.

// Define a service with the base URL and expected endpoints
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: 'include',
    }),
    tagTypes: ['Session', 'Profile'],
    endpoints: builder => ({})
})