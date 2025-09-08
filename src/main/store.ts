import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./reducers/users.ts";
import { currentUserReducer } from "./reducers/currentUser.ts";
import { transactionsReducer } from "./reducers/transactions.ts";
import { initialData } from "../initialData.ts";

function loadState(): unknown {
  const serializedState = localStorage.getItem("reduxStore");
  if (serializedState === null) {
    localStorage.setItem("reduxStore", JSON.stringify(initialData));
    sessionStorage.setItem("currentUser", initialData.currentUser);
    return initialData;
  }
  const state = JSON.parse(serializedState);
  state.currentUser =
    (sessionStorage.getItem("currentUser") as string | null) ?? "";
  return state;
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
    transactions: transactionsReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(async () => {
  await setTimeout(() => {
    localStorage.setItem("reduxStore", JSON.stringify(store.getState()));
  }, 400);
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
