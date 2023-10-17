import { configureStore } from "@reduxjs/toolkit";
import selfReducer from "./redux/api/selfSlice";
import signUpReducer from "./redux/api/signUpSlice";
import phoneVerificationReducer from "./redux/api/phoneVerificationSlice";
import { apiSlice } from "./redux/api/apiIndexSlice";

export const createStoreWithPreloadedState = (preloadedState) =>
  configureStore({
    reducer: {
      self: selfReducer,
      signUp: signUpReducer,
      phoneVerification: phoneVerificationReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    preloadedState: preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
