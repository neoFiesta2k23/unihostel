import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import "./AdminPanel.css";

const ComplaintList = ({ data }) => {
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    margin: "15px auto",
    width: "90%",
    maxWidth: "800px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    background: "#fff",
    fontSize: "18px",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  };

  const labelStyle = {
    fontWeight: "600",
    marginRight: "5px",
    color: "#4D55CC",
  };

  const descStyle = {
    marginTop: "10px",
    color: "#444",
  };

  const [updates, setUpdates] = useState({});

  const handleChange = (id, field, value) => {
    setUpdates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (id) => {
    try {
      const { status, adminResponse } = updates[id] || {};
      const res = await axiosInstance.put(`admin/complaint/update/${id}`, {
        status,
        adminResponse,
      });
      alert("Updated successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update complaint");
    }
  };

  const statusStyle = (status) => ({
    fontWeight: "bold",
    padding: "4px 10px",
    borderRadius: "10px",
    background: status === "resolved" ? "#d4edda" : "#fff3cd",
    color: status === "resolved" ? "#155724" : "#856404",
    display: "inline-block",
    marginTop: "10px",
  });

  const inputStyle = {
    marginTop: '10px',
    padding: '8px',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '8px 16px',
    background: '#4D55CC',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  const formatDate = (iso) => new Date(iso).toLocaleString("en-IN");

  return (
    <div>
      {data.map((item) => (
        <div key={item._id} style={cardStyle}>
          <div style={titleStyle}>{item.title}</div>

          <div>
            <span style={labelStyle}>Student:</span> {item.student.name} (
            {item.student.email})
          </div>

          <div>
            <span style={labelStyle}>Category:</span> {item.category}
          </div>

          <div style={descStyle}>
            <span style={labelStyle}>Description:</span>
            <br />
            {item.description}
          </div>

          <div style={descStyle}>
            <span style={labelStyle}>Admin Response:</span>
            {item.adminResponse ? item.adminResponse : "No response yet"}
          </div>

          <div style={statusStyle(item.status)}>
            {item.status.toUpperCase()}
          </div>

          <div
            style={{ marginTop: "10px", fontSize: "0.85rem", color: "#666" }}
          >
            <span style={labelStyle}>Created:</span>{" "}
            {formatDate(item.createdAt)}
          </div>

          <div style={{ marginTop: '15px' }}>
            <textarea
              placeholder="Type admin response..."
              style={inputStyle}
              value={updates[item._id]?.adminResponse || ''}
              onChange={(e) => handleChange(item._id, 'adminResponse', e.target.value)}
            />

            <select
              style={{ ...inputStyle, marginTop: '10px' }}
              value={updates[item._id]?.status || item.status}
              onChange={(e) => handleChange(item._id, 'status', e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>

            <button style={buttonStyle} onClick={() => handleSubmit(item._id)}>
              Respond
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const AdminPanel = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    createdBy: "",
  });
  const [hostel, setHostel] = useState({
    name: "",
    wardenName: "",
    gender: "male",
    facilities: [],
    totalRooms: 0,
  });
  const [room, setRoom] = useState({ number: "", hostelId: "", type: "" });
  const [contacts, setContacts] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchContacts();
    fetchComplaints();
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get("/admin/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await axiosInstance.get("/contact-us/get");
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };
  const fetchComplaints = async () => {
    try {
      const res = await axiosInstance.get("/admin/complaint/all");
      setComplaints(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching Complaints:", err);
    }
  };

  const handleEditChange = (field, value) => {
    setEditingStudent({ ...editingStudent, [field]: value });
  };

  const handleUpdateStudent = async () => {
    try {
      const { _id, ...updatedFields } = editingStudent;
      await axiosInstance.put(`/admin/students/${_id}`, updatedFields);
      alert("Student updated!");
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axiosInstance.delete(`/admin/students/${id}`);
      alert("Student deleted!");
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const handleCreateAnnouncement = async () => {
    try {
      await axiosInstance.post("/admin/announcement/create", newAnnouncement);
      alert("Announcement created!");
      setNewAnnouncement({ title: "", description: "", createdBy: "" });
    } catch (err) {
      console.error("Error creating announcement:", err);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await axiosInstance.delete(`/admin/announcement/${id}`);
      alert("Announcement deleted!");
    } catch (err) {
      console.error("Error deleting announcement:", err);
    }
  };

  const handleAddHostel = async () => {
    try {
      await axiosInstance.post("/admin/add/hostel", hostel);
      alert("Hostel added!");
      setHostel({ name: "" });
    } catch (err) {
      console.error("Error adding hostel:", err);
    }
  };

  const handleAddRoom = async () => {
    try {
      await axiosInstance.post("/admin/add/room", room);
      alert("Room added!");
      setRoom({ number: "", hostelId: "", type: "" });
    } catch (err) {
      console.error("Error adding room:", err);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <nav>
        <button onClick={() => scrollToSection("students")}>Students</button>
        <button onClick={() => scrollToSection("announcements")}>
          Announcements
        </button>
        <button onClick={() => scrollToSection("hostel")}>Hostel</button>
        <button onClick={() => scrollToSection("room")}>Room</button>
        <button onClick={() => scrollToSection("contacts")}>Contacts</button>
        <button onClick={() => scrollToSection("complaints")}>Complaints</button>
      </nav>

      <section id="students" className="section">
        <h2>All Students</h2>
        {students.map((student) => (
          <div key={student._id} className="card">
            <strong>{student.name}</strong> - {student.email}
            <button onClick={() => setEditingStudent(student)}>Edit</button>
            <button onClick={() => handleDeleteStudent(student._id)}>
              Delete
            </button>
          </div>
        ))}

        {editingStudent && (
          <div className="edit-form">
            <h4>Editing: {editingStudent.name}</h4>
            {Object.keys(editingStudent).map(
              (field) =>
                field !== "_id" &&
                field !== "__v" && (
                  <div key={field}>
                    <label>{field}</label>
                    <input
                      type="text"
                      value={editingStudent[field] || ""}
                      onChange={(e) => handleEditChange(field, e.target.value)}
                    />
                  </div>
                )
            )}
            <button onClick={handleUpdateStudent}>Update Student</button>
            <button onClick={() => setEditingStudent(null)}>Cancel</button>
          </div>
        )}
      </section>

      <section id="announcements" className="section">
        <h2>Create Announcement</h2>
        <input
          placeholder="Title"
          value={newAnnouncement.title}
          onChange={(e) =>
            setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
          }
        />
        <textarea
          placeholder="Description"
          value={newAnnouncement.description}
          onChange={(e) =>
            setNewAnnouncement({
              ...newAnnouncement,
              description: e.target.value,
            })
          }
        />
        <input
          placeholder="Created By"
          value={newAnnouncement.createdBy}
          onChange={(e) =>
            setNewAnnouncement({
              ...newAnnouncement,
              createdBy: e.target.value,
            })
          }
        />
        <button onClick={handleCreateAnnouncement}>Create</button>
      </section>

      <section id="hostel" className="section">
        <h2>Add Hostel</h2>
        <input
          type="text"
          placeholder="Hostel Name"
          value={hostel.name}
          onChange={(e) => setHostel({ ...hostel, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Warden Name"
          value={hostel.wardenName}
          onChange={(e) => setHostel({ ...hostel, wardenName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Total Rooms"
          value={hostel.totalRooms}
          onChange={(e) => setHostel({ ...hostel, totalRooms: e.target.value })}
        />
        <input
          type="text"
          placeholder="Facilities (Comma Separated)"
          value={hostel.facilities.join(",")}
          onChange={(e) =>
            setHostel({
              ...hostel,
              facilities: e.target.value.split(",").map((f) => f.trim()),
            })
          }
        />
        <select
          name="gender"
          id="gender"
          value={hostel.gender}
          onChange={(e) => setHostel({ ...hostel, gender: e.target.value })}
        >
          <option value="male">Male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        <button onClick={handleAddHostel}>Add Hostel</button>
      </section>

      <section id="room" className="section">
        <h2>Add Room</h2>
        <input
          placeholder="Room Number"
          value={room.number}
          onChange={(e) => setRoom({ ...room, number: e.target.value })}
        />
        <input
          placeholder="Hostel ID"
          value={room.hostelId}
          onChange={(e) => setRoom({ ...room, hostelId: e.target.value })}
        />
        <input
          placeholder="Room Type"
          value={room.type}
          onChange={(e) => setRoom({ ...room, type: e.target.value })}
        />
        <button onClick={handleAddRoom}>Add Room</button>
      </section>

      <section id="contacts" className="section">
        <h2>Contact Messages</h2>
        {contacts.length === 0 ? (
          <p>No messages received yet.</p>
        ) : (
          contacts.map((contact) => (
            <div key={contact._id} className="card">
              <p>
                <strong>Name:</strong> {contact.name}
              </p>
              <p>
                <strong>Email:</strong> {contact.email}
              </p>
              <p>
                <strong>Subject:</strong> {contact.subject}
              </p>
              <p>
                <strong>Message:</strong> {contact.message}
              </p>
              <p>
                <small>
                  Received on: {new Date(contact.createdAt).toLocaleString()}
                </small>
              </p>
              <a
                className="reply-btn"
                href={`mailto:${contact.email}?subject=RE: ${encodeURIComponent(
                  contact.subject
                )}&body=Hi ${contact.name},%0D%0A%0D%0A`}
              >
                Reply via Email
              </a>
            </div>
          ))
        )}
      </section>

      <section id="complaints" className="section">
        <h2>Complaints</h2>
        <ComplaintList data={complaints} />
      </section>
    </div>
  );
};

export default AdminPanel;
