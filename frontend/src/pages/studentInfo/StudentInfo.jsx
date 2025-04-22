import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faIdCard,
  faUniversity,
  faUsers,
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
  faCheckCircle,
  faCamera,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import "./StudentInfo.css";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const StudentInfo = () => {
  const navigate = useNavigate();
  // Department to Programs mapping
  const departmentPrograms = {
    "": [],
    "Computer Science": [
      "Bachelor of Technology in Computer Science",
      "Master of Technology in Computer Science",
      "PhD in Computer Science",
    ],
    "Electrical Engineering": [
      "Bachelor of Technology in Electrical Engineering",
      "Master of Technology in Electrical Engineering",
      "PhD in Electrical Engineering",
    ],
    "Mechanical Engineering": [
      "Bachelor of Technology in Mechanical Engineering",
      "Master of Technology in Mechanical Engineering",
      "PhD in Mechanical Engineering",
    ],
    "Civil Engineering": [
      "Bachelor of Technology in Civil Engineering",
      "Master of Technology in Civil Engineering",
      "PhD in Civil Engineering",
    ],
    "Business Administration": [
      "Bachelor of Business Administration",
      "Master of Business Administration",
      "PhD in Business Administration",
    ],
    "Arts and Humanities": [
      "Bachelor of Arts",
      "Master of Arts",
      "PhD in Arts",
    ],
    "Medical Sciences": [
      "Bachelor of Medicine",
      "Master of Surgery",
      "PhD in Medical Sciences",
    ],
  };

  // Function to determine semesters based on program type
  const getProgramSemesters = (program) => {
    if (!program) return [];

    if (program.toLowerCase().includes("bachelor")) {
      return [1, 2, 3, 4, 5, 6, 7, 8];
    } else if (program.toLowerCase().includes("master")) {
      return [1, 2, 3, 4];
    } else if (program.toLowerCase().includes("phd")) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else if (program.toLowerCase().includes("medicine")) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    // Default fallback
    return [1, 2, 3, 4, 5, 6, 7, 8];
  };

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    // Personal Details - all fields empty now
    name: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    phoneNumber: "",
    email: "",

    // Academic Information - all fields empty now
    department: "",
    program: "",
    semester: "",
    enrollmentId: "",

    // Parent/Guardian Information - all fields empty now
    fatherName: "",
    fatherContact: "",
    motherName: "",
    motherContact: "",

    // Present Address - structured format
    presentAddress: "",

    // Permanent Address - structured format
    permanentAddress: "",

    // Profile Photo
    photo: null,
  });

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
        setUser(res.data.data);
        setFormData({ ...formData, ...res.data.data, photo: res.data.data.avatar });
        setPhotoPreview(res.data.data.avatar)
      })
      .catch((err) => {
        window.location.href = "/login";
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");
      });
  }, []);

  const [availableSemesters, setAvailableSemesters] = useState([]);

  // Reset program when department changes
  useEffect(() => {
    if (
      formData.department &&
      !departmentPrograms[formData.department].includes(formData.program)
    ) {
      setFormData((prev) => ({ ...prev, program: "", semester: "" }));
      setAvailableSemesters([]);
    }
  }, [formData.department]);

  // Update available semesters when program changes
  useEffect(() => {
    if (formData.program) {
      const semesters = getProgramSemesters(formData.program);
      setAvailableSemesters(semesters);
      if (!semesters.includes(Number(formData.semester))) {
        setFormData((prev) => ({ ...prev, semester: "" }));
      }
    } else {
      setAvailableSemesters([]);
    }
  }, [formData.program]);

  // Default placeholder image for user profile
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const capitalizeWords = (string) => {
    if (!string) return string;
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // Handle file upload for photo
      if (files && files[0]) {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));

        // Create preview URL for the photo
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      // Auto capitalize appropriate fields
      let transformedValue = value;

      // Name fields - capitalize each word
      if (["name", "fatherName", "motherName"].includes(name)) {
        transformedValue = capitalizeWords(value);
      }
      // Address fields - capitalize each word
      else if (["permanentAddress", "presentAddress"].includes(name)) {
        transformedValue = capitalizeWords(value);
      }

      // Handle other form inputs
      setFormData((prev) => ({ ...prev, [name]: transformedValue }));
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    const payload = new FormData();

    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    // Simulate API call
    try {
      const user = await axiosInstance.post("/student/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsSubmitted(true);
      toast.success("Details updated successfully!");
    } catch (error) {
      console.error("Error submitting details:", error.response.data);
      toast.error(
        "There was an error updating your details. Please try again."
      );
      setError({
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle "Same as Present Address" checkbox
  const copyPresentAddress = () => {
    setFormData((prev) => ({
      ...prev,
      permanentAddress: formData.presentAddress,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="form-success">
        <div className="success-icon">
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
        <h2>Details Updated!</h2>
        <p>
          Your student information has been successfully updated in our system.
        </p>
        <button
          className="btn-primary"
          onClick={() => {
            setIsSubmitted(false);
            navigate("/dashboard");
          }}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="form-whole-container">
      <div className="form-container">
        <button onClick={() => navigate("/dashboard")} className="back-button">
          ← Back to Dashboard
        </button>
        <div className="form-header">
          <h2>
            <FontAwesomeIcon icon={faIdCard} /> Student Details Form
          </h2>
          <p>Please enter your complete information below</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}> {error.message} </p>}
          {/* === PERSONAL INFORMATION === */}
          <h3>Personal Information</h3>
          <div className="photo-upload-container">
            <div className="photo-preview">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile Preview" />
              ) : (
                <div className="no-photo">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}
            </div>
            <div className="photo-upload-controls">
              <label htmlFor="photo" className="photo-upload-btn">
                <FontAwesomeIcon icon={faCamera} /> Upload Photo
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </label>
              <p className="photo-hint">Upload a clear passport size photo</p>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                disabled
                style={{backgroundColor: "#e6e6e6", cursor: "not-allowed"}}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Gender*</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Gender --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth*</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth.split("T")[0]}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                disabled
                style={{backgroundColor: "#e6e6e6", cursor: "not-allowed"}}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">
                <FontAwesomeIcon icon={faPhone} /> Phone Number*
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          {/* === ACADEMIC INFORMATION === */}
          <h3>Academic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="enrollmentId">Enrollment ID*</label>
              <input
                type="text"
                id="enrollmentId"
                name="enrollmentId"
                value={formData.enrollmentId}
                disabled
                style={{backgroundColor: "#e6e6e6", cursor: "not-allowed"}}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Department*</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {Object.keys(departmentPrograms)
                  .filter((dept) => dept !== "")
                  .map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="program">Program*</label>
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
                disabled={!formData.department}
              >
                <option value="">Select Program</option>
                {formData.department &&
                  departmentPrograms[formData.department].map((prog) => (
                    <option key={prog} value={prog}>
                      {prog}
                    </option>
                  ))}
              </select>
              {!formData.department && (
                <small className="field-hint">Select a department first</small>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="semester">Current Semester*</label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                disabled={!formData.program}
              >
                <option value="">Select Semester</option>
                {availableSemesters.map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* === FAMILY INFORMATION === */}
          <h3>Family Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fatherName">Father's Name*</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fatherContact">Father's Contact*</label>
              <input
                type="tel"
                id="fatherContact"
                name="fatherContact"
                value={formData.fatherContact}
                onChange={handleChange}
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="motherName">Mother's Name*</label>
              <input
                type="text"
                id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="motherContact">Mother's Contact*</label>
              <input
                type="tel"
                id="motherContact"
                name="motherContact"
                value={formData.motherContact}
                onChange={handleChange}
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          {/* === ADDRESS INFORMATION === */}
          <h3>Address Information</h3>
          <h4>Present Address</h4>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                id="presentAddress"
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div
              className="checkbox-group"
              style={{ width: "100%", marginBottom: "16px" }}
            >
              <label className="checkbox-label">
                <input type="checkbox" onChange={copyPresentAddress} />
                <span className="checkbox-text">Same as Present Address</span>
              </label>
            </div>
          </div>
          <h4>Permanent Address</h4>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-footer">
            <button type="submit" className="btn-save" disabled={isSubmitting}>
              <FontAwesomeIcon icon={faSave} />{" "}
              {isSubmitting ? "Saving..." : "Save All Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentInfo;
