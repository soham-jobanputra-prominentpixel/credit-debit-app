import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "../InputField.tsx";
import { Button } from "../ui/button.tsx";
import { CheckboxField } from "../CheckboxField.tsx";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/redux.ts";
import { userAdded } from "../../main/reducers/users.ts";

const SignupSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .matches(
      /^[A-Za-z0-9._%+-]+@prominentpixel\.com$/,
      "Email must end with @prominentpixel.com",
    )
    .required("Email is required"),
  aadhaar: Yup.string()
    .matches(/^\d{12}$/, "Aadhaar number must be exactly 12 digits")
    .required("Aadhaar number is required"),
  password: Yup.string()
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignupForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        aadhaar: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        const { firstName, lastName, email, aadhaar, password } = values;
        dispatch(userAdded(
          {
            firstName,
            lastName,
            email,
            aadhaar,
            password,
          },
        ));
        navigate('/login')
      }}
    >
      <Form className="space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-semibold">Sign Up</h2>

        <div className="flex flex-between gap-5">
          <InputField
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
          />
          <InputField
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
          />
        </div>
        <InputField
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
        <InputField
          name="aadhaar"
          label="Aadhaar Number"
          placeholder="12-digit Aadhaar number"
        />

        <div className="flex flex-between gap-5">
          <InputField
            name="password"
            type="password"
            label="Password"
            placeholder="Enter password"
          />
          <InputField
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Re-enter password"
          />
        </div>

        <CheckboxField
          name="policyAgreement"
          label="Agree Terms and Policies"
        />

        <Button type="submit" className="w-full hover:cursor-pointer">
          Sign Up
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Formik>
  );
}
