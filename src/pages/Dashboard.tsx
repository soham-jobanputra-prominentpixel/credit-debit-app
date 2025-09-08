import PaymentForm from "../components/forms/PaymentForm.tsx";
import TransactionTable from "../components/TransactionTable.tsx";
import { UserDetails } from "../components/UserDetails.tsx";
import { useUser } from "../hooks/required-user.ts";

function Dashboard() {
  const user = useUser();

  return (
    <>
      <div className="lg:flex justify-between mb-6">
        <UserDetails user={user} />
        <div className="my-6 lg:my-0"></div>
        <PaymentForm />
      </div>
      <TransactionTable />
    </>
  );
}

export default Dashboard;
