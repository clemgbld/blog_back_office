import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditorInLightMode: true,
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
  },
});
