import { configureStore } from "@reduxjs/toolkit";
import selfReducer from "./redux/reducers/selfSlice";
import sessionReducer from "./redux/reducers/sessionSlice";

export const createStoreWithPreloadedState = (preloadedState) =>
  configureStore({
    reducer: {
      self: selfReducer,
      session: sessionReducer,
    },
    preloadedState: preloadedState,
  });
