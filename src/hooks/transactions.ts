import { selectAllTransactions } from "../main/reducers/transactions.ts";
import { useAppSelector } from "./redux.ts";
import { useUser } from "./required-user.ts";

export default function useTransactions() {
  const user = useUser();
  const transactions = useAppSelector(selectAllTransactions);

  if (user.isAdmin) {
    return transactions;
  } else {
    return transactions.filter((transaction) => {
      return user.account === transaction.from.account ||
        user.account === transaction.to.account;
    });
  }
}
