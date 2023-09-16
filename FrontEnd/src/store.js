import { configureStore } from "@reduxjs/toolkit";
import selfReducer from "./redux/reducers/selfSlice";
import sessionReducer from "./redux/reducers/sessionSlice";
import signUpReducer from './redux/reducers/signUpSlice'

export const createStoreWithPreloadedState = (preloadedState) =>
  configureStore({
    reducer: {
      self: selfReducer,
      session: sessionReducer,
      signUp: signUpReducer
    },
    preloadedState: preloadedState,
  });
