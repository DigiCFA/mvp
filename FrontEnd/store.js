import { configureStore } from "@reduxjs/toolkit";
import selfReducer from "./features/selfSlice";

export const store =  configureStore({
  reducer: {
    self: selfReducer,
  },
});
