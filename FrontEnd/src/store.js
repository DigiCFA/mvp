import { configureStore } from "@reduxjs/toolkit";
import selfReducer from "./redux/reducers/selfSlice";
import sessionReducer from "./redux/reducers/sessionSlice";
import signUpReducer from './redux/reducers/signUpSlice';
import phoneVerificationReducer from './redux/reducers/phoneVerificationSlice'
import { apiSlice } from "./redux/reducers/apiIndexSlice";

export const createStoreWithPreloadedState = (preloadedState) =>
  configureStore({
    reducer: {
      self: selfReducer,
      session: sessionReducer,
      signUp: signUpReducer,
      phoneVerification: phoneVerificationReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    preloadedState: preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
  });
