
import React from "react";
import './Privacy.css';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const Privacy = () => {
  return (
    <>
    <Navbar bbr="0"/>
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy – Unihostel</h1>
      <p className="effective-date">Effective Date: 00/00/0000</p>

      <section>
        <h2>1. Information We Collect</h2>
        <ul>
          <li>Full name, date of birth, and contact details</li>
          <li>Parent/guardian details and emergency contact information</li>
          <li>Academic and admission-related details</li>
          <li>Health records (for medical emergencies)</li>
          <li>Hostel room allocation and attendance</li>
          <li>CCTV footage in common areas for security purposes</li>
          <li>Internet usage logs (if applicable)</li>
        </ul>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Hostel admission and room allocation</li>
          <li>Communicating important notices and updates</li>
          <li>Emergency contact and health-related situations</li>
          <li>Security and disciplinary purposes</li>
          <li>Compliance with college or government regulations</li>
        </ul>
      </section>

      <section>
        <h2>3. Sharing of Information</h2>
        <p>
          We do <strong>not</strong> share your personal information with third parties except:
        </p>
        <ul>
          <li>With college administration for academic and disciplinary matters</li>
          <li>In emergencies, with medical professionals or law enforcement</li>
          <li>If required by law or court orders</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>We take reasonable precautions to protect your data through:</p>
        <ul>
          <li>Secure physical and digital recordkeeping</li>
          <li>Restricted access to sensitive data</li>
          <li>Periodic reviews and updates of our data practices</li>
        </ul>
      </section>

      <section>
        <h2>5. CCTV Surveillance</h2>
        <p>
          CCTV cameras are installed in common areas (e.g., entrances, hallways) for the safety of residents.
          Surveillance is monitored by authorized staff only and retained for a limited period unless required
          for investigation.
        </p>
      </section>

      <section>
        <h2>6. Resident Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Request correction of inaccurate data</li>
          <li>Raise concerns or complaints regarding data handling</li>
        </ul>
      </section>

      <section>
        <h2>7. Policy Updates</h2>
        <p>
          This Privacy Policy may be updated occasionally to reflect changes in law or hostel operations. Residents
          will be notified of significant changes.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>
          If you have questions or concerns about this policy, please contact:
        </p>
        <p>
          <strong>Warden, Unihostel</strong><br />
          Email: [Unihostel@gmail.com]<br />
          Phone: [9876543218]
        </p>
      </section>
    </div>
     <Footer br="0"/>
     </>
  );
};

export default Privacy;