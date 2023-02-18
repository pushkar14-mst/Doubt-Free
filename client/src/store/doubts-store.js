import { createSlice } from "@reduxjs/toolkit";

const doubtsSlice = createSlice({
  name: "doubts",
  initialState: {
    name: "",
    doubtTitle: "",
    doubt: "",
    doubtCategory: "",
  },
  reducers: {
    addDoubt(state, action) {
      state.name = action.payload.name;
      state.doubtCategory = action.payload.category;
      state.doubtTitle = action.payload.doubtTitle;
      state.doubt = action.payload.doubt;
      console.log(action.payload);
    },
  },
});

export const doubtsActions = doubtsSlice.actions;
export default doubtsSlice;
