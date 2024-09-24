

import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../hooks";
import InputField from "../components/forms/InputField";
import { handleError } from "../helpers";
import { PATH } from "../constants/path";
import { postLogin } from "../store/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLoginSubmit = async (values: any, setSubmitting: any) => {
    try {
      const result = await dispatch(postLogin(values));
  
      if (postLogin.rejected.match(result)) {
        // Handle error state if the login API call was rejected
        handleError(result.payload || 'Login failed');
        setSubmitting(false);
      } else {
        navigate(PATH.home); // Redirect to the homepage or dashboard
        setSubmitting(false);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Login failed:', error);
      handleError('An unexpected error occurred');
      setSubmitting(false);
    }
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
          Log in to Reacher
        </h2>

        <p className="text-center px-16">
          Enter your email to sign into the Reacher App
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleLoginSubmit(values, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white rounded px-16 pt-6 mb-2 w-full">
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
                  Sign In
                </button>
              </div>

              {/* <div className="mb-4">
                <button
                  type="button"
                  className="w-full bg-gray-100 hover:bg-gray-300 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                >
                  Forgot Password
                </button>
              </div> */}
            </Form>
          )}
        </Formik>

        <p className="text-center text-gray-500 px-16 mb-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gray-800 hover:text-blue-800">
          Sign up
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

export default Login;