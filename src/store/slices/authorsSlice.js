import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    setAuthors: (_, { payload }) => {
      return payload;
    },
    saveAuthor: (state, { payload }) => {
      return [...state, payload];
    },
  },
});

// use these actions in your components / thunks
export const { setAuthors, saveAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
