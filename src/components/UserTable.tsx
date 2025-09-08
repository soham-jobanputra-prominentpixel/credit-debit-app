import { Pencil, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table.tsx";
import { Button } from "./ui/button.tsx";
import type { User } from "../main/reducers/users.ts";

interface UserTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Aadhaar</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Joined At</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0
              ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )
              : (
                users.map((user, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.aadhaar}</TableCell>
                    <TableCell>{user.account}</TableCell>
                    <TableCell>
                      ₹ {user.balance.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {formatDate(user.joinedAt)}
                    </TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit?.(user)}
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete?.(user)}
                      >
                        <Trash className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
