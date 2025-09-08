import { useNavigate } from "react-router/internal/react-server-client";
import { UserTable } from "../components/UserTable.tsx";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import {
  selectAllUsers,
  type User,
  userDeleted,
} from "../main/reducers/users.ts";

function UsersPage() {
  const users = useAppSelector((state) => selectAllUsers(state.users));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleDeleteUser(user: User) {
    const { aadhaar } = user;
    dispatch(userDeleted({ aadhaar }));
  }

  function handleEditUser(user: User) {
    navigate(`/edit/${user.account}`);
  }

  return (
    <UserTable
      users={users}
      onDelete={handleDeleteUser}
      onEdit={handleEditUser}
    />
  );
}

export default UsersPage;
