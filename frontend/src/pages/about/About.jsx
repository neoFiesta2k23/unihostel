import React from "react";
import Header from "../../components/header/Header";
// import Body3 from "../../components/Body/";
import Footer from "../../components/Footer/Footer";
import { IoIosPeople } from "react-icons/io";
import { FaLightbulb } from "react-icons/fa";
import { FcCollaboration } from "react-icons/fc";
import { RiShieldCheckFill } from "react-icons/ri";
import "./About.css";
import Developer from "../developerpage/Developer";

const Card = ({ icon, heading, para }) => {
  return (
    <>
      <div className="card3icon">{icon}</div>
      <div className="card3heading">{heading}</div>
      <div className="card3para">{para}</div>
    </>
  );
};

const About = () => {
  const card = [
    {
      icon: <IoIosPeople />,
      heading: "Student-Centric",
      para: "We prioritize the needs and experiences of students in every feature we develop.",
    },

    {
      icon: <FaLightbulb />,
      heading: "Innovation",
      para: "Continuously seeking creative and technological solutions to simplify complex processes.",
    },
    {
      icon: <FcCollaboration />,
      heading: "Collaboration",
      para: "Working closely with universities and students to build the best possible platform.",
    },
    {
      icon: <RiShieldCheckFill />,
      heading: "Reliability",
      para: "Providing a secure, stable, and dependable service that institutions can trust.",
    },
  ];

  return (
    <div className="about">
      <Header />
      <div className="aboutcontainer">
        <h3>Connecting Campuses, Simplifying Stays</h3>
        <p>
          Learn more about UniHostel's missin to revolutionize university
          accomodation management
        </p>
      </div>
      <div className="aboutmainsection">
        <h4>Our Journey</h4>
        <p>
          UniHostel began with a simple idea: managing university hostels should
          be easy. Started by former students and university staff, we
          understood the problems – poor communication, too much paperwork, and
          outdated systems. We combined our love for technology with the goal of
          improving campus life. So, we built a smart, easy-to-use platform
          where students and staff can manage everything -from room allotment
          and fees to maintenance and community updates – all in one place.
          Today, UniHostel continues to support colleges with powerful tools
          that make hostel life better and simpler for everyone.
        </p>
        <div className="corevalues">
          <p>These principles guide everything we do at UniHostel.</p>
        </div>
        <div className="about-grid">
          {card.map((card, index) => (
            <div className="feature_card" key={index}>
              <Card icon={card.icon} heading={card.heading} para={card.para} />
            </div>
          ))}
        </div>
      </div>

      <Developer />

      {/* <Body3 /> */}
      <Footer />
    </div>
  );
};

export default About;
