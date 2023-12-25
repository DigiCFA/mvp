import { createSlice } from "@reduxjs/toolkit";
import * as Linking from "expo-linking";
import { apiSlice } from "../api/apiIndexSlice";

const initialState = {
  qrCodeLink: "",
};

const qrCodeSlice = createSlice({
  name: "qrCode",
  initialState,

  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     apiSlice.endpoints.login.matchFulfilled,
  //     (state, action) => {
  //       const { userId, userName } = action.payload;
  //       const first = userName.split(" ")[0];
  //       const last = userName.split(" ")[1];
  //       const link = Linking.createURL("/pay/user/", {
  //         queryParams: {
  //           user: userId,
  //           name: first + "_" + last,
  //         },
  //       });
  //       console.log("Generating QR Link");
  //       console.log(link);
  //       state.qrCodeLink = link;
  //     }
  //   );
  // },
});

export const selectQRCodeLink = (state) => state.qrCode.qrCodeLink;
export default qrCodeSlice.reducer;
