import React, { useState, useEffect } from "react";
import "./Complaints.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faSpinner,
  faPlus,
  faTimes,
  faTools,
  faCommentAlt,
  faHistory,
  faCalendarAlt,
  faPaperPlane,
  faChevronRight,
  faTimesCircle,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch complaints on load
  useEffect(() => {
    fetchComplaints();
  }, []);


  const token = localStorage.getItem("token");
  const fetchComplaints = async () => {
    setLoading(true);
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
    } finally{
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const newErrors = {};
    if (!category) newErrors.category = "Category is required.";
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await axiosInstance.post(
        "/complaints/create",
        {
          title,
          category,
          description,
          roomNumber: "B-202", // update if dynamic
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Complaint submitted successfully!");
        setTitle("");
        setCategory("");
        setDescription("");
        setShowForm(false);
        fetchComplaints();
      }
    } catch (err) {
      console.error("Error submitting complaint:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const displayedComplaints = showAll ? complaints : complaints.slice(0, 3);

  return (
    <div className="complaints-container">
      {/* Header and Stats */}
      <div className="complaints-header">
        <h2>Complaints Portal</h2>
        <p>Track and raise complaints about your accommodation</p>
      </div>

      {/* Stats */}
      <div className="complaints-stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Complaints</div>
          <div className="stat-value">{complaints.length}</div>
          <div className="stat-trend trend-neutral">
            <FontAwesomeIcon icon={faHistory} className="trend-icon" />
            Lifetime total
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Pending</div>
          <div className="stat-value">
            {complaints.filter((c) => c.status === "pending").length}
          </div>
          <div className="stat-trend trend-down">
            <FontAwesomeIcon icon={faSpinner} className="trend-icon" />
            Being processed
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Resolved</div>
          <div className="stat-value">
            {complaints.filter((c) => c.status === "resolved").length}
          </div>
          <div className="stat-trend trend-up">
            <FontAwesomeIcon icon={faCheckCircle} className="trend-icon" />
            <span className="success-text">Successful</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Rejected</div>
          <div className="stat-value">
            {complaints.filter((c) => c.status === "rejected").length}
          </div>
          <div className="stat-trend trend-up">
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="trend-icon icon-red"
            />
            <span className="error-text">Not approved</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="complaints-actions">
        <button
          className="action-btn secondary"
          onClick={() => setShowForm(!showForm)}
        >
          <FontAwesomeIcon icon={showForm ? faTimes : faPlus} />
          {showForm ? "Cancel" : "New Complaint"}
        </button>

        <button className="action-btn secondary">
          <FontAwesomeIcon icon={faListAlt} />
          Complaint History
        </button>
      </div>

      {/* Complaint Form */}
      {showForm && (
        <div className="complaint-form-card">
          <h3>Submit New Complaint</h3>
          <div className="complaint-form">
            <div className="form-group">
              <label>Complaint Type</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="maintenance">Maintenance Issue</option>
                <option value="internet">Internet Problem</option>
                <option value="electricity">Electricity Issue</option>
                <option value="furniture">Furniture Problem</option>
                <option value="cleanliness">Cleanliness Concern</option>
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <p className="error-text">{errors.category}</p>
              )}
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief description of the issue"
              />
              {errors.title && <p className="error-text">{errors.title}</p>}
            </div>

            <div className="form-group">
              <label>Details</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide details about your complaint"
              />
              {errors.description && (
                <p className="error-text">{errors.description}</p>
              )}
            </div>

            <div className="form-footer">
              <button className="action-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button
                className="action-btn primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                <FontAwesomeIcon icon={faPaperPlane} /> Submit Complaint{" "}
                {loading && <FontAwesomeIcon icon={faSpinner} spin />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complaints List */}
      <div className="complaints-list">
        {complaints.length === 0 ? (
          <div className="no-complaints-message">
            <FontAwesomeIcon icon={faCommentAlt} className="no-icon" />
            <p>
              No complaints yet. You can raise a new one using the button above.
            </p>
          </div>
        ) : (
          displayedComplaints.map((complaint) => (
            <div key={complaint._id} className="complaint-card">
              <div className={`complaint-icon ${complaint.status}`}>
                <FontAwesomeIcon icon={faTools} />
              </div>
              <div className="complaint-details">
                <div className="complaint-header">
                  <h3>{complaint.title}</h3>
                  <div className="status-container">
                    <span className={`status ${complaint.status}`}>
                      {complaint.status}
                    </span>
                  </div>
                </div>
                <p>{complaint.description}</p>
                <div className="complaint-meta">
                  <span>
                    <FontAwesomeIcon icon={faCalendarAlt} /> Submitted:{" "}
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {complaint.adminResponse && (
                  <div className="complaint-meta">
                    <span><span style={{color:"green"}}>Response:</span> {complaint.adminResponse}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* View more / less */}
      {complaints.length > 3 && (
        <div className="view-more-container">
          <button
            className="view-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All Complaints"}{" "}
            <FontAwesomeIcon
              icon={faChevronRight}
              className={showAll ? "rotate-up" : ""}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Complaints;
