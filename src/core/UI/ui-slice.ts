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
  },
});

export const { toggleEditorTheme } = uiSlice.actions;
