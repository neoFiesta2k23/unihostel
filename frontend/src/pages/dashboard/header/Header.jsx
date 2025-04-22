import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = ({profile, setActiveTab, overviewRef}) => {
  const [notificationClicked, setNotificationClicked] = useState(false);

  const handleNotificationClick = () => {
    setNotificationClicked(true);
    setTimeout(() => setNotificationClicked(false), 600);
    setActiveTab("Overview")
    setTimeout(() => {
      overviewRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="header">
      <div className="header-inner">
        <div className="welcome">
          <Link to="/"><h2>UniHostel</h2></Link>
          <h4>Dashboard</h4>
        </div>

        <div className="header-actions">
          <div className="greeting">
            <span>Hello, {profile.name}!</span>
          </div>
          <div
            className={`action-icon notification-icon ${
              notificationClicked ? "clicked" : ""
            }`}
            onClick={handleNotificationClick}>
            <FontAwesomeIcon icon={faBell} />
            <div className="notification-badge">!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
