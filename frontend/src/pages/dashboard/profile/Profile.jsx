import React, { useEffect } from "react";
import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faIdCard,
  faHistory,
  faSignOutAlt,
  faEdit,
  faKey,
  faMapMarkerAlt,
  faUniversity,
  faUsers,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../../utils/axiosInstance";
const Profile = ({profile, userRoomDetails, setProfile, setUserRoomDetails}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    axiosInstance
      .get("/student/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong.");
        window.location.href = "/login";
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");
      });

    axiosInstance
      .get("/student/hostel", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUserRoomDetails(res.data.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong.");
        window.location.href = "/login";
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");
      });
  }, []);
  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        <p>Manage your account settings and personal information</p>
      </div>

      <div className="profile-main">
        <div className="profile-sidebar">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              <img
                src={profile.avatar}
                // src="https://images.unsplash.com/photo-1659438094881-998c923d40d9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGN1dGUlMjBnaXJsc3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Profile"
                className="profile-image"
              />
            </div>
            <div className="profile-name">
              <h3>{profile.name || "N/A"}</h3>
              <p>Student</p>
            </div>
            <div className="profile-actions">
              <button className="action-btn" onClick={() => navigate("/edit-profile")}>
                <FontAwesomeIcon icon={faEdit} /> Edit Profile
              </button>
            </div>
          </div>

          <div className="profile-stats-grid">
            <div className="stat-card">
              <div className="stat-title">Enrollment ID</div>
              <div className="stat-value">{profile?.enrollmentId || "N/A"}</div>
              <div className="stat-trend trend-neutral">
                <FontAwesomeIcon icon={faIdCard} className="trend-icon" />
                Computer Science
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-title">Room No.</div>
              <div className="stat-value">{userRoomDetails?.roomNumber || "N/A"}</div>
              <div className="stat-trend trend-neutral">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="trend-icon" />
                {userRoomDetails?.hostel?.name || "N/A"}
              </div>
            </div>

          </div>
        </div>

        <div className="profile-details-grid">
          <div className="card">
            <div className="card-header">
              <h3>Personal Information</h3>
              <div className="card-icon primary-gradient">
                <FontAwesomeIcon icon={faIdCard} />
              </div>
            </div>
            <div className="profile-details">
              <div className="detail-row">
                <span className="label">Full Name</span>
                <span className="value">{profile?.name || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="label">Gender</span>
                <span className="value">{profile?.gender || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="label">Date of Birth</span>
                <span className="value">{profile?.dateOfBirth?.split("T")[0] || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="label">Blood Group</span>
                <span className="value">{profile?.bloodGroup || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="label">Email</span>
                <span className="value">{profile?.email || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="label">Phone</span>
                <span className="value">{profile?.phoneNumber || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Academic Information</h3>
              <div className="card-icon success-gradient">
                <FontAwesomeIcon icon={faUniversity} />
              </div>
            </div>
            <div className="profile-details">
              <div className="detail-row">
                <span className="label">Department</span>
                <span className="value">{profile?.department || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="label">Program</span>
                <span className="value">{profile?.program || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="label">Semester</span>
                <span className="value">{profile?.semester || "N/A"} </span>
              </div>

              <div className="detail-row">
                <span className="label">Hostel Warden</span>
                <span className="value">{userRoomDetails?.hostel?.wardenName || "N/A"} </span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Parent's Information</h3>
              <div className="card-icon family-gradient">
                <FontAwesomeIcon icon={faUsers} />
              </div>
            </div>
            <div className="profile-details">
              <div className="detail-row">
                <span className="label">Father's Name</span>
                <span className="value">{profile?.fatherName || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="label">Father's Contact</span>
                <span className="value">
                  
                  {profile?.fatherContact ? <><FontAwesomeIcon icon={faPhone} className="icon-small" /> +91 {profile?.fatherContact}</>  : "N/A"}
                </span>
              </div>

              <div className="detail-row">
                <span className="label">Mother's Name</span>
                <span className="value">{profile?.motherName || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="label">Mother's Contact</span>
                <span className="value">
                {profile?.motherContact ? <><FontAwesomeIcon icon={faPhone} className="icon-small" /> +91 {profile?.motherContact}</>  : "N/A"}

                </span>
              </div>

              <div className="detail-row">
                <span className="label">Present Address</span>
                <span className="value">
                  {profile?.presentAddress || "N/A"}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Permanent Address</span>
                <span className="value">
                  {profile?.permanentAddress || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Account Settings</h3>
              <div className="card-icon warning-gradient">
                <FontAwesomeIcon icon={faShieldAlt} />
              </div>
            </div>

              <div className="security-actions">
                <button className="action-btn" onClick={() => toast.error("You can't change your password")}>
                  <FontAwesomeIcon icon={faKey} /> Change Password
                </button>
                <button className="action-btn danger" onClick={()=>{
                  toast.success("Logout Successful")
                  localStorage.removeItem("token");
                  localStorage.removeItem("loggedIn");
                  navigate("/");
                }}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;
