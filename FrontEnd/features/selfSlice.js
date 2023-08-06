import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



// SHOULD ALL BE PLACED IN THE LOGIN PAGE
axios.defaults.baseURL = "http://localhost:5050/routes";

// Maybe write a thunk to fetch user info. In which case user info is passed during login, in which case initialState should be null
const initialState = {
  self: {
    // _id: "001",
    firstName: "Default",
    lastName: "User",
    fullName: "Default User",
    phoneNumber: "+1 123 456 7890",
    // password: "johnsmith",
    QRCode: null,
    balance: 888.88,
    cards: [{
      "name": "Default Card 1",
      "accountHolder": "Default User",
      "cardNumber": "0000 0000 0000 0000",
      "cardType": "bank",
      "expDate": "2099-99-99T00:00:00.000Z",
      "cvv": "999",
      "billingAddress": "Some Location",
      "_id": "888"
    }],
    // privacyPreferences: [],
    contacts: [],
    profilePicture: null,
    transactions: [
      {"_id":"64c7598b38949334596c929f","amountTransferred":1,"sender":"64c680183a2629add8d876bc","receiver":"64c67fce7c692097808e21c5"}
    ]
    // Not necessary to fetch too much else at login (Eager Loading)
  },
};

export const selfSlice = createSlice({
  name: "self",
  initialState,
  reducers: {
    // Very arbitrary code here -> please change it as fit
    logInOut: (state, action) => {
      if (action.type === "login") state.self = action.payload;
      else if (action.type === "logout") state.self = null;
    },
    setSelf: (state, action) => {

      // state.self = action.payload;

      let newSelf = action.payload;
      console.log("Newself: ", newSelf);
      state.self.firstName = newSelf.firstName;
      state.self.lastName = newSelf.lastName;
      state.self.fullName = newSelf.fullName;
      state.self.phoneNumber = newSelf.phoneNumber;
      state.self.QRCode = newSelf.QRCode;
      state.self.balance = newSelf.balance;
      state.self.cards = newSelf.cards;
      state.self.privacyPreferences = newSelf.privacyPreferences; 
      state.self.contacts = newSelf.contacts;
      state.self.profilePicture = newSelf.profilePicture;
    },
    setTransactions: (state, action) => {
      state.self.transactions = action.payload;
    }
  },
});


// Thunk Action creator
export const fetchUserById = userId => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get("/profile/retrieve_user", {
        params: {
          userId: userId,
        },
      });
      if (response.status == 200) console.log("SUCCESSFUL")
      else console.log("ERROR")

      let user = {
        firstName: response.data.firstName, 
        lastName: response.data.lastName,
        fullName: response.data.fullName, 
        phoneNumber: response.data.phoneNumber, 
        QRCode: response.data.QRCode, 
        balance: response.data.balance, 
        cards: response.data.cards, 
        privacyPreferences: response.data.privacyPreferences, 
        contacts: response.data.contacts, 
        profilePicture: response.data.profilePicture
      }
      dispatch(setSelf(user));
    } catch(error) {
      console.error(error)
    }
  }
}

export const fetchTransactionsById = userId => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get("/profile/retrieve_user_transactions", {
        params: {
          userId: userId,
        },
      });
      if (response.status == 200) console.log("SUCCESSFUL")
      else console.log("ERROR")

      dispatch(setTransactions(response.data));

    } catch(error) {
      console.error(error)
    }
  }
}

export const { logInOut, setSelf, setTransactions } = selfSlice.actions;

export const selectSelf = (state) => state.self.self;
export const selectBalance = (state) => state.self.self.balance;
export const selectCards = (state) => state.self.self.cards;
export const selectContacts = (state) => state.self.self.contacts;
export const selectTransactions = (state) => state.self.self.transactions;

export default selfSlice.reducer;
