import {
  createEntityAdapter,
  createSlice,
  nanoid,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { selectUserByAccount, type UserAccount } from "./users.ts";
import type { AppDispatch, RootState } from "../store.ts";

export interface Transaction {
  id: string;
  from: UserAccount;
  to: UserAccount;
  amount: number;
  timestamp: string;
}

const transactionAdapter = createEntityAdapter<Transaction>({
  sortComparer: (a, b) =>
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
});

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: transactionAdapter.getInitialState(),
  reducers: {
    transactionAdded: {
      reducer: (state, action: PayloadAction<Transaction>) => {
        transactionAdapter.addOne(state, action.payload);
      },
      prepare: (from: UserAccount, to: UserAccount, amount: number) => {
        return {
          payload: {
            id: nanoid(),
            from,
            to,
            amount,
            timestamp: new Date().toISOString(),
          },
        };
      },
    },
  },
});

export const {
  selectAll: selectAllTransactions,
  selectById: selectTransactionById,
} = transactionAdapter.getSelectors((state: RootState) => state.transactions);

export const transactionsReducer = transactionsSlice.reducer;

export const { transactionAdded } = transactionsSlice.actions;

export function makeTransaction(
  from: UserAccount,
  to: UserAccount,
  amount: number,
) {
  return function (dispatch: AppDispatch, getState: () => RootState) {
    const fromUser = selectUserByAccount(getState().users, from.account);
    if (fromUser && (fromUser.balance >= amount || fromUser.isAdmin)) {
      const toUser = selectUserByAccount(getState().users, to.account);
      if (toUser) {
        dispatch(
          transactionAdded(
            { account: fromUser.account },
            { account: toUser.account },
            amount,
          ),
        );
      }
    }
  };
}
