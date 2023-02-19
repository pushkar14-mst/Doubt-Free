import { configureStore } from "@reduxjs/toolkit";
import doubtsSlice, { commentsSlice } from "./doubts-store";

const store = configureStore({
  reducer: {
    doubts: doubtsSlice.reducer,
    comments: commentsSlice.reducer,
  },
});

export default store;
