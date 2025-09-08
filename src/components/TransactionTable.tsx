import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import useTransactions from "../hooks/transactions.ts";

export default function TransactionTable() {
  const transactions = useTransactions();

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0
              ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              )
              : (
                transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {transaction.from.account}
                    </TableCell>
                    <TableCell>
                      {transaction.to.account}
                    </TableCell>
                    <TableCell>
                      ₹ {transaction.amount
                        .toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {formatDate(transaction.timestamp)}
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
