import React, { useState, useEffect } from "react";
import "./HostelForm.css";
import { FaHotel, FaDoorOpen, FaCheck, FaRegCalendarAlt } from "react-icons/fa";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HostelForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hostelId: "",
    roomId: "",
    duration: "",
    agreement: false,
  });

  const [hostels, setHostels] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [hostelFeatures, setHostelFeatures] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState({
    hostels: false,
    rooms: false,
    features: false,
  });

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    axiosInstance
      .get("student/get/hostel", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setHostels(res.data.hostel);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        navigate("/edit-profile");
      });
  }, []);

  useEffect(() => {
    if(formData.hostelId === "") return;
    const token = localStorage.getItem("token");
    const selectedHostel = hostels.find((h) => h._id === formData.hostelId);
    axiosInstance
      .get(`student/get/hostel/${formData.hostelId}/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAvailableRooms(res.data.availableRoomNumbers);
        setHostelFeatures(selectedHostel.facilities);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        if(err?.response?.status === 401) navigate("/edit-profile");
      });
  }, [formData.hostelId]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!formData.roomId) {
        setSelectedRoom(null);
        return;
      }

      try {
        // For now, find the room in the available rooms
        const room = availableRooms.find(
          (r) => r.id === parseInt(formData.roomId)
        );
        setSelectedRoom(room);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [formData.roomId, availableRooms]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    if (!formData.hostelId) return "Please select a hostel";
    if (!formData.roomId) return "Please select a room";
    if (!formData.duration) return "Please select a duration";
    if (!formData.agreement)
      return "Please agree to the hostel rules and regulations";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    
    const error = validateForm();
    if (error) {
      toast.error(error);
      setFormError(error);
      setLoadingSubmit(false);
      return;
    }

    const token = localStorage.getItem("token");
    axiosInstance
      .post(
        "/student/hostel",
        { roomNumber: formData.roomId, hostel: formData.hostelId, duration: formData.duration },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success(res.data.message);
        setIsSubmitted(true);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong.");
      })
      .finally(() => setLoadingSubmit(false));
  };

  if (isSubmitted) {
    return (
      <>
        <div className="form-success">
          <div className="success-icon">
            <FaCheck />
          </div>
          <h2>Hostel Room Reserved!</h2>
          <p>
            Your hostel room has been reserved successfully for{" "}
            {formData.duration === "1sem"
              ? "the 1st Semester"
              : formData.duration === "2sem"
              ? "the 2nd Semester"
              : formData.duration === "3sem"
              ? "the 3rd Semester"
              : formData.duration === "4sem"
              ? "the 4th Semester"
              : "the Full Course Duration"}
            .
          </p>
          <div className="reservation-details">
            <h3>Reservation Details</h3>
            <p>
              <strong>Hostel:</strong>{" "}
              {hostels.find((h) => h._id.toString() === formData.hostelId)?.name}
            </p>
            {selectedRoom && (
              <p>
                <strong>Room:</strong> {selectedRoom.roomNumber} (
                {selectedRoom.type})
              </p>
            )}
            <p>
              <strong>Duration:</strong>{" "}
              {formData.duration === "1sem"
                ? "1st Semester"
                : formData.duration === "2sem"
                ? "2nd Semester"
                : formData.duration === "3sem"
                ? "3rd Semester"
                : formData.duration === "4sem"
                ? "4th Semester"
                : "Full Course Duration"}
            </p>
          </div>
          <p>
            We will contact you with further instructions about payment and
            move-in procedures.
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>
          <FaHotel /> Hostel Accommodation
        </h2>
        <p>Choose your hostel and select an available room</p>
      </div>

      {formError && <div className="error-message">{formError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-section active">
          <h3>
            <FaDoorOpen /> Hostel Selection
          </h3>

          <div className="form-group">
            <label htmlFor="hostelId">Select Hostel</label>
            <select
              id="hostelId"
              name="hostelId"
              value={formData.hostelId}
              onChange={handleInputChange}
              disabled={loading.hostels}
            >
              <option value="">-- Select a Hostel --</option>
              {hostels.map((hostel) => (
                <option key={hostel._id} value={hostel._id}>
                  {hostel.name} ({hostel.gender === "male" ? "Boys" : "Girls"})
                </option>
              ))}
            </select>
            {loading.hostels && (
              <p className="field-hint">Loading hostels...</p>
            )}
          </div>

          {formData.hostelId && !loading.features && (
            <div className="hostel-facilities">
              <h4 style={{ margin: 0 }}>Hostel Facilities</h4>

              {hostelFeatures.length > 0 && (
                <div className="facility-amenities">
                  <div className="amenities-list">
                    {hostelFeatures.map((feature, index) => (
                      <span key={index} className="amenity-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {loading.features && formData.hostelId && (
            <p className="field-hint">Loading hostel facilities...</p>
          )}

          <div className="form-group">
            <label htmlFor="roomId">Select Room</label>
            <select
              id="roomId"
              name="roomId"
              value={formData.roomId}
              onChange={handleInputChange}
              disabled={
                !formData.hostelId ||
                loading.rooms ||
                availableRooms.length === 0
              }
            >
              <option value="">-- Select a Room --</option>
              {availableRooms.map((room) => (
                <option key={room} value={room}>
                  {`Room ${room}`}
                </option>
              ))}
            </select>
            {loading.rooms && formData.hostelId && (
              <p className="field-hint">Loading available rooms...</p>
            )}
            {!loading.rooms &&
              formData.hostelId &&
              availableRooms.length === 0 && (
                <p className="field-hint">No rooms available in this hostel</p>
              )}
          </div>

          {selectedRoom && (
            <div className="room-features">
              <h4>Selected Room Features</h4>
              <div className="feature-list">
                {selectedRoom.features &&
                  selectedRoom.features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
              </div>
              <p className="room-details">
                <strong>Room Type:</strong> {selectedRoom.type} |
                <strong> Price:</strong> ₹{selectedRoom.price} per month
              </p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="duration">
              <FaRegCalendarAlt /> Stay Duration
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">select duration</option>
              <option value="1sem">1 Semester</option>
              <option value="2sem">2 Semester</option>
              <option value="3sem">3 Semester</option>
              <option value="4sem">4 Semester</option>
              <option value="fullcourse">Full Course Duration</option>
            </select>
          </div>

          <div className="form-group" style={{ marginTop: "20px" }}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleInputChange}
              />
              <span className="checkbox-text">
                I agree to abide by all the rules and regulations of the hostel
              </span>
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loadingSubmit}>
              {loadingSubmit ? "Loading..." : "Reserve Room"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HostelForm;
