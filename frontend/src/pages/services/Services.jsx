import React from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

const Services = () => {

  const sectionStyle = {
    padding: '40px 20px',
    background: 'linear-gradient(to bottom right, #f0f8ff, #e6f2ff)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    width: '100%',
  };

  const headingStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#1a237e',
    textAlign: 'center',
  };

  const subHeadingStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: '25px',
    marginBottom: '10px',
    color: '#0d47a1',
  };

  const paragraphStyle = {
    fontSize: '16px',
    color: '#333',
    marginBottom: '12px',
    lineHeight: '1.7',
  };

  return (
    <>
      <Navbar />
      <div style={sectionStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>Terms of Service - UniHostel</h1>
          <p><strong>Effective Date:</strong> April 21, 2025</p>

          <h3 style={subHeadingStyle}>1. Accommodation</h3>
          <p style={paragraphStyle}>Rooms can be selected by the user and  they get allocated the same and must not be changed without permission. Residents are responsible for room upkeep.</p>

          <h3 style={subHeadingStyle}>2. Timings</h3>
          <p style={paragraphStyle}>Entry is allowed between 6:00 AM and 10:00 PM. Late entries require prior approval from the warden.</p>

          <h3 style={subHeadingStyle}>3. Cleanliness and Hygiene</h3>
          <p style={paragraphStyle}>All residents must keep their rooms and common areas clean. Damages or littering will incur penalties.</p>

          <h3 style={subHeadingStyle}>4. Discipline and Behavior</h3>
          <p style={paragraphStyle}>Ragging, harassment, or disruptive behavior is strictly prohibited. Mutual respect is expected at all times.</p>

          <h3 style={subHeadingStyle}>5. Visitors</h3>
          <p style={paragraphStyle}>Visitors are allowed only during visiting hours. Overnight stays are not permitted.</p>

          <h3 style={subHeadingStyle}>6. Prohibited Items</h3>
          <p style={paragraphStyle}>Alcohol, drugs, cigarettes, weapons, and other banned substances are not allowed on the premises.</p>

          <h3 style={subHeadingStyle}>7. Fees and Payments</h3>
          <p style={paragraphStyle}>All hostel fees must be paid on time. Failure to do so may result in cancellation of accommodation.</p>

          <h3 style={subHeadingStyle}>8. Internet and Devices</h3>
          <p style={paragraphStyle}>Use of the internet must follow legal guidelines. Hostel management is not responsible for lost personal items.</p>

          <h3 style={subHeadingStyle}>9. Disciplinary Action</h3>
          <p style={paragraphStyle}>Violation of any rule may lead to warnings, fines, suspension, or expulsion from the hostel.</p>

          <h3 style={subHeadingStyle}>10. Final Authority</h3>
          <p style={paragraphStyle}>Decisions made by hostel authorities are final and binding.</p>

          <p style={{ marginTop: '30px', fontStyle: 'italic', color: '#555' }}>
            By residing in UniHostel, you agree to these terms. Management may update them from time to time.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;
