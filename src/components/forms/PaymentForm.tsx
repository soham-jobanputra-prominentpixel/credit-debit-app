import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button.tsx";
import { InputField } from "../InputField.tsx";
import { useUser } from "../../hooks/required-user.ts";
import { makePayment } from "../../main/reducers/users.ts";
import { useAppDispatch } from "../../hooks/redux.ts";

export default function PaymentForm() {
  const user = useUser();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    account: Yup.string()
      .required("Account number is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be greater than 0")
      .max(
        user.isAdmin ? Number.MAX_SAFE_INTEGER : user.balance,
        `Amount cannot exceed ₹${user.balance.toLocaleString()}`,
      ),
  });

  return (
    <Formik
      initialValues={{ account: "", amount: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(makePayment(values.account, Number(values.amount)));
        resetForm();
      }}
    >
      <Form className="space-y-4 mx-auto bg-secondary p-5 rounded-2xl h-fit">
        <h2 className="text-xl font-semibold">Make Payment</h2>

        <InputField
          name="account"
          label="Account Number"
          placeholder="Enter recipient account number"
          type="text"
        />

        <InputField
          name="amount"
          label="Amount"
          placeholder="Enter amount"
          type="number"
        />

        <Button type="submit" className="w-full hover:cursor-pointer">
          Pay Now
        </Button>
      </Form>
    </Formik>
  );
}
