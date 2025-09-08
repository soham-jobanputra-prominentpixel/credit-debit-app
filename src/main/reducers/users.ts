import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { dispatch, getState, type RootState } from "../store.ts";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
  aadhaar: string;
  account: string;
  balance: number;
  joinedAt: string;
  lastLogin: string | null;
}

type UserUpdate = Pick<User, "firstName" | "lastName" | "email">;

type UserIdentity = Pick<User, "aadhaar">;

type UserSecret = Pick<User, "password">;

type UserRegistrationDetails = UserIdentity & UserSecret & UserUpdate;

const userAdapter = createEntityAdapter({
  selectId: (user: User) => user.aadhaar,
  sortComparer: (a, b) =>
    new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(),
});

const initialState = userAdapter.getInitialState();

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded: {
      reducer: (state, action: PayloadAction<User>) => {
        const existingUser = selectUserByEmail(state, action.payload.email);
        if (!existingUser) {
          userAdapter.addOne(state, action.payload);
        }
      },

      prepare: (userRegistrationDetails: UserRegistrationDetails) => {
        const isLoggedIn = false;
        const isAdmin = false;
        const account = crypto.randomUUID();
        const balance = 0;
        const joinedAt = new Date().toISOString();
        const lastLogin = null;

        return {
          payload: {
            ...userRegistrationDetails,
            isLoggedIn,
            isAdmin,
            account,
            balance,
            joinedAt,
            lastLogin,
          },
        };
      },
    },

    userUpdated: (
      state,
      action: PayloadAction<{ identity: UserIdentity; updates: UserUpdate }>,
    ) => {
      const existingUser = selectUserByEmail(
        state,
        action.payload.updates.email,
      );

      if (!existingUser) {
        userAdapter.updateOne(state, {
          id: action.payload.identity.aadhaar,
          changes: action.payload.updates,
        });
      }
    },

    userDeleted: (state, action: PayloadAction<UserIdentity>) => {
      userAdapter.removeOne(state, action.payload.aadhaar);
    },

    userLoggedIn: (state, action: PayloadAction<UserIdentity>) => {
      const existingUser = selectUserByAadhaar(
        state,
        action.payload.aadhaar,
      );

      if (existingUser) {
        userAdapter.updateOne(state, {
          id: action.payload.aadhaar,
          changes: {
            isLoggedIn: true,
            lastLogin: new Date().toISOString(),
          },
        });
      }
    },

    userLoggedOut: (state, action: PayloadAction<UserIdentity>) => {
      const existingUser = selectUserByAadhaar(
        state,
        action.payload.aadhaar,
      );

      if (existingUser) {
        userAdapter.updateOne(state, {
          id: action.payload.aadhaar,
          changes: {
            isLoggedIn: false,
          },
        });
      }
    },

    userPromoted: (state, action: PayloadAction<UserIdentity>) => {
      const existingUser = selectUserByAadhaar(
        state,
        action.payload.aadhaar,
      );

      if (existingUser) {
        userAdapter.updateOne(state, {
          id: action.payload.aadhaar,
          changes: {
            isAdmin: true,
          },
        });
      }
    },

    userDemoted: (state, action: PayloadAction<UserIdentity>) => {
      const existingUser = selectUserByAadhaar(
        state,
        action.payload.aadhaar,
      );

      if (existingUser) {
        userAdapter.updateOne(state, {
          id: action.payload.aadhaar,
          changes: {
            isAdmin: false,
          },
        });
      }
    },
  },

  selectors: {
    selectUserByEmail: (state, email: string) =>
      selectAllUsers(state).find((user) => user.email === email),

    selectUserByAccount: (state, account: string) =>
      selectAllUsers(state).find((user) => user.account === account),

    selectUserByAadhaar: (state, aadhaar: string) =>
      selectAllUsers(state).find((user) => user.aadhaar === aadhaar),
  },
});

export const usersReducer = usersSlice.reducer;

export const { selectById: selectUserById, selectAll: selectAllUsers } =
  userAdapter.getSelectors();

export const { selectUserByEmail, selectUserByAccount, selectUserByAadhaar } =
  usersSlice.getSelectors();

export const {
  userAdded,
  userUpdated,
  userDeleted,
  userLoggedIn,
  userLoggedOut,
} = usersSlice.actions;

export const selectCurrentUser = (state: RootState) =>
  selectUserByAadhaar(state.users, state.currentUser);

export function prmoteUser(aadhaar: string) {
  const currentUser = selectCurrentUser(getState());
  if (
    currentUser && currentUser.isAdmin && currentUser.aadhaar !== aadhaar
  ) {
    dispatch(usersSlice.actions.userPromoted({ aadhaar }));
  }
}

export function demoteUser(aadhaar: string) {
  const currentUser = selectCurrentUser(getState());
  if (
    currentUser && currentUser.isAdmin && currentUser.aadhaar !== aadhaar
  ) {
    dispatch(usersSlice.actions.userDemoted({ aadhaar }));
  }
}
