import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Router, Routes, Route } from "react-router-dom";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Pricing from "./pages/pricing/Pricing";
import Home from "./pages/homePage/home";
import Privacy from "./pages/privacy/Privacy";
import Services from "./pages/services/Services";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute, { AdminProtectedRoute } from "./utils/ProtectedRoute";
import { Navigate } from "react-router-dom";
import StudentInfo from "./pages/studentInfo/StudentInfo";
import NotFound from "./pages/notFound/NotFound";
import AdminPanel from "./pages/admin/Admin";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/admin/AdminLogin";
import Developer from "./pages/developerpage/Developer"

const App = () => {
  const isLoggedIn = localStorage.getItem("loggedIn") == "true";
  const adminIsLoggedIn = localStorage.getItem("AdminLoggedIn") == "true";
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
          </>
        )}

        {!adminIsLoggedIn && (
          <>
            <Route path="/admin/login" element={<AdminLogin />} />
          </>
        )}

        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Navigate to="/dashboard" />} />
          <Route path="/signup" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<StudentInfo />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route
            path="/admin/*"
            element={<Navigate to="/faltu-karma/admin" />}
          />
          <Route path="/faltu-karma/admin" element={<AdminPanel />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/developers" element={<Developer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/service" element={<Services />} />
        <Route path="/privacypolicy" element={<Privacy />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
