import { apiSlice } from "./apiIndexSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";
import { dinero, toSnapshot } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { baseURL } from "./apiIndexSlice";

// Entity Adapter: a set of reusable reducers + selectors for CRUD operations
const contactsAdapter = createEntityAdapter({
  selectId: (contact) => contact._id,
  sortComparer: (a, b) => a.fullName.localeCompare(b.fullName),
});
const contactsInitialState = contactsAdapter.getInitialState();

export const extendedProfileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (userId) => ({
        url:
          "/profile/retrieve_user?" +
          new URLSearchParams({
            userId: userId,
          }),
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Profile", userId: arg }],
    }),
    fetchUserByPhoneNumber: builder.query({
      query: (phoneNumber) => ({
        url:
          "/profile/retrieve_user_by_phone_number?" +
          new URLSearchParams({
            phoneNumber: phoneNumber,
          }),
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        error ? [] : [{ type: "Profile", userId: result._id }],
    }),
    fetchContactsById: builder.query({
      query: (userId) => ({
        url:
          "/profile/retrieve_contacts?" +
          new URLSearchParams({
            userId: userId,
          }),
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        return result.ids.map((contactId) => ({
          type: "Profile",
          userId: contactId,
        }));
      },
      //
      transformResponse: (responseData) => {
        return contactsAdapter.setAll(contactsInitialState, responseData);
      },
    }),
    fetchTransactions: builder.query({
      query: (userId) => ({
        url:
          "/profile/retrieve_transactions?" +
          new URLSearchParams({
            userId: userId,
          }),
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        return [{ type: "Profile", userId: arg }];
      },
    }),
    fetchSearchResults: builder.query({
      query: (query) => ({
        url:
          "/profile/search_users?" +
          new URLSearchParams({
            query: query,
          }),
        method: "GET",
      }),
    }),
    createDirectTransaction: builder.mutation({
      query: (arg) => {
        ({
          amountTransferred,
          sender,
          receiver,
          paymentMethod,
          isPayment,
          isApproved,
          message,
        } = arg);
        
        return {
          url: "/transaction/create_direct_transaction",
          method: "POST",
          body: {
            amountTransferred: amountTransferred,
            sender: sender,
            receiver: receiver,
            paymentMethod: paymentMethod,
            isPayment: isPayment,
            isApproved: isApproved,
            message: message,
          },
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [
          { type: "Profile", userId: arg.sender },
          { type: "Profile", userId: arg.receiver },
        ];
      },
    }),
    uploadProfilePicture: builder.mutation({
      queryFn: async (args) => {
        const { userId, imageURI } = args;
        let uriArray = imageURI.split(".");
        let fileType = "image/" + uriArray[uriArray.length - 1];

        try {
          const result = await FileSystem.uploadAsync(
            baseURL + "/profile/set_profile_pic",
            imageURI,
            {
              headers: {
                "Content-Type": fileType,
              },
              httpMethod: "PATCH",
              uploadType: FileSystem.FileSystemUploadType.MULTIPART,
              fieldName: "profilePicture",
              parameters: {
                userId: userId,
              },
            }
          );

          if (result.status === 200) {
            return { data: result };
          }
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Profile", userId: arg.userId },
      ],
    }),
    uploadFcmToken: builder.mutation({
      query: (args) => {
        const { userId, fcmToken, timestamp } = args;
        return {
          url: "/profile/upload_fcm_token",
          method: "PATCH",
          body: {
            fcm_token: fcmToken,
            timestamp: timestamp,
            userId: userId,
          },
        };
      },
    }),
  }),
});

export const {
  useFetchUserQuery,
  useFetchTransactionsQuery,
  useFetchUserByPhoneNumberQuery,
  useFetchSearchResultsQuery,
  useFetchContactsByIdQuery,
  useLazyFetchSearchResultsQuery,
  useCreateDirectTransactionMutation,
  useUploadProfilePictureMutation,
  useUploadFcmTokenMutation,
} = extendedProfileSlice;

// ----------------
// SELECTORS
// ----------------
// CONTACT SELECTORS
const selectContactsResult = (userId) =>
  extendedProfileSlice.endpoints.fetchContactsById.select(userId);

// createSelector: selectors that only recompute when inputs change
const selectContactsData = (userId) =>
  createSelector(
    selectContactsResult(userId),
    (contactsResult) => contactsResult.data
  );

export const contactSelector = (userId) =>
  contactsAdapter.getSelectors(
    (state) => selectContactsData(userId)(state) ?? contactsInitialState
  );

// USER SELECTORS
const selectUserResult = (userId) =>
  extendedProfileSlice.endpoints.fetchUser.select(userId);

export const selectCardsFromUser = (userId) =>
  createSelector(
    selectUserResult(userId),
    (userResult) => userResult?.data?.cards
  );

export const selectBalanceFromUser = (userId) =>
  createSelector(
    selectUserResult(userId),
    (userResult) => (userResult?.data)?toSnapshot(dinero(userResult?.data?.balance)): undefined
  );

export const selectProfilePicFromUser = (userId) =>
  createSelector(
    selectUserResult(userId),
    (userResult) => userResult?.data?.profilePicture
  );

export const selectNameFromUser = (userId) => createSelector(
  selectUserResult(userId),
  (userResult) => userResult?.data?.fullName
)