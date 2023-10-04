import { apiSlice } from "./apiIndexSlice";

export const extendedProfileSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchUser: builder.query({
            query: (userId) => ({
                url: '/profile/retrieve_user?' + new URLSearchParams({
                    userId: userId
                }),
                method: 'GET'
            })
        }),
        fetchUserByPhoneNumber: builder.query({
            query: (phoneNumber) => ({
                url: '/profile/retrieve_user_by_phone_number?' + new URLSearchParams({
                    phoneNumber: phoneNumber
                }),
                method: 'GET'
            })
        }),
        fetchTransactions: builder.query({
            query: (userId) => ({
                url: '/profile/retrieve_transactions?' + new URLSearchParams({
                    userId: userId
                }),
                method: 'GET'
            })
        })
    })
})

export const {useFetchUserQuery} = extendedProfileSlice