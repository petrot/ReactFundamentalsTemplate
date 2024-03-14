import { createSlice } from "@reduxjs/toolkit";

export const initialUserState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token"),
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserData: (state, { payload }) => payload,
    removeUserData: () => initialUserState,
  },
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
