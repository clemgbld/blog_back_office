import { createSlice } from "@reduxjs/toolkit";

export const SEARCH_TERMS_STATE = {
  ARTICLES: "searchTerms",
  EMAILS: "emailsSearchTerms",
};

export const initialState = {
  isEditorInLightMode: true,
  searchTerms: "",
  emailsSearchTerms: "",
};

type SearchTermsEnums = "searchTerms" | "emailsSearchTerms";

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
      state[action.payload.type as SearchTermsEnums] =
        action.payload.searchTerms;
    },
  },
});
