import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "../InputField.tsx";
import { Button } from "../ui/button.tsx";

interface EditUserFormProps {
  initialValues: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onSubmit: (
    values: { firstName: string; lastName: string; email: string },
  ) => void;
}

export default function EditUserForm(
  { initialValues, onSubmit }: EditUserFormProps,
) {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Must be at least 2 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      <Form className="space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-semibold">Edit User</h2>

        <InputField
          name="firstName"
          label="First Name"
          placeholder="Enter first name"
          type="text"
        />

        <InputField
          name="lastName"
          label="Last Name"
          placeholder="Enter last name"
          type="text"
        />

        <InputField
          name="email"
          label="Email"
          placeholder="Enter email address"
          type="email"
        />

        <Button type="submit" className="w-full hover:cursor-pointer">
          Save Changes
        </Button>
      </Form>
    </Formik>
  );
}
