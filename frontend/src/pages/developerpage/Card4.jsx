import React from "react";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import "./card4.css";

const Card4 = ({ name, stat, img }) => {
  return (
    <div className="card4">
      <img src={img} alt="nheloadhoraha" className="card4img" />
      <div className="card4name">{name}</div>
      <div className="stat">{stat}</div>
    </div>
  );
};

export default Card4;
