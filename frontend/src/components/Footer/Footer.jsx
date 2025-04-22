import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

import React from "react";
import "./Footer.css";
import logo from "../assets/images/Logo.png";
import toast from "react-hot-toast";

const Footer = () => {
  return (
    <div className="footer">
      <div className="Hostel">
        <img src={logo} alt="image" className="logo" />
        <p>UniHostel</p>
      </div>
      <div className="social">
        <a href="#" onClick={(e) => {e.preventDefault(); toast("We are anti social", {icon:"🙏"})}}>
          <FaFacebook />
        </a>
        <a href="#" onClick={(e) => {e.preventDefault(); toast("We are anti social", {icon:"🙏"})}}>
          <FaInstagramSquare />
        </a>
        <a href="#" onClick={(e) => {e.preventDefault(); toast("We are anti social", {icon:"🙏"})}}>
          <FaLinkedin />
        </a>
        <a href="#" onClick={(e) => {e.preventDefault(); toast("We are anti social", {icon:"🙏"})}}>
          <FaTwitterSquare />
        </a>
      </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          {/* <li><Link to="/contact">Contact</Link></li> */}
          <li>
            <Link to="/service">Terms of Service</Link>
          </li>
          <li>
            <Link to="/privacyPolicy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/contact">Help Center</Link>
          </li>
        </ul>
      </div>
      <hr className="line" />
      <div className="">From late-night coffees ☕to final commits ✅—Team [Access Denied] made this for you.</div>
    </div>
  );
};

export default Footer;
