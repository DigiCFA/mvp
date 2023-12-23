/*
OBSOLETE
*/
// import { createSlice } from "@reduxjs/toolkit";
// import * as apiUtil from "../../utils/api";

// const nullSession = {
//   userId: null,
//   duringLogin: false,
//   duringLogout: false
// };

// const sessionSlice = createSlice({
//   name: "session",
//   initialState: nullSession,
//   reducers: {
//     beginLogin: (state, action) => {
//       state.duringLogin = true;
//     },
//     beginLogout: (state, action) => {
//       state.duringLogout = true;
//     },
//     receiveCurrentUser: (state, action) => {
//       state.userId = action.payload.userId;
//       state.duringLogin = false;
//       return state;
//     },
//     logoutCurrentUser: (state, action) => {
//       state.userId = null;
//       state.duringLogout = false;
//       return state;
//     },
//   },
// });

// export const { beginLogin, beginLogout, receiveCurrentUser, logoutCurrentUser } =
//   sessionSlice.actions;

// export default sessionSlice.reducer;

// export const login = (user) => async (dispatch) => {
//   console.log("INITIATING LOGIN");
//   dispatch(beginLogin());

//   const response = await apiUtil.login(user);
//   const data = response.data;

//   if (response.status === 200) {
//     console.log("SUCCESSFULLY LOGGED IN");
//     return dispatch(receiveCurrentUser(data));
//   } else console.log("ERROR LOGGING IN");
// };

// export const signup = (user) => async (dispatch) => {
//   const response = await apiUtil.signup(user);
//   const data = response.data;

//   if (response.status === 200) {
//     console.log("SUCCESSFULLY SIGNED UP");
//     return dispatch(receiveCurrentUser(data));
//   } else console.log("ERROR SIGNING UP");
// };

// export const getSession = () => async (dispatch) => {
//   const response = await apiUtil.getSession();
//   const data = response.data;

//   if (response.status === 200) {
//     return dispatch(receiveCurrentUser(data));
//   }
// };

// export const logout = () => async (dispatch) => {
//   dispatch(beginLogout());
//   const response = await apiUtil.logout();
//   const data = response.data;

//   if (response.status === 200) {
//     console.log("SUCCESSFULLY LOGGED OUT");
//     return dispatch(logoutCurrentUser());
//   } else console.log("ERROR LOGGING OUT");
// };

// export const whetherDuringLogin = (state) => state.session.duringLogin;
// export const whetherDuringLogout = (state) => state.session.duringLogout;
