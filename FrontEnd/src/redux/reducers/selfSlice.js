import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  fetchProfilePic,
  fetchTransactions,
  fetchUser,
  profilePicBaseURL,
} from "../../utils/api";

// Maybe write a thunk to fetch user info. In which case user info is passed during login, in which case initialState should be null
const initialState = {
  self: {
    _id: "001",
    firstName: "Default",
    lastName: "User",
    fullName: "Default User",
    phoneNumber: "+1 123 456 7890",
    QRCode: null,
    balance: 888.88,
    cards: [
      {
        name: "Default Card 1",
        accountHolder: "Default User",
        cardNumber: "0000 0000 0000 0000",
        cardType: "bank",
        expDate: "2099-99-99T00:00:00.000Z",
        cvv: "999",
        billingAddress: "Some Location",
        _id: "888",
      },
    ],
    // privacyPreferences: [],
    contacts: [],
    phoneNumbers: [],
    profilePicture: profilePicBaseURL + "default.png",
    currentAddress: {
      lineOne: "Not set",
      lineTwo: "",
      city: "",
      zipCode: "",
    },
    transactions: [],
    // Not necessary to fetch too much else at login (Eager Loading)
  },

  // Handling Loading
  userLoaded: false,
  transactionsLoaded: false,
  newProfilePicLoaded: false,
};

export const selfSlice = createSlice({
  name: "self",
  initialState,
  reducers: {
    setSelf: (state, action) => {
      // Can't get rid of these since some fields (like transaction) are not updated just from setSelf
      let newSelf = action.payload;
      state.self._id = newSelf._id;
      state.self.firstName = newSelf.firstName;
      state.self.lastName = newSelf.lastName;
      state.self.fullName = newSelf.fullName;
      state.self.phoneNumber = newSelf.phoneNumber;
      state.self.QRCode = newSelf.QRCode;
      state.self.balance = newSelf.balance;
      state.self.cards = newSelf.cards;
      state.self.privacyPreferences = newSelf.privacyPreferences;
      state.self.contacts = newSelf.contacts;
      state.self.phoneNumbers = newSelf.phoneNumbers;
      state.self.profilePicture = profilePicBaseURL + newSelf.profilePicture;

      state.userLoaded = true;
    },
    setTransactions: (state, action) => {
      state.self.transactions = action.payload;
      state.transactionsLoaded = true;
    },
    setProfilePic: (state, action) => {
      // console.log("New profile pic: ", action.payload);
      state.self.profilePicture = action.payload;
      state.newProfilePicLoaded = true;
    },
  },
});

// Thunk Action creator
export const fetchUserById = (userId) => {
  return async (dispatch, getState) => {
    try {
      const user = await fetchUser(userId);

      if (user.status == 200) console.log("SUCCESSFULLY RETRIEVED USER");
      else console.log("ERROR RETRIEVING USER");

      // Add a default 'card' which represents balance
      user.data.cards.unshift({
        _id: "001",
        name: "DigiCFA Balance",
        cardType: "balance",
        balance: user.data.balance,
      });

      dispatch(setSelf(user.data));
    } catch (error) {
      if (error.response) {
        console.log(
          "The request was made and the server responded with a status code that falls out of the range of 2xx"
        );
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(
          "The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js"
        );
        console.log(error.request);
      } else {
        console.log(
          "Something happened in setting up the request that triggered an Error"
        );
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
};

export const fetchTransactionsById = (userId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetchTransactions(userId);
      if (response.status == 200)
        console.log("SUCCESSFULLY RETRIEVED TRANSACTIONS");
      else console.log("ERROR");

      dispatch(setTransactions(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchProfilePicById = (userId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetchUser(userId);
      if (response.status == 200)
        console.log("SUCCESSFULLY RETRIEVED USER TO UPDATE PROFILE PIC");
      else console.log("ERROR");

      dispatch(setProfilePic(profilePicBaseURL + response.data.profilePicture));
    } catch (error) {
      console.error(error);
    }
  };
};

export const { setSelf, setTransactions, setProfilePic } = selfSlice.actions;

export const selectSelf = (state) => state.self.self;
export const selectId = (state) => state.self.self._id;
export const selectBalance = (state) => state.self.self.balance;
export const selectCards = (state) => state.self.self.cards;
export const selectContacts = (state) => state.self.self.contacts;
export const selectTransactions = (state) => state.self.self.transactions;
export const selectProfilePic = (state) => state.self.self.profilePicture;
export const selectPhoneNumbers = (state) => state.self.self.phoneNumbers;
export const whetherUserLoaded = (state) => state.self.userLoaded;
export const whetherTransactionsLoaded = (state) =>
  state.self.transactionsLoaded;
export const whetherNewProfilePicLoaded = (state) =>
  state.self.newProfilePicLoaded;

export default selfSlice.reducer;
