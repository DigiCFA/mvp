import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchProfilePic, fetchTransactions, fetchUser, profilePicBaseURL } from "../api/api.js";

// const storeImageData = (image) => {
//   return {
//     type: 'STORE_IMAGE_DATA',
//     payload: image,
//   }
// }



// Maybe write a thunk to fetch user info. In which case user info is passed during login, in which case initialState should be null
const initialState = {
  self: {
    _id: "001",
    firstName: "Default",
    lastName: "User",
    fullName: "Default User",
    phoneNumber: "+1 123 456 7890",
    // password: "johnsmith",
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
    profilePicture: profilePicBaseURL + "default.png",
    currentAddress: {
      lineOne: "Not set",
      lineTwo: "",
      city: "",
      zipCode: "",
    },
    transactions: [
      {
        _id: "64cef2e74a0615d28fc4b58a",
        amountTransferred: 0.04,
        sender: {
          _id: "64c66df647cc118b6eba8b26",
          fullName: "Henry Liu",
        },
        receiver: {
          _id: "64c673c724782ec4c7fb2d8f",
          fullName: "Edmond Wang",
        },
        transactionDate: "2023-08-06T01:09:59.848Z",
        isPayment: true,
        message: "Henry sends to Edmond",
        isFulfilled: true,
      },
    ],
    // Not necessary to fetch too much else at login (Eager Loading)
  },
};

export const selfSlice = createSlice({
  name: "self",
  initialState,
  reducers: {
    setSelf: (state, action) => {
      // state.self = action.payload;
      let newSelf = action.payload;
      // console.log("Newself: ", newSelf);
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
      state.self.profilePicture = profilePicBaseURL + newSelf.profilePicture;
    },
    setTransactions: (state, action) => {
      state.self.transactions = action.payload;
    },
    setProfilePic: (state, action) => {
      console.log("New profile pic: ", action.payload);
      state.self.profilePicture = action.payload;
    },
  },
});

// Thunk Action creator
export const fetchUserById = (userId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetchUser(userId);
      // const response = await axios.get("/profile/retrieve_user", {
      //   params: {
      //     userId: userId,
      //   },
      // });
      if (response.status == 200) console.log("SUCCESSFULLY RETRIEVED USER");
      else console.log("ERROR RETRIEVING USER");

      let user = {
        _id: response.data._id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        fullName: response.data.fullName,
        phoneNumber: response.data.phoneNumber,
        QRCode: response.data.QRCode,
        balance: response.data.balance,
        cards: response.data.cards,
        privacyPreferences: response.data.privacyPreferences,
        contacts: response.data.contacts,
        profilePicture: response.data.profilePicture,
      };
      dispatch(setSelf(user));
    } catch(error) {
      if (error.response) {
        console.log("The request was made and the server responded with a status code that falls out of the range of 2xx")
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log("The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js")
        console.log(error.request);
      } else {
        console.log("Something happened in setting up the request that triggered an Error")
        console.log('Error', error.message);
      }
      console.log(error.config);
    };
  }
}

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

// OBSOLETE APPROACH

// export const fetchProfilePicById = userId => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await fetchProfilePic(userId);
//       if (response.status == 200) console.log("SUCCESSFULLY RETRIEVED PROFILE PIC")
//       else console.log("ERROR")

//       const image = response.data.toString('base64');
//       dispatch(setProfilePic(storeImageData(image)));

//     } catch(error) {
//       console.error(error)
//     }
//   }
// }

export const fetchProfilePicById = userId => {
  return async (dispatch, getState) => {
    try {
      const response = await fetchUser(userId);
      if (response.status == 200) console.log("SUCCESSFULLY RETRIEVED USER TO UPDATE PROFILE PIC")
      else console.log("ERROR")

      dispatch(setProfilePic(profilePicBaseURL+response.data.profilePicture));

    } catch(error) {
      console.error(error)
    }
  }
}

export const { setSelf, setTransactions, setProfilePic } = selfSlice.actions;

export const selectSelf = (state) => state.self.self;
export const selectId = (state) => state.self.self._id;
export const selectBalance = (state) => state.self.self.balance;
export const selectCards = (state) => state.self.self.cards;
export const selectContacts = (state) => state.self.self.contacts;
export const selectTransactions = (state) => state.self.self.transactions;
export const selectProfilePic = (state) => state.self.self.profilePicture;

export default selfSlice.reducer;
