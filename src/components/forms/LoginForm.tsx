import { Form, Formik } from "formik";
import { InputField } from "../InputField.tsx";
import { Button } from "../ui/button.tsx";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/redux.ts";
import { selectCurrentUser, userLoggedIn } from "../../main/reducers/users.ts";
import { useStore } from "react-redux/alternate-renderers";
import type { RootState } from "../../main/store.ts";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const store = useStore<RootState>();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        const { email, password } = values;
        dispatch(userLoggedIn({
          email,
          password,
        }));
        if (selectCurrentUser(store.getState())?.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }}
    >
      <Form className="space-y-4 max-w-sm mx-auto">
        <h2 className="text-xl font-semibold">Login</h2>

        <InputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        <Button type="submit" className="w-full hover:cursor-pointer">
          Login
        </Button>
        <div>
          Don't have an account yet? <Link to="/">Sign up</Link>
        </div>
      </Form>
    </Formik>
  );
}
