import { createSlice } from "@reduxjs/toolkit";
import { userLoggedIn, userLoggedOut } from "./users.ts";

const initialState = (sessionStorage.getItem("currentUser") as string | null) ??
  "";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoggedIn, (_state, action) => {
        const { aadhaar } = action.payload;
        sessionStorage.setItem("currentUser", aadhaar);
        return aadhaar;
      })
      .addCase(userLoggedOut, () => {
        sessionStorage.removeItem("currentUser");
        return "";
      });
  },
});

export const currentUserReducer = currentUserSlice.reducer;
