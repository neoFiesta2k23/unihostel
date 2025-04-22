import React from "react";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import "./developer.css";
import Muskan from "./muskan.jpg";
import Jayantika from "./jayantika.jpg";
import Prince from "./prince.jpg";
import Pavan from "./pavan.jpg";
import Abhishek from "./abhishek.png";
import logo from "./Logo.png";
import Card4 from "./Card4";
import { Link } from "react-router-dom";

// ✅ Import DotLottieReact
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Developer = () => {
  const card4 = [
    {
      name: "Abhishek Kumar",
      stat: "“This project has so much potential — we’re building something that can genuinely help people!",
      image: Abhishek,
    },
    {
      name: "Pavan Kumar Vishwakarma",
      stat: "The codebase is getting cleaner every day. Once we deploy this next update, users are going to love it",
      image: Pavan,
    },
    {
      name: "Prince Kumar Vishwakarma",
      stat: "The progress so far is amazing. We’ve come a long way in a short time, and the best part is still ahead!",
      image: Prince,
    },
    {
      name: "Muskan Kumari",
      stat: "Our team is vibing really well. Collaboration is smooth, and we’re solving problems faster than ever.",
      image: Muskan,
    },
    {
      name: "Jayantika Pratik",
      stat: "I can already see how this is going to stand out — it’s not just functional, it’s actually fun to work on.",
      image: Jayantika,
    },
  ];

  return (
    <div className="team">
      <h3>Our Team</h3>

      {/* 🎞️ Lottie Animation Section */}
      <div
        className="lottie-wrapper"
        style={{ width: "300px", margin: "0 auto" }}
      >
        <DotLottieReact
          src="https://lottie.host/7e651451-3fb2-49bf-96ab-7ff95a7a2132/XiGK4GhbzQ.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <p>
        We’re a passionate group of developers, designers, and dreamers working
        together to build smart, user-friendly solutions. Each of us brings a
        unique set of skills, ideas, and energy to the table — and when we team
        up, amazing things happen. From brainstorming ideas to perfecting the
        final product, we believe in creativity, collaboration, and constant
        learning.
      </p>

      <div className="team-cards">
        {card4.map((card, index) => (
          <div className="card-container" key={index}>
            <Card4 img={card.image} name={card.name} stat={card.stat} />
            <div className="social">
              <Link to="#">
                <FaFacebook />
              </Link>
              <Link to="#">
                <FaInstagramSquare />
              </Link>
              <Link to="#">
                <FaLinkedin />
              </Link>
              <Link to="#">
                <FaTwitterSquare />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developer;
