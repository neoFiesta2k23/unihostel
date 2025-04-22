import React, { useEffect, useState } from "react";
import "./Overview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faArrowUp,
  faExclamationCircle,
  faHome,
  faReceipt,
  faExclamationTriangle,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import axiosInstance from "../../../utils/axiosInstance";

const Overview = ({ userRoomDetails, profile, overviewRef }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints from the backend using Axios
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchComplaints = async () => {
      try {
        const res = await axiosInstance.get("/complaints/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setComplaints(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    fetchComplaints();
  }, []);
  const displayedComplaints = complaints.slice(0, 3);

  // Extended list of announcements

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axiosInstance.get("student/announcements");
        if (res.data.success) {
          setAnnouncements(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  // Show only the first 3 announcements initially
  const displayedAnnouncements = showAllAnnouncements
    ? announcements
    : announcements.slice(0, 3);

  return (
    <div className="overview-container">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Stay Duration</div>
          <div className="stat-value">{userRoomDetails?.duration || "Hostel N/A"}</div>
          <div className="stat-trend trend-neutral">
            <FontAwesomeIcon icon={faCalendarDay} className="trend-icon" />
            
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Account Balance</div>
          <div className="stat-value">₹450</div>
          <div className="stat-trend trend-up">
            <FontAwesomeIcon icon={faArrowUp} className="trend-icon" />
            +₹50 last week
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Pending Complaints</div>
          <div className="stat-value">
            {complaints.filter((c) => c.status === "pending").length}
          </div>
          <div className="stat-trend trend-neutral">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="trend-icon"
            />
            Needs attention
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>My Room Details</h3>
            <div className="card-icon primary-gradient">
              <FontAwesomeIcon icon={faHome} />
            </div>
          </div>
          <div className="room-details">
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

        <div className="card">
          <div className="card-header">
            <h3>Payment Status</h3>
            <div className="card-icon success-gradient">
              <FontAwesomeIcon icon={faReceipt} />
            </div>
          </div>
          <div className="room-details">
            <div className="detail-row">
              <span className="label">Next Due Date</span>
              <span className="value">Oct 15, 2024</span>
            </div>
            <div className="detail-row">
              <span className="label">Amount Due</span>
              <span className="value">₹750.00</span>
            </div>
            <div className="detail-row">
              <span className="label">Last Payment</span>
              <span className="value">Sep 1, 2024</span>
            </div>
            <div className="detail-row">
              <span className="label">Status</span>
              <span className="value">
                <span className="status paid">Paid</span>
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Recent Complaints</h3>
            <div className="card-icon warning-gradient">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
          </div>
          <ul className="complaint-list">
            {displayedComplaints.length === 0 && <li>No complaints found.</li>}
            {displayedComplaints.map((complaint) => (
              <li key={complaint._id} className="complaint-item">
                <div className="complaint-title">{complaint.title}</div>
                <div className="complaint-meta">
                  <span>
                    Status:{" "}
                    <strong
                      className={`status ${complaint.status.toLowerCase()}`}
                    >
                      {complaint.status}
                    </strong>
                  </span>
                  <span>{complaint.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section-header" >
        <h3>Recent Announcements</h3>
        <span
          className="view-all"
          onClick={() => setShowAllAnnouncements(!showAllAnnouncements)}
        >
          {showAllAnnouncements ? "Show Less" : "View All"}
          {!showAllAnnouncements && (
            <FontAwesomeIcon icon={faChevronRight} className="view-all-icon" />
          )}
          {showAllAnnouncements && (
            <FontAwesomeIcon
              icon={faChevronRight}
              className="view-all-icon rotate-up"
            />
          )}
        </span>
      </div>

      <div className="announcement-grid" ref={overviewRef}>
        {displayedAnnouncements.map((announcement) => (
          <div key={announcement._id} className="announcement-card">
            <h4>{announcement.title}</h4>
            <p>{announcement.description}</p>
            <div className="announcement-date">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>
                Posted on{" "}
                {new Date(announcement.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
