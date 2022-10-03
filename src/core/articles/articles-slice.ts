import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  data: [],
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
});
