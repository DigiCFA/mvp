import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./redux/client/signUpSlice";
import phoneVerificationReducer from "./redux/client/phoneVerificationSlice";
import qrCodeReducer from "./redux/client/qrCodeSlice";
import { apiSlice } from "./redux/api/apiIndexSlice";
//import { devToolsEnhancer } from "@redux-devtools/remote"

export const createStoreWithPreloadedState = (preloadedState) =>
  configureStore({
    reducer: {
      signUp: signUpReducer,
      phoneVerification: phoneVerificationReducer,
      qrCode: qrCodeReducer,
      // Adding the generated set of reducers as a specific top-level slice
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState: preloadedState,
    devTools: true,
    enhancers: [
      // devToolsEnhancer({
      //   name: Platform.OS,
      //   port: 8000,
      //   secure: false,
      //   realtime: true,
      // }),
    ],
  });

// Optional but required for refetchOnFocus/refetchOnReconnect
// setupListeners(store.dispatch)
