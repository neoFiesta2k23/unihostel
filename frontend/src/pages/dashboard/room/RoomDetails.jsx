import React from "react";
import "./RoomDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCheckCircle,
  faBolt,
  faIdCard,
  faClipboardList,
  faExclamationTriangle,
  faVolumeUp,
  faSmokingBan,
  faUserFriends,
  faClipboardCheck,
  faShieldAlt,
  faUtensils,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const RoomDetails = ({ userRoomDetails }) => {
  let diffInDays = null
  if(userRoomDetails?.updatedAt){
    const updatedAt = new Date(userRoomDetails?.updatedAt);
    const today = new Date();
    const diffInMs = today - updatedAt;
    diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
  }

  return (
    <div className="room-details-container">
      <div className="room-header">
        <h2>Room Information</h2>
        <p>View and manage your accommodation details</p>
      </div>

      <div className="room-stats-grid">
        <div className="stat-card">
          <div className="stat-title">Days Occupied</div>
          <div className="stat-value">{diffInDays || "N/A"}</div>
          <div className="stat-trend trend-neutral">
            <FontAwesomeIcon icon={faHome} className="trend-icon" />
            Since check-in
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Room Condition</div>
          <div className="stat-value">Good</div>
          <div className="stat-trend trend-up">
            <FontAwesomeIcon icon={faCheckCircle} className="trend-icon" />
            Last inspection passed
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Utilities</div>
          <div className="stat-value">Included</div>
          <div className="stat-trend trend-neutral">
            <FontAwesomeIcon icon={faBolt} className="trend-icon" />
            No extra charges
          </div>
        </div>
      </div>

      <div className="room-grid">
        {/* Room Profile Card */}
        <div className="room-card">
          <div className="card-header">
            <h3>Room Profile</h3>
            <div className="card-icon primary-gradient">
              <FontAwesomeIcon icon={faIdCard} />
            </div>
          </div>
          <div className="room-details-content">
            <div className="detail-row">
              <span className="label">Room Number</span>
              <span className="value">
                {userRoomDetails?.roomNumber
                  ? `R-${userRoomDetails?.roomNumber}`
                  : "N/A"}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Room Type</span>
              <span className="value">
                {userRoomDetails?.roomType || "N/A"}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Hostel Name</span>
              <span className="value">
                {userRoomDetails?.hostel?.name || "N/A"}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Warden Name</span>
              <span className="value">
                {userRoomDetails?.hostel?.wardenName || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Room Amenities */}
        <div className="room-card">
          <div className="card-header">
            <h3>Room Amenities</h3>
            <div className="card-icon warning-gradient">
              <FontAwesomeIcon icon={faClipboardList} />
            </div>
          </div>
          <div className="amenities-list amenities-list-byme">
            {userRoomDetails?.hostel && userRoomDetails.hostel.facilities.map((facility, index) => (
              <div className="amenity-item" key={index}>
                <FontAwesomeIcon icon={faCircle} />
                <span>{facility.toUpperCase()}</span>
                <div className="status-badge operational">Working</div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Rules & Policies */}
        <div className="room-card">
          <div className="card-header">
            <h3>Room Rules & Policies</h3>
            <div className="card-icon warning-gradient">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
          </div>
          <div className="amenities-list">
            <div className="amenity-item">
              <FontAwesomeIcon icon={faVolumeUp} />
              <span>Quiet hours: 10 PM - 6 AM</span>
            </div>
            <div className="amenity-item">
              <FontAwesomeIcon icon={faSmokingBan} />
              <span>No smoking in rooms</span>
            </div>
            <div className="amenity-item">
              <FontAwesomeIcon icon={faUserFriends} />
              <span>Visitor hours: 9 AM - 8 PM</span>
            </div>
            <div className="amenity-item">
              <FontAwesomeIcon icon={faClipboardCheck} />
              <span>Room inspection: Monthly</span>
            </div>
            <div className="amenity-item">
              <FontAwesomeIcon icon={faShieldAlt} />
              <span>Lock doors when leaving</span>
            </div>
            <div className="amenity-item">
              <FontAwesomeIcon icon={faUtensils} />
              <span>No cooking in rooms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
