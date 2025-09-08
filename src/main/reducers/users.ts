import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type AppDispatch, type RootState } from "../store.ts";
import { makeTransaction, transactionAdded } from "./transactions.ts";

export interface User {
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

type UserLogin = Pick<User, "email" | "password">;

type UserIdentity = Pick<User, "aadhaar">;

export type UserAccount = Pick<User, "account">;

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
      const user = selectUserByAadhaar(state, action.payload.identity.aadhaar);

      if (
        (existingUser && user && existingUser.aadhaar === user.aadhaar) ||
        existingUser?.isAdmin
      ) {
        userAdapter.updateOne(state, {
          id: action.payload.identity.aadhaar,
          changes: action.payload.updates,
        });
      }
    },

    userDeleted: (state, action: PayloadAction<UserIdentity>) => {
      userAdapter.removeOne(state, action.payload.aadhaar);
    },

    userLoggedIn: (state, action: PayloadAction<UserLogin>) => {
      const existingUser = selectUserByEmail(state, action.payload.email);

      if (existingUser && existingUser.password === action.payload.password) {
        userAdapter.updateOne(state, {
          id: existingUser.aadhaar,
          changes: {
            isLoggedIn: true,
            lastLogin: new Date().toISOString(),
          },
        });
      }
    },

    userLoggedOut: (state, action: PayloadAction<UserIdentity>) => {
      const existingUser = selectUserByAadhaar(state, action.payload.aadhaar);

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
      const existingUser = selectUserByAadhaar(state, action.payload.aadhaar);

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
      const existingUser = selectUserByAadhaar(state, action.payload.aadhaar);

      if (existingUser) {
        userAdapter.updateOne(state, {
          id: action.payload.aadhaar,
          changes: {
            isAdmin: false,
          },
        });
      }
    },

    userCredited: (
      state,
      action: PayloadAction<{ userId: UserIdentity; amount: number }>,
    ) => {
      const { userId } = action.payload;
      const existingUser = selectUserByAadhaar(state, userId.aadhaar);
      if (existingUser) {
        const { amount } = action.payload;
        userAdapter.updateOne(state, {
          id: userId.aadhaar,
          changes: { balance: existingUser.balance + amount },
        });
      }
    },

    userDebited: (
      state,
      action: PayloadAction<{ userId: UserIdentity; amount: number }>,
    ) => {
      const { userId } = action.payload;
      const existingUser = selectUserByAadhaar(
        state,
        action.payload.userId.aadhaar,
      );
      if (
        (existingUser && existingUser.balance >= action.payload.amount) ||
        (existingUser && !existingUser?.isAdmin)
      ) {
        const { amount } = action.payload;
        userAdapter.updateOne(state, {
          id: userId.aadhaar,
          changes: { balance: existingUser.balance - amount },
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

  extraReducers: (builder) => {
    builder.addCase(transactionAdded, (state, action) => {
      const { from, to } = action.payload;
      const fromUser = selectUserByAccount(state, from.account);
      const toUser = selectUserByAccount(state, to.account);

      if (fromUser && toUser) {
        userAdapter.updateOne(state, {
          id: fromUser.aadhaar,
          changes: { balance: fromUser.balance - action.payload.amount },
        });
        userAdapter.updateOne(state, {
          id: toUser.aadhaar,
          changes: { balance: toUser.balance + action.payload.amount },
        });
      }
    });
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
  selectUserByEmail(state.users, state.currentUser);

export function promoteUser(aadhaar: string) {
  return function (dispatch: AppDispatch, getState: () => RootState) {
    const currentUser = selectCurrentUser(getState());
    if (currentUser && currentUser.isAdmin && currentUser.aadhaar !== aadhaar) {
      dispatch(usersSlice.actions.userPromoted({ aadhaar }));
    }
  };
}

export function demoteUser(aadhaar: string) {
  return function (dispatch: AppDispatch, getState: () => RootState) {
    const currentUser = selectCurrentUser(getState());
    if (currentUser && currentUser.isAdmin && currentUser.aadhaar !== aadhaar) {
      dispatch(usersSlice.actions.userDemoted({ aadhaar }));
    }
  };
}

export function makePayment(account: string, amount: number) {
  return function (dispatch: AppDispatch, getState: () => RootState) {
    const currentUser = selectCurrentUser(getState());
    if (currentUser) {
      dispatch(
        makeTransaction({ account: currentUser.account }, { account }, amount),
      );
    }
  };
}
