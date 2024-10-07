import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice"; // Import the slice reducer
import noteSlice from "./noteSlice";
const store = configureStore({
  reducer: {
    home: homeSlice, // Add the layout slice reducer to the store
    notes: noteSlice,
  },
});

export default store;
