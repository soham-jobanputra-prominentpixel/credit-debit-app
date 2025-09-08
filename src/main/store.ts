import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./reducers/users.ts";
import { currentUserReducer } from "./reducers/currentUser.ts";

function loadState(): unknown {
  const serializedState = localStorage.getItem("reduxStore");
  if (serializedState === null) {
    return;
  }
  return JSON.parse(serializedState);
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
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

export const getState = store.getState
export const dispatch = store.dispatch