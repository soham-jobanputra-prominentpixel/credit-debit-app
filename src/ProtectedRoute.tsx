import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "./hooks/redux.ts";
import { selectCurrentUser } from "./main/reducers/users.ts";

type ProtectedRouteProps = {
  forAdmin?: boolean;
};

function ProtectedRoute({ forAdmin = false }: ProtectedRouteProps) {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="login" replace />;
  }

  if (forAdmin && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
