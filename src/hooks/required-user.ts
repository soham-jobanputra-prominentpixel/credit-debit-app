import { selectCurrentUser, type User } from "../main/reducers/users.ts";
import { useAppSelector } from "./redux.ts";

export function useUser(): User {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    throw new Error("Cannot find the user");
  }

  return user;
}
