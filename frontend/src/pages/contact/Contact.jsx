import React, { useState } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaHeadset,
} from "react-icons/fa";
import "./ContactPage.css"; // Make sure to create and import your CSS
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const onChangeHandle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/contact-us/create", form);

      toast.success("Message Sent Successfully");
      console.log("Data", res.data);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast.error("Error in sending message");
    }
  };
  return (
    <>
      <Navbar />
      <main>
        <section className="contact-hero-section">
          <div className="contact-containerText">
            <h1>Get In Touch</h1>
            <p>
              We're here to help! Whether you have questions about our platform,
              pricing, or need support, reach out to us.
            </p>
          </div>
        </section>

        <section className="contact-details-section">
          <div className="contact-container contact-grid">
            <div className="contact-info">
              <h2>Contact Information</h2>

              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-text">
                  <h3>Our Office</h3>
                  <p>
                    Chanakya Parisar
                    <br />
                    MGCU, Motihari-845401
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-text">
                  <h3>Email Us</h3>
                  <p>
                    <a href="mailto:support@unihostel.example.com">
                      support@unihostel.example.com
                    </a>
                    <br />
                    <a href="mailto:sales@unihostel.example.com">
                      sales@unihostel.example.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaPhoneAlt />
                </div>
                <div className="info-text">
                  <h3>Call Us</h3>
                  <p>
                    <a href="tel:+919876543211">+91 9876543211</a>
                    <br />
                    (Mon-Fri, 9am - 5pm Campus Time)
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaHeadset />
                </div>
                <div className="info-text">
                  <h3>Student Support</h3>
                  <p>
                    For registered users, please use the support ticket system
                    in your dashboard for faster assistance.
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h2>Send Us a Message</h2>
              <form action="#" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    placeholder="Enter your full name"
                    onChange={onChangeHandle}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={onChangeHandle}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={onChangeHandle}
                    placeholder="e.g., Pricing Inquiry, Support Request"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={onChangeHandle}
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
