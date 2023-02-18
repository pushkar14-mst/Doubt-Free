import { configureStore } from "@reduxjs/toolkit";
import doubtsSlice from "./doubts-store";

const store = configureStore({
  reducer: {
    doubts: doubtsSlice.reducer,
  },
});

export default store;
