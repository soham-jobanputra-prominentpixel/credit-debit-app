import { useState } from "react";
import type { User } from "../main/reducers/users.ts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import { Separator } from "./ui/separator.tsx";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router/internal/react-server-client";

interface UserDetailsProps {
  user: User;
}

export function UserDetails({ user }: UserDetailsProps) {
  const [showBalance, setShowBalance] = useState(false);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Never";
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle>
          {user.firstName} {user.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="font-medium">{user.firstName} {user.lastName}</p>
        </div>

        <Separator />
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground">Aadhaar</p>
          <p className="font-medium">{user.aadhaar}</p>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground">Account</p>
          <p className="font-medium">{user.account}</p>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground">Balance</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">
              {showBalance ? `₹ ${user.balance.toLocaleString()}` : "•••••••"}
            </p>
            <button
              type="button"
              onClick={() => setShowBalance(!showBalance)}
              className="p-1 rounded hover:bg-accent"
            >
              {showBalance
                ? <EyeOff className="w-4 h-4" />
                : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground">Joined At</p>
          <p className="font-medium">{formatDate(user.joinedAt)}</p>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground">Last Login</p>
          <p className="font-medium">{formatDate(user.lastLogin)}</p>
          <Link to={`/edit/${user.account}`}>Edit</Link>
        </div>
      </CardContent>
    </Card>
  );
}
