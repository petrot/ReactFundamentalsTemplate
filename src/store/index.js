import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import coursesSlice from "./slices/coursesSlice";
import authorsSlice from "./slices/authorsSlice";
import thunk from "redux-thunk";

const store = configureStore(
  {
    reducer: {
      user: userSlice,
      courses: coursesSlice,
      authors: authorsSlice,
    },
  },
  applyMiddleware(thunk)
);

export default store;
