import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { Button } from "./ui/button.tsx";
import { cn } from "./ui/lib/utils.ts";
import { selectCurrentUser, userLoggedOut } from "../main/reducers/users.ts";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/10",
        "bg-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-black/20",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <h1
          className={cn(
            "text-2xl font-bold text-white",
            "flex-1 text-center md:text-left",
          )}
        >
          {user && user.isAdmin
            ? <Link to="/admin" style={{textDecoration: "none", color: "white"}}>Credit Debit App</Link>
            : ""}
          {user && !user.isAdmin
            ? <Link to="/dashboard" style={{textDecoration: "none", color: "white"}}>Credit Debit App</Link>
            : ""}
        </h1>

        {user === undefined ? "" : (
          <div>
            {user.isAdmin
              ? <Link to="/users" className="pr-3">Manage Users</Link>
              : ""}

            <Button
              className="bg-red-700 text-white hover:cursor-pointer hover:bg-red-500"
              onClick={() => {
                dispatch(userLoggedOut({ aadhaar: user.aadhaar }));
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
