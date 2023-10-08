import { apiSlice } from "./apiIndexSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const contactsAdapter = createEntityAdapter({
    selectId: (contact) => contact._id,
    sortComparer: (a, b) => a.fullName.localeCompare(b.fullName)
})
const contactsInitialState = contactsAdapter.getInitialState()

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
        fetchUserByPhoneNumber: builder.mutation({
            query: (phoneNumber) => ({
                url: '/profile/retrieve_user_by_phone_number?' + new URLSearchParams({
                    phoneNumber: phoneNumber
                }),
                method: 'GET'
            })
        }),
        fetchContactsById: builder.query({
            query: (userId) => ({
                url: '/profile/retrieve_contacts?' + new URLSearchParams({
                    userId: userId
                }),
                method: 'GET'
            }),
            transformResponse: responseData => {
                return contactsAdapter.setAll(contactsInitialState, responseData)
            }
        }),
        fetchTransactions: builder.query({
            query: (userId) => ({
                url: '/profile/retrieve_transactions?' + new URLSearchParams({
                    userId: userId
                }),
                method: 'GET'
            })
        }),
        fetchSearchResults: builder.query({
            query: (query) => ({
                url: '/profile/search_users?' + new URLSearchParams({
                    query: query
                }),
                method: 'GET'
            })
        })
    })
})

export const {useFetchUserQuery, useFetchTransactionsQuery, 
    useFetchUserByPhoneNumberMutation, useFetchSearchResultsQuery,
    useFetchContactsByIdQuery} = extendedProfileSlice

export const selectContactsResult = (userId) => extendedProfileSlice.endpoints.fetchContactsById.select(userId)

export const selectContactsData = (userId) => createSelector(
    selectContactsResult(userId),
    contactsResult => contactsResult.data
)

export const contactSelector = (userId) => contactsAdapter.getSelectors(state => (selectContactsData(userId))(state) ?? contactsInitialState)
