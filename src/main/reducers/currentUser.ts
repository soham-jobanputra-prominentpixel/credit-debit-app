import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: (sessionStorage.getItem("currentUser") as string) ?? "",
  reducers: {},
});

export const currentUserReducer = currentUserSlice.reducer;
