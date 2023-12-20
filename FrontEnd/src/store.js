import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./redux/api/signUpSlice";
import phoneVerificationReducer from "./redux/api/phoneVerificationSlice";
import { apiSlice } from "./redux/api/apiIndexSlice";
//import { devToolsEnhancer } from "@redux-devtools/remote"

export const createStoreWithPreloadedState = (preloadedState) =>
  configureStore({
    reducer: {
      // self: selfReducer,
      signUp: signUpReducer,
      phoneVerification: phoneVerificationReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState: preloadedState,
    devTools: true,
    enhancers: [
      // devToolsEnhancer({
      //   name: Platform.OS,
      //   port: 8000,
      //   secure: false,
      //   realtime: true,
      // }),
    ]
  });