import React, { useState } from "react";
import { Form, Link } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { FaArrowLeft } from "react-icons/fa";
// import toast from "react-hot-toast";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [form, setForm] = useState({
    name: "",
    enrollment: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeHandle = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(form.password)) {
      setError({ message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character." });
      toast.error("Weak password. Use uppercase, lowercase, number & special char.");
      setLoading(false);
      return;
    }

    if (form.confirmPassword !== form.password) {
      setError({ message: "Password didn't match!" });
      toast.error("Password didn't match!");
      setLoading(false);
      return;
    }

    

    try {
      const res = await axiosInstance.post("/auth/register", form);
      toast.success("Signup Successful");
      setUser(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("loggedIn", true);

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
      console.error(err);
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="back-button-container" onClick={() => navigate("/")}>
        <FaBuilding className="login-icon" />
        <h4>UniHostel</h4>
      </div>
      <div className="signup-container">
        <div className="signup-header">
          <div className="signup-logo">
            <h1 className="signup-title">Sign Up</h1>
          </div>
          <h2 className="signup-welcome">Join UniHostel</h2>
          <p className="signup-subtitle">Create your account to get started.</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-input-group">
              <label htmlFor="name" className="signup-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={onChangeHandle}
                placeholder="Enter your full name"
                required
                pattern="^[A-Za-z\s]+$"
                className="signup-input"
              />
            </div>
            <div className="signup-input-group">
              <label htmlFor="enrollment" className="signup-label">
                Enrollment Number
              </label>
              <input
                type="text"
                id="enrollment"
                name="enrollment"
                value={form.enrollment}
                onChange={onChangeHandle}
                placeholder="Enter enrollment number"
                required
                className="signup-input"
              />
            </div>
            <div className="signup-input-group">
              <label htmlFor="email" className="signup-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={onChangeHandle}
                placeholder="Enter your email"
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Enter a valid email address (e.g., example@domain.com)"
                required
                className="signup-input"
              />
            </div>
            <div className="signup-input-group">
              <label htmlFor="password" className="signup-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={onChangeHandle}
                placeholder="Enter password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                min={8}
                max={20}
                title="Password must be at least 8 characters long and include at least one special character."
                required
                className="signup-input"
              />
            </div>
            <div className="signup-input-group">
              <label htmlFor="confirmPassword" className="signup-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onChangeHandle}
                placeholder="Confirm password"
                min={8}
                max={20}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                title="Password must be at least 8 characters long and include at least one special character."
                required
                className="signup-input"
              />
            </div>
            <div className="signup-terms">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={form.terms}
                onChange={onChangeHandle}
                className="signup-checkbox"
                required
              />
              <label htmlFor="terms" className="signup-terms-label">
                I agree to the{" "}
                <Link to="/privacypolicy" className="signup-link">
                  Terms & Conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="signup-submit-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
            <div className="signup-login-link">
              Already have an account?{" "}
              <Link to="/login" className="signup-link">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
