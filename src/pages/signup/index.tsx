

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../components/forms/InputField";
import { useAppDispatch } from "../hooks";
import { postRegisterCustomer } from "../store/customer";
import { postLogin } from "../store/auth";
import { handleError } from "../helpers";
import { PATH } from "../constants/path";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: any, setSubmitting: any) => {
    const result = await dispatch(
      postRegisterCustomer({
        ...values,
      })
    );

    if (postRegisterCustomer.rejected.match(result)) {
      handleError(result.payload); // ToDo Change Error message in such cases!
      setSubmitting(false);
      return;
    }

    if (!result.payload.data) {
      toast.error("Something went wrong");
    } else {
      // Registration successful, attempt to Login the user with same credentials used on signup
      const loginResult = await dispatch(postLogin({
        email: values.email,
        password: values.password,
      }));
      if (postLogin.rejected.match(loginResult)) {
        handleError(loginResult.payload);
        toast.error("Registration successful, but login failed. Please try logging in.");
        navigate(PATH.auth.login);
      } else {
        navigate(PATH.home);
        toast.success("Registration and login successful!");
      }
    }

    setSubmitting(false);
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-r">
      <div className="flex flex-col items-center justify-center rounded-3xl bg-white authentication-form-container">
        <div className="p-4 flex justify-center items-center">
        <img
          src="/reacher_logo.svg"
          alt="Reacher Logo"
          width="150"
          height="50"
        />
        </div>

        <h2 className="text-center px-16 text-2xl font-semibold mb-2">
          Sign up to Reacher
        </h2>

        <p className="text-center px-16">
          Enter your info to sign up to the Reacher App
        </p>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white rounded px-16 pt-6 mb-2 w-full">
              <InputField label="Name" type="text" placeholder="Name" name="name" />
              <InputField
                label="Email"
                type="email"
                placeholder="email@domain.com"
                name="email"
              />
              <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
              />

              <div className="mb-4">
                <button
                  className="w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign up
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="text-center text-gray-500 px-16 mb-4">
          Already a member?{" "}
          <Link to="/login" className="text-gray-800 hover:text-blue-800">
            Login
          </Link>
        </p>

        <p className="text-center text-gray-500 px-16">
          By signing in, you agree to our{" "}
          <a className="text-gray-800 hover:text-blue-800" href="#">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="text-gray-800 hover:text-blue-800" href="#">
            Privacy Policy
          </a>
        </p>
      </div>
    </main>
  );
};

export default Register;
