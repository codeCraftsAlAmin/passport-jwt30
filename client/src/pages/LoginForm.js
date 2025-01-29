import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState("");

  // yup schema to validate
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters long")
      .required("Password is required"),
  });

  // check if user already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3000/profile", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res);
          navigate("/profile");
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          navigate("/");
        });
    }
  }, []);

  // set token to localStorage
  const handleSubmit = async (values) => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email: values.email,
        password: values.password,
      });
      // console.log(res);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      } else if (res.status === 202) {
        // console.log(res.data);
        setLoginErr(res.data);
      }
    } catch (error) {
      console.log(error);
      // navigate("/");
    }
  };

  // handle login
  return (
    <>
      <h2>Login</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange, handleBlur }) => (
          <Form>
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
            <button type="submit">Login</button>

            {/* login failed message */}
            {loginErr && <div className="error-message">{loginErr}</div>}

            <div className="sign-in-link">
              Don't have an account?
              <Link to={"/register"}> Sign In</Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
