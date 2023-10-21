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
            }),
            providesTags: (result, error, arg) => [{type: "Profile", userId: arg}]
        }),
        fetchUserByPhoneNumber: builder.query({
            query: (phoneNumber) => ({
                url: '/profile/retrieve_user_by_phone_number?' + new URLSearchParams({
                    phoneNumber: phoneNumber
                }),
                method: 'GET'
            }),
            providesTags: (result, error, arg) => [{type: "Profile", userId: result._id}]
        }),
        fetchContactsById: builder.query({
            query: (userId) => ({
                url: '/profile/retrieve_contacts?' + new URLSearchParams({
                    userId: userId
                }),
                method: 'GET'
            }),
            providesTags: (result, error, arg) => {
                return result.ids.map((contactId) => ({type: "Profile", userId: contactId}))
            },
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
            }),
            providesTags: (result, error, arg) => {
                return [{type: "Profile", userId: arg}]
            }
        }),
        fetchSearchResults: builder.query({
            query: (query) => ({
                url: '/profile/search_users?' + new URLSearchParams({
                    query: query
                }),
                method: 'GET'
            })
        }),
        createDirectTransaction: builder.mutation({
            query: (arg) => { 

                ({amountTransferred, sender, receiver, paymentMethod, 
                    isPayment, isApproved, message} = arg)

                return ({
                    url: '/transaction/create_direct_transaction',
                    method: 'POST',
                    body: {
                        amountTransferred: amountTransferred,
                        sender: sender,
                        receiver: receiver,
                        paymentMethod: paymentMethod,
                        isPayment: isPayment,
                        isApproved: isApproved,
                        message: message,
                    }
                })
            },
            invalidatesTags: (result, error, arg) => {
                console.log("send", arg)
                return [{type: "Profile", userId: arg.sender}, {type: "Profile", userId: arg.receiver}]
            }
        })
    })
})

export const {useFetchUserQuery, useFetchTransactionsQuery, 
    useFetchUserByPhoneNumberQuery, useFetchSearchResultsQuery,
    useFetchContactsByIdQuery, useLazyFetchSearchResultsQuery,
    useCreateDirectTransactionMutation} = extendedProfileSlice

export const selectContactsResult = (userId) => extendedProfileSlice.endpoints.fetchContactsById.select(userId)

export const selectContactsData = (userId) => createSelector(
    selectContactsResult(userId),
    contactsResult => contactsResult.data
)

export const contactSelector = (userId) => contactsAdapter.getSelectors(state => (selectContactsData(userId))(state) ?? contactsInitialState)
