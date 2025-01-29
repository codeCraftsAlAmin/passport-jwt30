import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const RegisterForm = () => {
  const navigate = useNavigate();

  // yup schema to validate
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters long")
      .required("Password is equired"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // pass values to backend
  const handleSubmit = async (values) => {
    try {
      const res = await axios.post("http://localhost:3000/register", {
        username: values.username,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
      });

      if (res.data) {
        console.log("successfully registered");
        navigate("/");
      }
    } catch (error) {
      console.log("registration failed", error);
      navigate("/register");
    }
  };

  // handle form
  return (
    <div className="register-container">
      <h2>Register</h2>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange, handleBlur }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                required
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && touched.username ? (
                <div className="error-message">{errors.username}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <div className="error-message">{errors.email}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <div className="error-message">{errors.password}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                required
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirm_password && touched.confirm_password ? (
                <div className="error-message">{errors.confirm_password}</div>
              ) : null}
            </div>
            <button type="submit" className="register-btn">
              Register
            </button>
            <div className="login-link">
              Already have an account? <Link to={"/"}>Login</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
