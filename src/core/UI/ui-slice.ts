import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditorInLightMode: true,
  searchTerms: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleEditorTheme: (state) => {
      state.isEditorInLightMode = !state.isEditorInLightMode;
    },
    setTheme: (state, action) => {
      state.isEditorInLightMode = action.payload;
    },
    updateSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
  },
});
