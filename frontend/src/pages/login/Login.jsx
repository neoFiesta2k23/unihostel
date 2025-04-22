import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaBuilding, FaUser, FaLock } from "react-icons/fa";

import axiosInstance from "../../utils/axiosInstance.js";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";
import toast from "react-hot-toast";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeHandle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", form);

      toast.success("Login Successful!");

      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("loggedIn", true);

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Login failed. Please try again."
      );

      console.error(err?.response?.data);
      setError(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="login-body">
        <div className="login-container">
          <div className="back-button-container" onClick={() => navigate("/")}>
            <FaBuilding className="login-icon" />
            <h4>UniHostel</h4>
          </div>
          <div className="login-header">
            <div className="login-logo">
              <h1 className="login-title">Login</h1>
            </div>
            <h2 className="login-welcome">Welcome Back!</h2>
            <p className="login-subtitle">
              Login to access your UniHostel dashboard.
            </p>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-input-box">
                <label htmlFor="Email" className="login-label">
                  Email
                </label>
                <input
                  value={form.email}
                  onChange={onChangeHandle}
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  required
                  className="login-input"
                />
                <FaUser className="login-input-icon" />
              </div>
              <div className="login-input-box">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <input
                  value={form.password}
                  onChange={onChangeHandle}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="login-input"
                />
                <FaLock className="login-input-icon" />
              </div>
              <div className="login-remember">
                <input
                  value={form.remember}
                  onChange={onChangeHandle}
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="login-checkbox"
                  checked
                />

                <label className="login-remember-label">Remember me</label>

                {/* <Link to='/forgot-password' className="login-forgot-password">Forget Password?</Link> */}
              </div>
              <button
                type="submit"
                className="login-submit-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="login-signup">
              Don't have an account?
              <Link to="/Signup" className="login-signup-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
