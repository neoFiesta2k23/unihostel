import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import Header from "../dashboard/header/Header";
import Overview from "../dashboard/overview/Overview";
import RoomDetails from "./room/RoomDetails";
import Payments from "../dashboard/payments/Payments";
import Services from "../dashboard/services/Services";
import Profile from "../dashboard/profile/Profile";
import Complaints from "../dashboard/complaints/Complaints";
import HostelForm from "./forms/HostelForm";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [profile, setProfile] = useState({});
  const [userRoomDetails, setUserRoomDetails] = useState({});
  const [loader, setLoader] = useState(true)


  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 2000);
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

  const overviewRef = useRef(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <Overview
            profile={profile}
            userRoomDetails={userRoomDetails}
            overviewRef={overviewRef}
          />
        );
      case "Room Details":
        return (
          <RoomDetails profile={profile} userRoomDetails={userRoomDetails} />
        );
      case "Payments":
        return <Payments profile={profile} />;
      case "Services":
        return <Services profile={profile} />;
      case "Complaints":
        return <Complaints profile={profile} />;
      case "Profile":
        return (
          <Profile
            profile={profile}
            userRoomDetails={userRoomDetails}
            setProfile={setProfile}
            setUserRoomDetails={setUserRoomDetails}
          />
        );
      case "Hostel Application":
        return <HostelForm profile={profile} />;
      default:
        return <Overview />;
    }
  };

  

  return (
    <>
      {loader ? <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}><DotLottieReact
        src="https://lottie.host/c0937cb5-4b8d-4a1a-aebd-bdad11ee1484/WhKNIdt7sI.lottie"
        loop
        speed={2}
        autoplay
      /> </div> : (
        <div className="dashboard-container">
        <div className="main-content">
        <Header
          profile={profile}
          setActiveTab={setActiveTab}
          overviewRef={overviewRef}
        />

        <div className="page-tabs">
          {[
            "Overview",
            "Room Details",
            "Payments",
            "Services",
            "Complaints",
            "Profile",
            "Hostel Application",
          ].map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {renderTabContent()}
      </div>
    </div>
      ) }
      
    </>
  );
};

export default Dashboard;
