import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   layoutType: "grid",
//   selectedTab: "Notes",
//   searchQuery: "",
// };

const homeSlice = createSlice({
  name: "home",
  initialState:{
    layoutType: "grid",
    selectedTab: "Notes",
    searchQuery: "",
  },
  reducers: {
    setLayoutType: (state, action) => {
      state.layoutType = action.payload;
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

// Export actions
export const { setLayoutType, setSelectedTab, setSearchQuery } =
  homeSlice.actions;

// Export reducer to be added to the store
export default homeSlice.reducer;
