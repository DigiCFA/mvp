import { configureStore } from "@reduxjs/toolkit";
import selfReducer from "./redux/reducers/selfSlice";
import signUpReducer from './redux/reducers/signUpSlice';
import phoneVerificationReducer from './redux/reducers/phoneVerificationSlice'
import { apiSlice } from "./redux/reducers/apiIndexSlice";

export const createStoreWithPreloadedState = (preloadedState) =>
  configureStore({
    reducer: {
      self: selfReducer,
      signUp: signUpReducer,
      phoneVerification: phoneVerificationReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    preloadedState: preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
  });