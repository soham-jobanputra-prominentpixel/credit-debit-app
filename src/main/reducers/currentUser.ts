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
        const { email } = action.payload;
        sessionStorage.setItem("currentUser", email);
        return email;
      })
      .addCase(userLoggedOut, () => {
        sessionStorage.removeItem("currentUser");
        return "";
      });
  },
});

export const currentUserReducer = currentUserSlice.reducer;
