import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Page from "../layouts/Page";
import "../assets/scss/pages/SignInPage.scss";

const SignInPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoggedIn } = useSelector((state) => state.auth);

  const handleChange = ({ target: { id, value, type, checked } }) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = await dispatch(loginUser(formData));
    if (action.payload?.token) {
      if (formData.rememberMe) {
        localStorage.setItem("token", action.payload.token);
      } else {
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/user");
  }, [isLoggedIn, navigate]);

  return (
    <Page>
      <section className="sign-in-content" aria-labelledby="sign-in-title">
        <i className="fa fa-user-circle sign-in-icon" aria-hidden="true"></i>
        <h1 id="sign-in-title">Sign In</h1>
        <form onSubmit={handleSubmit} aria-describedby={error ? "error-message" : undefined}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email address"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-label="Password"
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              aria-label="Remember me checkbox"
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" aria-label="Sign In">
            Sign In
          </button>
          {error && (
            <p id="error-message" role="alert" style={{ color: "red" }}>
              {error}
            </p>
          )}
        </form>
      </section>
    </Page>
  );
};

export default SignInPage;
