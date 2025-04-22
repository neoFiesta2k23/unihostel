import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import React, { useEffect, useState } from "react";
import Button from "../buttons/button";
import Logo from "../assets/images/Logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="hostel">
        <img src={Logo} alt="logo" className="logo" />
        <p>UniHostel</p>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} color="#004080" /> : <FaBars size={24} color="#004080" />}
      </div>

      <div className={`nav-content ${menuOpen ? "active" : ""}`}>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "active-link" : ""}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "active-link" : ""}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/pricing" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "active-link" : ""}>
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "active-link" : ""}>
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="nav-btns">
          {userLoggedIn ? (
            <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
              <Button id="dashboard" name="Dashboard" />
            </NavLink>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button id="login" name="Login" />
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button id="signup" name="SignUp" />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
