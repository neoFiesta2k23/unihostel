import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { FaBuilding, FaLock } from "react-icons/fa";

import axiosInstance from "../../utils/axiosInstance.js";

import { useEffect } from "react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    password: "",
    remember: true,
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onChangeHandle = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/admin/login", form);

      console.log("Data", res.data);
      setUser(res.user);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("AdminLoggedIn", true);

      navigate("/faltu-karma/admin");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/faltu-karma/admin");
    }
  }, [user, navigate]);

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="login-container">
      <div className="login-header">
        <div className="login-logo">
          <div className="login-logo-icon">
            <FaBuilding className="login-icon" />
          </div>
          <h1 className="login-title">UniHostel</h1>
        </div>
        <h2 className="login-welcome">Welcome Back Admin!</h2>
        <p className="login-subtitle">
          Login to access UniHostel Admin Dashboard
        </p>
        {error && <p style={{ color: "red" }}> {error.message} </p>}
        <form className="login-form" onSubmit={handleSubmit}>
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
          </div>
          <button type="submit" className="login-submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AdminLogin;
