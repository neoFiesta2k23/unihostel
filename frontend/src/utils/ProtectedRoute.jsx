import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  return isLoggedIn=="true" ? <Outlet/> : <Navigate to="/login"/> ;
}

export function AdminProtectedRoute() {
  const isLoggedIn = localStorage.getItem("AdminLoggedIn");
  return isLoggedIn=="true" ? <Outlet/> : <Navigate to="/admin/login"/> ;
}

export default ProtectedRoute;
